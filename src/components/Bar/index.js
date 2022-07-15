import * as echarts from "echarts";
import { useRef, useEffect } from "react";
const Bar = ({ style, xData, series, title }) => {
	const barRef = useRef();
	/**
	 * 用于Chart图表
	 * @param {*} node 节点DOM
	 * @param {*} xData 横轴名称
	 * @param {*} sData 数据
	 * @param {*} title
	 */
	const chartInit = (node, xData, series, title) => {
		const chart = echarts.init(node);
		const option = {
			title: {
				text: title,
			},
			tooltip: {},
			xAxis: {
				data: xData,
			},
			yAxis: {},
			series: [
				{
					name: series.name,
					type: "bar",
					data: series.data,
				},
			],
		};
		chart.setOption(option);
	};

	useEffect(() => {
		chartInit(barRef.current, xData, series, title);
	}, []);

	return <div ref={barRef} style={style}></div>;
};

export default Bar;
