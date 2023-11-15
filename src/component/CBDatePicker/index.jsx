import { useState } from "react";
import DatePicker from "react-datepicker";
import { convertWeirdDate } from "../../../utils/helperFuncs";
// import "react-datepicker/dist/react-datepicker.css";

const CBDatePicker = ({ selectedDate, handleSelect }) => {
	return (
		<DatePicker
			selected={new Date(convertWeirdDate(selectedDate))}
			onChange={(date) => handleSelect(date)}
			dateFormat="dd MMM yyyy"
			wrapperClassName={``}
			showMonthDropdown
			showYearDropdown
			dateFormatCalendar={"MMM yyyy"}
			minDate={new Date("1900-01-01")}
			maxDate={new Date()}
		/>
	);
};

export default CBDatePicker;
