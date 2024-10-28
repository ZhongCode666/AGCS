# 🚁 空地协同地面站 (AGCS) 🚗

**空地协同地面站 (AGCS)** 项目由中山大学钟任新教授团队开发和维护，旨在通过对飞行器和地面车辆的轨迹进行可视化，实现空地协同的监控与指令下发。本项目基于高德地图 JSAPI 构建，为用户提供直观的空地协同系统操作体验。

## 关于高德地图 JSAPI

本项目使用了 [高德地图 JavaScript API (JSAPI)](https://lbs.amap.com/demo/javascript-api-v2) 进行开发。高德地图 JSAPI 提供了丰富的地图功能，包括地图展示、轨迹绘制、位置定位、标记点管理等功能，使用户可以通过浏览器实现灵活的地图操作。本项目借助 JSAPI 的这些功能，实现了飞行器和车辆的轨迹可视化以及空地协同的指令下发。

- **高德 JSAPI 接口文档**：可以访问 [高德地图 JSAPI 文档](https://lbs.amap.com/api/javascript-api-v2/summary/) 查看详细的 API 说明。

## 📂 项目结构

```
├── assets                     # 🌄 静态资源文件
│   ├── car.png                # 🚗 车辆图标
│   ├── drone.png              # 🚁 飞行器图标
│   ├── favicon.ico            # 🌟 网站图标
│   └── star.png               # ⭐ 其他图标
├── css                        # 🎨 样式文件
│   ├── demo-center.css        # 🎯 示例中心样式
│   └── styles.css             # 💅 通用样式
├── js                         # 🖥️ JavaScript 文件
│   ├── config                 # ⚙️ 配置文件
│   │   └── api_config.json    # 🌐 API 配置
│   ├── api.js                 # 🔌 API 调用接口
│   ├── basicSettings.js       # 🛠️ 基本设置
│   ├── fillData.js            # 📊 数据填充，处理轨迹数据
│   ├── hideBlock.js           # 👻 界面隐藏区块的逻辑
│   ├── main.js                # 🚀 主入口文件，初始化页面
│   ├── map.js                 # 🗺️ 地图渲染和轨迹展示功能
│   ├── orderExecute.js        # 🎛️ 命令设置按钮的逻辑处理
│   └── showTime.js            # ⏰ 时间显示功能
└── index.html                 # 🏠 主页面
```

## ✨ 功能说明

- **🚁 飞行器和车辆轨迹可视化**：基于高德地图 JSAPI，实时显示飞行器和地面车辆的轨迹，帮助用户直观了解其位置和移动路径。
- **🤝 空地协同监控**：提供对飞行器和地面车辆的实时监控视图，便于统筹管理空地资源。
- **📬 指令下发**：支持对目标进行指令下发，实现空地一体化指挥。

## 🛠️ 使用说明

1. 克隆项目到本地。
2. 配置 `config/api_config.json` 中的 API 信息，以确保可以正常调用后台数据。
3. 打开 `index.html` 文件，在浏览器中查看实时的空地协同监控界面。
4. 使用地图上的功能按钮对飞行器和车辆进行控制和指令下发。

### ⚙️ 本地调试提示

- 建议使用 [VS Code](https://code.visualstudio.com/) 并安装 **Live Server** 插件，以便在本地进行快速预览和调试。
- 由于项目使用了 HTTP 协议进行数据请求，请在浏览器中安装 **ALLOW CORS** 插件，以解决跨域访问问题，确保项目正常运行。
- 若需查看日志内容，按下 `F12` 打开开发者工具，然后在 **Console** 面板中查看输出信息。

## 🤗 贡献指南

如果您希望为该项目做出贡献，请遵循以下步骤：

1. 🍴 Fork 此项目。
2. 🌱 创建新分支：`git checkout -b feature/你的功能`。
3. 💻 提交代码：`git commit -m '添加新功能'`。
4. 📤 推送分支：`git push origin feature/你的功能`。
5. 🎉 提交 Pull Request。

---

感谢您对**空地协同地面站 (AGCS)** 项目的关注和使用！如有任何问题，请随时联系钟任新教授团队。😊
```
