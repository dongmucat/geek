// 1. 判断token是否存在
// 2. 如果存在 直接正常渲染
// 3. 如果不存在 重定向到登录路由

// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
import { loadToken } from "@/utils";
import { Navigate } from "react-router-dom";
const AuthComponent = ({ children }) => {
	console.log(children);
	const token = loadToken();
	if (token) {
		return <>{children}</>;
	} else {
		return <Navigate to="/login" replace />;
	}
};

export default AuthComponent;
