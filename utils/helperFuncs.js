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
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const d = new Date(date);
	const ye = d.getFullYear();
	const mo = months[d.getMonth()];
	const da = String(d.getDate()).padStart(2, "0");

	return `${mo} ${da},${ye}`;
};

export function formatDateToDdMmYyyy(date) {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Month is 0-based.
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}
export function formatNumberAsMoney(number) {
	// Check if the input is a valid number
	if (isNaN(number)) {
		return "Invalid input";
	}

	// Round the number to 2 decimal places
	const roundedNumber = Math.round(number * 100) / 100;

	// Convert the number to a string with commas for thousands, millions, etc.
	const formattedNumber = roundedNumber.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formattedNumber;
}

export function camelCaseToTitleCase(inputString) {
	// Handle empty input
	if (!inputString) {
		return "";
	}

	// Add a space before each capital letter, except for the first letter
	const titleCaseString = inputString.replace(/([A-Z])/g, " $1");

	// Capitalize the first letter and remove leading space
	return (
		titleCaseString.charAt(0).toUpperCase() + titleCaseString.slice(1).trim()
	);
}

export function formatDatetoYyyyMmDd(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export const generateURLParams = (params) => {
	let urlParams = "";
	for (const key in params) {
		if (params[key]) {
			urlParams += `${key}=${params[key]}&`;
		}
	}
	return urlParams;
};
