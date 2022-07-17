// 导入路由
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { HistoryRouter, history } from "./utils/history";
import AuthComponent from "@/components/AuthComponent";
// 导入必要组件
import { lazy, Suspense } from "react";
// 按需导入路由组件
const Login = lazy(() => import("@/pages/Login"));
const Layout = lazy(() => import("@/pages/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));
// 导入页面组件

function App() {
	return (
		<HistoryRouter history={history}>
			<Suspense
				fallback={
					<div
						style={{
							textAlign: "center",
							marginTop: 200,
						}}
					>
						<h2>loading...</h2>
					</div>
				}
			>
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
						<Route path="article" element={<Article />} />
						<Route path="publish" element={<Publish />} />
					</Route>
					{/* 不需要鉴权的路由 */}
					<Route path="/login" element={<Login />} />
				</Routes>
			</Suspense>
		</HistoryRouter>
	);
}

export default observer(App);
