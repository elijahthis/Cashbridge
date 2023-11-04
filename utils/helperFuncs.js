export const prettifyMoney = (value) => {
	if (value < 1000000)
		return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
	else
		return Intl.NumberFormat("en-US", {
			notation: "compact",
			maximumFractionDigits: 1,
		}).format(value);
};

export const capitalizeFirstLetter = (text) =>
	text.charAt(0).toUpperCase() + text.slice(1);

export const convertWeirdDate = (dateString) => {
	var dateParts = dateString.split("-"); // Split the date string into parts

	// Reorder the parts in the "YYYY-MM-DD" format
	var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

	return formattedDate;
};

export const formatDate = (date) => {
	console.log(date);
	// format date as Apr 02,2022
	const d = new Date(date);
	const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
	const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
	const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
	return `${mo} ${da}, ${ye}`;
};
