function updateTime() {
    const now = new Date();
    const year = String(now.getFullYear()).padStart(4, '0');
    const mon = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `⏱${year}-${mon}-${day} ${hours}:${minutes}:${seconds}`;

    // 更新显示内容
    document.getElementById('timeDisplay').innerText = timeString;
}

// 页面加载时立即显示时间
updateTime();
        
// 每秒更新一次时间
setInterval(updateTime, 1000);