const FilterRow = ({ children, clearFilters }) => {
	return (
		<div className="Filters bg-white py-4 px-4 rounded-lg flex flex-row items-stretch gap-4 flex-wrap ">
			{children}
			<button
				className="ml-auto text-success-300"
				onClick={() => {
					clearFilters();
				}}
			>
				Clear filters
			</button>
		</div>
	);
};

export default FilterRow;
