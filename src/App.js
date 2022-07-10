// 导入路由
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
// 导入页面组件
import Login from "./pages/Login/index.js";
import Layout from "./pages/Layout";
import AuthComponent from "@/components/AuthComponent/index.js";
function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					{/* 需要鉴权的路由 */}
					<Route
						path="/*"
						element={
							<AuthComponent>
								<Layout />
							</AuthComponent>
						}
					/>
					{/* 不需要鉴权的路由 */}
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default observer(App);
