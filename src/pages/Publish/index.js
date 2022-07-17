import {
	Card,
	Breadcrumb,
	Form,
	Button,
	Radio,
	Input,
	Upload,
	Space,
	Select,
	message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import { useChannels } from "@/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { http } from "@/utils";
const { Option } = Select;

const Publish = () => {
	const fileListRef = useRef([]);
	const formRef = useRef();
	const [params] = useSearchParams();
	const articleId = params.get("id");
	const [channels] = useChannels();
	const [fileList, setFileList] = useState([]);

	const [imgCount, setImgCount] = useState(1);
	// 修改文章，表单数据回填
	useEffect(() => {
		async function getArticle() {
			const res = await http.get(`/mp/articles/${articleId}`);
			// 动态设置表单数据
			const { cover, ...formValue } = res.data.data;
			// 动态设置表单数据
			formRef.current.setFieldsValue({ ...formValue, type: cover.type });
			// 图片
			const imageList = cover.images.map((url) => ({ url }));
			setFileList(imageList);
			setImgCount(cover.type);
			fileListRef.current = imageList;
		}
		if (articleId) {
			// 拉取数据回显
			getArticle();
		}
	}, [articleId]);
	// 清空表单
	const onReset = () => {
		setFileList([]);
		formRef.current.resetFields();
	};
	const onChangeType = (e) => {
		const count = e.target.value;
		setImgCount(count);

		if (count === 1) {
			// 单图，只展示第一张
			const firstImg = fileListRef.current[0];
			setFileList(!firstImg ? [] : [firstImg]);
		} else if (count === 3) {
			// 三图，展示所有图片
			setFileList(fileListRef.current);
		}
	};
	// 上传成功回调
	const onUploadChange = (info) => {
		const fileList = info.fileList.map((file) => {
			if (file.response) {
				return {
					url: file.response.data.url,
				};
			}
			return file;
		});
		fileListRef.current = fileList;
		setFileList(fileList);
	};
	const onFinish = async (values) => {
		const { type, ...rest } = values;
		const data = {
			...rest,
			// 注意：接口会按照上传图片数量来决定单图 或 三图
			cover: {
				type,
				images: fileList.map((item) => item.url),
			},
		};
		if (articleId) {
			// 编辑
			await http.put(`/mp/articles/${data.id}?draft=false`, data);
			message.success("修改成功！");
		} else {
			// 新增
			await http.post("/mp/articles?draft=false", data);
			message.success("发布成功！");
		}
		onReset();
	};
	return (
		<div className="publish">
			<Card
				title={
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to={"/"}>首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{articleId ? "修改文章" : "发布文章"}
						</Breadcrumb.Item>
					</Breadcrumb>
				}
			>
				<Form
					ref={formRef}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 16 }}
					// 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
					initialValues={{ content: "", type: 1 }}
					onFinish={onFinish}
				>
					<Form.Item
						label="标题"
						name="title"
						rules={[{ required: true, message: "请输入文章标题" }]}
					>
						<Input
							placeholder="请输入文章标题"
							style={{ width: "400px" }}
						/>
					</Form.Item>
					<Form.Item
						label="频道"
						name="channel_id"
						rules={[{ required: true, message: "请选择文章频道" }]}
					>
						<Select
							placeholder="请选择文章频道"
							style={{ width: "200px" }}
						>
							{channels.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="封面">
						<Form.Item name="type">
							<Radio.Group onChange={onChangeType}>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
							</Radio.Group>
						</Form.Item>
						{imgCount > 0 && (
							<Upload
								name="image"
								listType="picture-card"
								className="avatar-uploader"
								action="http://geek.itheima.net/v1_0/upload"
								showUploadList
								onChange={onUploadChange}
								fileList={fileList}
								maxCount={imgCount}
								multiple={imgCount > 1}
							>
								<div style={{ marginTop: 8 }}>
									<PlusOutlined />
								</div>
							</Upload>
						)}
					</Form.Item>
					<Form.Item
						label="内容"
						name="content"
						rules={[{ required: true, message: "请输入文章内容" }]}
					>
						<ReactQuill
							className="publish-quill"
							theme="snow"
							placeholder="请输入文章内容"
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 4 }}>
						<Space>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
							>
								{articleId ? "修改文章" : "发布文章"}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Publish;
