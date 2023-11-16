const FilterBlock = ({ label, children }) => {
	return (
		<div>
			<p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
				{label}
			</p>
			{children}
		</div>
	);
};

export default FilterBlock;
