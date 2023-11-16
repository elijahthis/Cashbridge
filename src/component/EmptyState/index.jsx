import Button from "../button";

const EmptyState = ({
	message = "Nothing to see here.",
	button,
	height = 250,
}) => (
	<div className="EmptyState p-6" style={{ height: `${height}px` }}>
		<p>{message}</p>
		{button && (
			<Button onClick={button?.action} className="pry">
				{button.label}
			</Button>
		)}
	</div>
);

export default EmptyState;
