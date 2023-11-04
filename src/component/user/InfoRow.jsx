const InfoRow = ({ label, value }) => {
	return (
		<li className="flex justify-between">
			<span className="font-medium text-gray-500 text-sm dark:text-white">
				{label}
			</span>
			<span className="text-sm font-semibold text-bgray-900 dark:text-white">
				{value}
			</span>
		</li>
	);
};

export default InfoRow;
