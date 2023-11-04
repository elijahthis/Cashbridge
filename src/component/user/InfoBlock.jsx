const InfoBlock = ({ title, children }) => {
	return (
		<div className="mb-5">
			<h3 className="font-bold">{title}</h3>
			<ul className="py-7 border-t border-gray-200 dark:border-darkblack-400 space-y-6">
				{children}
			</ul>
		</div>
	);
};

export default InfoBlock;
