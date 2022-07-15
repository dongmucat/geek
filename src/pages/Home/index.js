import Bar from "@/components/Bar";
import "./index.scss";
const Home = () => {
	return (
		<div className="home">
			<Bar
				style={{ width: "400px", height: "400px" }}
				xData={["vue", "angular", "react"]}
				series={{
					name: "满意度",
					data: [50, 60, 70],
				}}
				title="三大框架满意度"
			/>

			<Bar
				style={{ width: "400px", height: "400px" }}
				xData={["vue", "angular", "react"]}
				series={{
					name: "使用度",
					data: [50, 60, 70],
				}}
				title="三大框架使用度"
			/>
		</div>
	);
};

export default Home;
