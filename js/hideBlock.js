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
    const toggleIcon = document.getElementById('left-toggle-icon');
    sidebar.classList.toggle('collapsed'); // 切换类名以显示或隐藏内容
}

