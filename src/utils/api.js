// api.js
let api_config = {};  // 配置对象

// 异步加载配置文件
async function loadConfig() {
    try {
        const response = await fetch('src/config/api_config.json');
        if (!response.ok) {
            throw new Error(`Failed to load config file: ${response.status}`);
        }
        api_config = await response.json();
        console.log('Configuration loaded:', api_config);
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// 调用该函数进行配置加载（如在页面加载时）
loadConfig();



// 获取地图中心点
async function fetchCenter() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}originPos`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.info(`请求原点结果${data.longitude}, ${data.latitude}`)
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || null;
    } catch (error) {
        console.error("Failed to fetch center:", error);
        return null;
    }
}

// 请求起飞
async function fetchDepart() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}setDepart`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.info(`请求起飞结果${data}`)
        return true || false;
    } catch (error) {
        console.error("Failed to depart:", error);
        return false;
    }
}


// 请求降落
async function fetchLand() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}setLand`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.info(`请求降落结果${data}`)
        return true || false;
    } catch (error) {
        console.error("Failed to land:", error);
        return false;
    }
}


// 获取ugv新的位置点
async function fetchUGVpos() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}ugvPos`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || null;
    } catch (error) {
        console.error("Failed to fetch ugv new position:", error);
        return null;
    }
}


// 获取uav新的位置点
async function fetchUAVpos() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}uavPos`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || null;
    } catch (error) {
        console.error("Failed to fetch uav new position:", error);
        return null;
    }
}

async function cleanData() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}cleanTimeStr`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return true;
    } catch (error) {
        console.error("Failed to fetch uav new position:", error);
        return false;
    }
}

// 获取ugv新的高度
async function fetchUGVheight() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}ugvHeight`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [data.height, data.time] || null;
    } catch (error) {
        console.error("Failed to fetch ugv new height:", error);
        return null;
    }
}


// 获取uav新的高度
async function fetchUAVheight() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}uavHeight`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [data.height, data.time] || null;
    } catch (error) {
        console.error("Failed to fetch uav new height:", error);
        return null;
    }
}


// 设置DH
async function setDH(D, H) {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}setDH?D=${D}&H=${H}`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return true;
    } catch (error) {
        console.error("Failed to set DH:", error);
        return false;
    }
}

// 设置DH
async function checkDH() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}checkDH`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error("Failed to set DH:", error);
        return null;
    }
}

// 设置阈值
async function setth(th) {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}setThreshold?threshold=${th}`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return true;
    } catch (error) {
        console.error("Failed to set DH:", error);
        return false;
    }
}

// 获取ugv新的航向角
async function fetchUGVyaw() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}ugvOrientation`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.ugv_orientation || null;
    } catch (error) {
        console.error("Failed to fetch ugv new Orientation:", error);
        return null;
    }
}


// 获取uav新的航向角
async function fetchUAVyaw() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}uavOrientation`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.uav_orientation || null;
    } catch (error) {
        console.error("Failed to fetch uav new Orientation:", error);
        return null;
    }
}

// 获取距离
async function fetchDistance() {
    try {
        const response = await fetch(
            `${api_config.apiBaseUrl}getDistance`,
            {timeout : api_config.timeout, method: 'GET'},
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.distance || null;
    } catch (error) {
        console.error("Failed to fetch distance:", error);
        return null;
    }
}
