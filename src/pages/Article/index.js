import { Link } from "react-router-dom";
import {
	Card,
	Breadcrumb,
	Form,
	Radio,
	Select,
	DatePicker,
	Button,
	Table,
	Space,
	Tag,
	Popconfirm,
	message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import img404 from "@/assets/images/error.png";
import { useState, useEffect } from "react";
import { history } from "@/utils/history.js";
import { http } from "@/utils";
const { Option } = Select;
const { RangePicker } = DatePicker;
const Article = () => {
	// 初始化频道列表
	const [channels, setChannels] = useState([]);
	// 初始化文章列表
	const [article, setArticle] = useState({
		list: [],
		count: 0,
	});
	// 初始化参数管理
	const [params, setParams] = useState({
		page: 1,
		per_page: 10,
	});
	// 发送请求，获取频道列表
	useEffect(() => {
		(async () => {
			const res = await http.get("/channels");
			setChannels(res.data.data.channels);
		})();
	}, []);
	// 发送请求，获取文章
	useEffect(() => {
		(async () => {
			const res = await http.get("/mp/articles", { params });
			const { results, total_count } = res.data.data;
			setArticle({ list: [...results], count: total_count });
		})();
	}, [params]);

	/**
	 *
	 * @param {*} values 根据参数进行搜索
	 */
	const onSearch = (values) => {
		const { status, channel_id, date } = values;
		// 格式化表单参数
		const paramsTemp = {
			status,
		};
		if (channel_id) {
			paramsTemp.channel_id = channel_id;
		}
		if (date) {
			paramsTemp.begin_pubdate = date[0].format("YYYY-MM-DD");
			paramsTemp.end_pubdate = date[1].format("YYYY-MM-DD");
		}
		// 修改params参数 触发接口再次发起
		setParams({
			...params,
			...paramsTemp,
		});
	};
	/**
	 * 用于删除文章
	 * @param {*} data 该行的数据
	 */
	const onDelArticle = async (data) => {
		// 删除文章
		await http.delete(`/mp/articles/${data.id}`);
		message.success("删除成功");
		// 更新列表
		setParams({
			page: 1,
			per_page: 10,
		});
	};
	const columns = [
		{
			title: "封面",
			dataIndex: "cover",
			width: 120,
			key: "cover",
			render: (cover) => {
				return (
					<img src={cover || img404} width={80} height={60} alt="" />
				);
			},
		},
		{
			title: "标题",
			dataIndex: "title",
			width: 220,
			key: "title",
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: (data) => <Tag color="green">审核通过</Tag>,
		},
		{
			title: "发布时间",
			dataIndex: "pubdate",
			key: "pubdate",
		},
		{
			title: "阅读数",
			dataIndex: "read_count",
			key: "read_count",
		},
		{
			title: "评论数",
			dataIndex: "comment_count",
			key: "comment_count",
		},
		{
			title: "点赞数",
			dataIndex: "like_count",
			key: "like_count",
		},
		{
			title: "操作",
			key: "action",
			render: (data) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={() =>
								history.push(`/home/publish?id=${data.id}`)
							}
						/>
						<Popconfirm
							title="确认删除该条文章吗?"
							onConfirm={() => onDelArticle(data)}
							okText="确认"
							cancelText="取消"
						>
							<Button
								type="primary"
								danger
								shape="circle"
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	return (
		<div className="article">
			{/* 筛选区 */}
			<Card
				title={
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to={"/"}>首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>内容管理</Breadcrumb.Item>
					</Breadcrumb>
				}
				style={{ marginBottom: "20px" }}
			>
				<Form onFinish={onSearch} initialValues={{ status: null }}>
					{/* 状态 */}
					<Form.Item label="状态" name="status">
						<Radio.Group>
							<Radio value={null}>全部</Radio>
							<Radio value={0}>草稿</Radio>
							<Radio value={1}>待审核</Radio>
							<Radio value={2}>审核通过</Radio>
							<Radio value={3}>审核失败</Radio>
						</Radio.Group>
					</Form.Item>
					{/* 频道 */}
					<Form.Item label="频道" name="channel_id">
						<Select
							placeholder="请选择文章频道"
							style={{ width: 120 }}
						>
							{channels.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					{/* 日期控件 */}
					<Form.Item label="日期" name="date">
						<RangePicker locale={locale}></RangePicker>
					</Form.Item>
					{/* 筛选按钮 */}
					<Form.Item>
						<Button type="primary" htmlType="submit">
							筛选
						</Button>
					</Form.Item>
				</Form>
			</Card>
			{/* 文章列表区域 */}
			<Card title={`根据筛选条件共查询到${article.count}条结果：`}>
				<Table
					rowKey="id"
					columns={columns}
					dataSource={article.list}
				/>
			</Card>
		</div>
	);
};

export default Article;
