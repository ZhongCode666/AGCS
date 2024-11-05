function toggleDisplay() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.classList.toggle('collapsed'); // 切换类以显示或隐藏内容
}

function toggleSettingsDisplay() {
    const settingsDisplay = document.getElementById('settingsDisplay');
    const toggleIcon = document.getElementById('toggle-icon');
    settingsDisplay.classList.toggle('collapsed'); // 切换类名以显示或隐藏内容

}

function toggleLeftSidebar() {
    const sidebar = document.getElementById('leftSidebar');
    sidebar.classList.toggle('collapsed'); // 切换类名以显示或隐藏内容
}

function toggleRealtime() {
    const sidebar = document.getElementById('photoPanel');
    sidebar.classList.toggle('collapsed'); // 切换类名以显示或隐藏内容
}


function alwaysDisplayData() {
    const dataDisplay = document.getElementById('dataDisplay');
    
    // 强制移除 'collapsed' 类，确保内容是展开的
    if (dataDisplay.classList.contains('collapsed')) {
        dataDisplay.classList.remove('collapsed');
    }
}

function alwwaysDisplayRealtime() {
    const sidebar = document.getElementById('photoPanel');
    // 强制移除 'collapsed' 类，确保内容是展开的
    if (dataDisplay.classList.contains('collapsed')) {
        dataDisplay.classList.remove('collapsed');
    }
}