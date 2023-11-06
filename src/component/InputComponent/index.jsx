const InputComponent = ({ label, name, value, onChange, required = false }) => {
	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor={name}
				className="text-base text-bgray-600 dark:text-bgray-50  font-medium text-sm "
			>
				{label}
			</label>
			<input
				type="text"
				className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
				name={name}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</div>
	);
};

export default InputComponent;
