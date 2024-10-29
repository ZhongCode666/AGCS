
let has_init = false, has_depart = false;

async function init_display(){
    const center = await fetchCenter();
    if (center == null){
        alert("原点未设置🤯");
        return;
    }
    map.setCenter(center[0]);
    ugvway.push(center[0]);
    uavway.push(center[0]);
    ugv_passedPolyline.show();
    ugv_marker.setPosition(center[0]);
    uav_passedPolyline.show();
    uav_marker.setPosition(center[0]);
    home_marker.setPosition(center[0]);
    origin_time = center[1];
    home_marker.show();
    uav_marker.show();
    ugv_marker.show();
    setOriginTime(origin_time);
    startDataFilling();
    toggleDisplay();
    has_init = true;
    alert("获取原点成功！🛫");
}

// 开始监听并更新位置
function startTracking() {
    if(has_init){
        // 确保不会重复设置监听
        if (ugv_trackingInterval) {
            clearInterval(ugv_trackingInterval);
        }
        if (uav_trackingInterval) {
            clearInterval(uav_trackingInterval);
        }
        uav_trackingInterval = setInterval(updateUAVMarkerPosition, 1000); // 每 1 秒请求一次接口
        ugv_trackingInterval = setInterval(updateUGVMarkerPosition, 1000); // 每 1 秒请求一次接口
        alert("开始更新位置🏃‍🛫");
    }
    else{
        alert("未获取原点，请先刷新原点🤯");
    }
}

// 停止监听位置
function stopTracking() {
    if(has_init){
        if (ugv_trackingInterval) {
            clearInterval(ugv_trackingInterval);
            ugv_trackingInterval = null;
        }
        if (uav_trackingInterval) {
            clearInterval(uav_trackingInterval);
            uav_trackingInterval = null;
        }
        alert("结束更新位置💺");
    }
    else{
        alert("未获取原点，请先刷新原点🤯");
    }   
}

async function stop_display(){
    ugv_marker.hide();
    ugvway = [];
    ugv_passedPolyline.hide();
    uav_marker.hide();
    uavway = [];
    uav_passedPolyline.hide();
    home_marker.hide();
    var re = await cleanData();
    for(i =0; i<3; i++){
        if (re){
            break;
        }
        re = await cleanData();
    }
    endDataFilling();
    has_init = false
    has_depart = false;
    alert("清理数据成功！👌");
}


async function setDepart(){
    if(has_init){
        if (! has_depart){
           const flag = fetchDepart();
           if(flag){
                has_depart = true;
                alert('起飞成功😀'); 
           }
           else{
                alert('起飞失败🤯');
           }
        }
        else{
            alert("已经起飞啦👻");
        }
    }
    else{
        alert("未获取原点，请先刷新原点🤯");
    }
}

async function setLand(){
    if(has_init){
        if (has_depart){
           const flag = fetchLand();
           if(flag){
                has_depart = false;
                alert('降落成功😀'); 
           }
           else{
                alert('降落失败🤯');
           }
        }
        else{
            alert("在回来了👻");
        }
    }
    else{
        alert("未获取原点，请先刷新原点🤯");
    }
}