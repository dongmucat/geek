import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
class RootStore {
	constructor() {
		this.loginStore = new LoginStore();
		this.userStore = new UserStore();
	}
}
//  固定封装模式
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);
export { useStore };
