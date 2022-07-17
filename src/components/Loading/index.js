import "./index.scss";
export default function Loading(props) {
    const {loadingText} = props
	return (
		<div className="loading-container">
			<div className="loading">
            </div>
            <h3>{loadingText}</h3>
		</div>
	);
}
