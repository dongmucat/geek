import { useState,useEffect } from "react";
import { http } from "@/utils";
export default function useChannels() {
	const [channels, setChannels] = useState([]);

	// 发送请求，获取频道列表
	useEffect(() => {
		(async () => {
			const res = await http.get("/channels");
			setChannels(res.data.data.channels);
		})();
	}, []);
	return [channels, setChannels];
}
