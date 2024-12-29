import { useState } from "react";
// import DatePicker from "react-datepicker";
// import { convertWeirdDate } from "../../../utils/helperFuncs";
// import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-multi-date-picker";

const CBDatePicker = ({ selectedDate, handleSelect }) => {
	return (
		<DatePicker
			value={selectedDate}
			onChange={(date) => handleSelect(date)}
			// dateFormat="dd MMM yyyy"
			// wrapperClassName={``}
			// showMonthDropdown
			// showYearDropdown
			// dateFormatCalendar={"MMM yyyy"}
			// minDate={new Date("1900-01-01")}
			// maxDate={new Date()}
		/>
	);
};

export default CBDatePicker;
