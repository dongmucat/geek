import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 引入antd样式文件
import "antd/dist/antd.min.css";
// 引入全局样式文件
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
