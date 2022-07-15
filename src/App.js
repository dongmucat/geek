// 导入路由
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { HistoryRouter, history } from "./utils/history";
// 导入页面组件
import Login from "./pages/Login/index.js";
import Layout from "./pages/Layout";
import Home from "./pages/Home/index.js";
import Article from "./pages/Article/index.js";
import Publish from "./pages/Publish/index.js";
import AuthComponent from "@/components/AuthComponent/index.js";
function App() {
	return (
		<HistoryRouter history={history}>
			<div className="App">
				<Routes>
					{/* 需要鉴权的路由 */}
					<Route
						path="/"
						element={
							<AuthComponent>
								<Layout />
							</AuthComponent>
						}
					>
						{/* 二级路由默认页面 */}
						<Route index element={<Home />} />
						<Route path="/article" element={<Article />} />
						<Route path="/publish" element={<Publish />} />
					</Route>
					{/* 不需要鉴权的路由 */}
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</HistoryRouter>
	);
}

export default observer(App);
