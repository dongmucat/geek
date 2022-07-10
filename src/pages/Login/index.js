import { Card, Button, Checkbox, Form, Input, message } from "antd";
import logo from "@/assets/images/logo.png";
import "./index.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const { loginStore } = useStore();
	const navigate = useNavigate();
	const onFinish = async (values) => {
		const { mobile, code } = values;

		try {
			await loginStore.getToken({
				mobile,
				code,
			});
			message.success("登录成功~");
			navigate("/", { replace: true });
		} catch (error) {
			message.error(error.response?.data?.message || "登录失败");
		}
	};

	const onFinishFailed = (errorInfo) => {
		message.error("登录失败，请填写完整!");
	};
	return (
		<div className="login">
			<Card className="login-container">
				{/* logo图片 */}
				<img className="login-logo" src={logo} alt="" />
				{/* 登录表单 */}
				<Form
					validateTrigger={["onBlur", "onChange"]}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						name="mobile"
						rules={[
							{
								pattern: /^1[3-9]\d{9}$/,
								message: "手机号码格式不对",
								validateTrigger: "onBlur",
							},
							{ required: true, message: "请输入手机号" },
						]}
					>
						<Input size="large" placeholder="请输入手机号" />
					</Form.Item>
					<Form.Item
						name="code"
						rules={[
							{
								len: 6,
								message: "验证码6个字符",
								validateTrigger: "onBlur",
							},
							{ required: true, message: "请输入验证码" },
						]}
					>
						<Input
							size="large"
							placeholder="请输入验证码"
							maxLength={6}
						/>
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						rules={[
							{
								required: true,
								message:
									"请同意并且阅读「用户协议」和「隐私条款」",
							},
						]}
					>
						<Checkbox className="login-checkbox-label">
							我已阅读并同意「用户协议」和「隐私条款」
						</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							block
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};
export default Login;
