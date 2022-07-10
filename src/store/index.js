import React from "react";
import LoginStore from "./login.Store";
class RootStore {
	constructor() {
		this.loginStore = new LoginStore();
	}
}
//  固定封装模式
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);
export { useStore };
