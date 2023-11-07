import { useState } from "react";
import DatePicker from "react-datepicker";
import { convertWeirdDate } from "../../../utils/helperFuncs";

const CBDatePicker = ({ selectedDate, handleSelect }) => {
	return (
		<DatePicker
			selected={new Date(convertWeirdDate(selectedDate))}
			onChange={(date) => handleSelect(date)}
			dateFormat="dd MMM yyyy"
			wrapperClassName={``}
		/>
	);
};

export default CBDatePicker;
