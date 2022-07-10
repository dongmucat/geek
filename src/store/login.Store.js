import { makeAutoObservable } from "mobx";
import { http, saveToken, loadToken } from "@/utils";
class LoginStore {
	// 定义数据
	token = loadToken() || "";
	constructor() {
		makeAutoObservable(this);
	}

	async getToken({ mobile, code }) {
		const res = await http.post(
			"http://geek.itheima.net/v1_0/authorizations",
			{
				mobile,
				code,
			}
		);
		this.token = res.data.data.token;
		// token持久化
		saveToken(res.data.data.token);
	}
}

export default LoginStore;
