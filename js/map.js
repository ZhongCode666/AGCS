// map.js
// 坐标转换工具
const pi = 3.14159265358979324;
const a = 6378245.0; // 长半轴
const ee = 0.00669342162296594323; // 扁率
function transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

function wgs84ToGcj02(lon, lat) {
    if (outOfChina(lat, lon)) {
        return [lat, lon];
    }

    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * pi;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    const mgLat = lat + dLat;
    const mgLon = lon + dLon;
    return [mgLon, mgLat];
}

function outOfChina(lat, lon) {
    return lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

let map, ugv_marker, ugv_passedPolyline, uav_marker, uav_passedPolyline, home_marker;
let ugv_t, uav_t;
let origin_time;
let ugv_trackingInterval, uav_trackingInterval; // 用于存储定时器 ID
let ugvway = [], uavway = [];

// 初始化地图
async function initializeMap() {
    // 使用从 api.js 获取的中心点
    map = new AMap.Map("container", {
        resizeEnable: true,
        center: [113.958553, 22.799473],
        zoom: 17,
        viewMode: '3D',
        terrain: true,
    });

    const caricon = new AMap.Icon({
        size: new AMap.Size(24, 24), // 设置图标大小，例如 32x32 像素
        image: "assets/car.png", // 图标的 URL
        imageSize: new AMap.Size(24, 24) // 设置图标的实际大小，确保缩放正确
    });

    ugv_marker = new AMap.Marker({
        map: map,
        icon: caricon,
        offset: new AMap.Pixel(-12, -12),
        visible: false, // 默认不显示
    });
    const staricon = new AMap.Icon({
        size: new AMap.Size(20, 20), // 设置图标大小，例如 32x32 像素
        image: "assets/star.png", // 图标的 URL
        imageSize: new AMap.Size(20, 20) // 设置图标的实际大小，确保缩放正确
    });

    home_marker = new AMap.Marker({
        map: map,
        icon: staricon,
        offset: new AMap.Pixel(-10, -10),
        visible: false, // 默认不显示
    });
    const droneicon = new AMap.Icon({
        size: new AMap.Size(20, 20), // 设置图标大小，例如 32x32 像素
        image: "assets/drone.png", // 图标的 URL
        imageSize: new AMap.Size(20, 20) // 设置图标的实际大小，确保缩放正确
    });

    uav_marker = new AMap.Marker({
        map: map,
        icon: droneicon,
        offset: new AMap.Pixel(-10, -10),
        visible: false, // 默认不显示
    });

    ugv_passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#003366",
        strokeWeight: 3,
        showDir: true,
    });
    uav_passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#ffff4d",
        strokeWeight: 3,
        showDir: true,
    });
    // map.setFitView();
}

async function updateUGVMarkerPosition() {
    const new_pos = await fetchUGVpos();
    if (!( new_pos == null)) {
        ugv_marker.setPosition(new_pos[0]); // 更新 marker 的位置
        map.setCenter(new_pos[0]);
        ugvway.push(new_pos[0]);
        ugv_passedPolyline.setPath(ugvway);
        ugv_passedPolyline.show();
        setRunDistanceSpan(ugv_passedPolyline.getLength());
        ugv_t = new_pos[1];
        console.log("UGV Marker moved to:", new_pos[0], "time, ", ugv_t);
    } else {
        console.error("Invalid position data from API");
    }
}

async function updateUAVMarkerPosition() {
    const new_pos = await fetchUAVpos();
    if (!(new_pos == null)) {
        uav_marker.setPosition(new_pos[0]); // 更新 marker 的位置
        uavway.push(new_pos[0]);
        uav_passedPolyline.setPath(uavway);
        uav_passedPolyline.show();
        uav_t = new_pos[1];
        console.log("UAV Marker moved to:", new_pos[0], "time, ", uav_t);
    } else {
        console.error("Invalid position data from API");
    }
}
