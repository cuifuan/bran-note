安装 `volar` 插件在` vsCode`

### 三、引入 Ant Design Vue@3.1.1

[官网文档地址](https://www.antdv.com/docs/vue/introduce-cn)

#### a.安装依赖

```bash
npm install ant-design-vue@3.1.1 --save
```
#### b.引入 antd 到 main.ts
```typescript
import { createApp } from "vue";
import App from "./App.vue";

// 引入Antd
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

app.use(Antd).mount("#app");
```

#### c.安装 `ant-design-vue-helper` 插件在` vsCode`

![image-20220419115630637](http://images.zabbix.store/images/image-20220419115630637.png)

### 四. 路由

#### 1. 安装依赖

```bash
npm install vue-router@4
```

#### 2. 创建依赖

在项目根目录src下面，创建router文件夹，然后创建index.ts文件
**index.ts**
```	bash
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Layout,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
```

在main.ts中引入路由  

**main.ts**

```typescript
import { createApp } from "vue";
import App from "./App.vue";

// 引入Antd
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 引入路由
import router from "./router";

const app = createApp(App);

app.use(router).use(Antd).mount("#app");
```

### 五.配置vite

#### 配置别名

```bash
# 安装依赖
npm install @types/node --save-dev
```

引入 **vite.config.ts**

```typescript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: "0.0.0.0", // 解决use `--host` to expose
        port: 8443,
        open: true,
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src"),
            },
        ],
    },
});
```

引入别名到 **tsconfig.json** 在`lib`属性后嵌入代码

```json
"baseUrl": ".", // paths 路径解析起点
"paths": {
    "@/*": ["src/*"] // 别名路径设置
}
```

