// api.js
let api_config = {};  // 配置对象

// 异步加载配置文件
async function loadConfig() {
    try {
        const response = await fetch('./src/config/api_config.json'); 
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


const timeoutFetch = (url, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    // 合并选项，确保请求包含 AbortController 的 signal
    const config = {
      ...options,
      signal: controller.signal
    };
  
    return fetch(url, config)
      .finally(() => clearTimeout(timeoutId))  // 清除超时计时器
      .catch((error) => {
        if (error.name === 'AbortError') {
          return Promise.reject(new Error('Request timed out'));
        }
        return Promise.reject(error);
      });
  };
  


// 获取地图中心点
async function fetchCenter() {
    try {
        const response = await timeoutFetch(
            url = `${api_config.apiBaseUrl}originPos`,
            options= {method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) {
            const data = await response.json();
            if (data.detail){
                alert(`${data.detail}🙃`)
            }
            throw new Error(`HTTP error !tt status: ${response.status}`);
        }
        const data = await response.json();
        console.info(`请求原点结果${data.longitude}, ${data.latitude}`)
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || [];
    } catch (error) {
        console.error("Failed to fetch center:", error);
        return [];
    }
}

// 请求起飞
async function fetchDepart() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}setDepart`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}setLand`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}ugvPos`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || [];
    } catch (error) {
        console.error("Failed to fetch ugv new position:", error);
        return [];
    }
}


// 获取uav新的位置点
async function fetchUAVpos() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}uavPos`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [wgs84ToGcj02(data.longitude, data.latitude), data.time] || [];
    } catch (error) {
        console.error("Failed to fetch uav new position:", error);
        return [];
    }
}

async function cleanData() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}cleanTimeStr`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return true;
    } catch (error) {
        console.error("Failed to clean time str:", error);
        return false;
    }
}

// 获取ugv新的高度
async function fetchUGVheight() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}ugvHeight`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [data.height, data.time] || [];
    } catch (error) {
        console.error("Failed to fetch ugv new height:", error);
        return [];
    }
}


// 获取uav新的高度
async function fetchUAVheight() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}uavHeight`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return [data.height, data.time] || [];
    } catch (error) {
        console.error("Failed to fetch uav new height:", error);
        return [];
    }
}


// 设置DH
async function setDH(D, H) {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}setDH?D=${D}&H=${H}`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}checkDH`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}setThreshold?threshold=${th}`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}ugvOrientation`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}uavOrientation`,
            options={method: 'GET'},
            timeout=api_config.timeout
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
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}getDistance`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.distance || null;
    } catch (error) {
        console.error("Failed to fetch distance:", error);
        return null;
    }
}


// 获取系统数据
async function fetchSystemData() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}systemData`,
            options={method: 'GET'},
            timeout=api_config.timeout
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error("Failed to fetch SystemData:", error);
        return null;
    }
}


// 获取系统位置
async function fetchSystemPos() {
    try {
        const response = await timeoutFetch(
            url=`${api_config.apiBaseUrl}systemPos`,
            options={method: 'GET'},
            timeout=api_config.timeout, 
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error("Failed to fetch SystemPos:", error);
        return null;
    }
}


function fetchPhotos() {
    const urls = [
        `${api_config.apiBaseUrl}ugvLatestPhoto`,  // 替换为实际的接口1
        `${api_config.apiBaseUrl}uavLatestPhoto`   // 替换为实际的接口2
    ];

    // 本地备用图片路径
    const localImages = "assets/no_image.png";

    urls.forEach((url, index) => {
        timeoutFetch(url=url, timeout=api_config.photo_timeout)
            .then(response => {
                if (response.status != 200) {
                    // 如果返回 404，使用本地图片
                    return localImages;
                } else if (!response.ok) {
                    // 如果有其他错误，抛出异常
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(data => {
                const imgElement = document.getElementById(`photo${index}`);
                if (imgElement) {
                    // 检查返回的数据类型
                    if (typeof data === 'string') {
                        // data 是字符串时，表示是本地图片路径
                        imgElement.src = data;
                    } else {
                        // data 是 blob 时，表示是从 fetch 获取的图片
                        const imgUrl = URL.createObjectURL(data);
                        // 释放旧的 URL，防止内存泄漏
                        if (imgElement.src) {
                            URL.revokeObjectURL(imgElement.src);
                        }
                        // 更新图片的 src
                        imgElement.src = imgUrl;
                    }
                }
            })
            .catch(error => console.error('Error fetching photo:', error));
    });
}
