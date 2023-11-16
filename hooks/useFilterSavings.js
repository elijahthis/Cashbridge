import { useEffect, useState } from "react";

const useFilterSavings = (transactionArr) => {
	if (!Array.isArray(transactionArr)) {
		throw new Error("Invalid input: transactionArr must be an array");
	}

	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		amountRange: null,
		status: null,
	});

	const { startDate, endDate, amountRange, status } = filters;

	const filteredSavings = transactionArr.filter((transaction) => {
		const transactionDate = new Date(transaction.createdAt);
		const isDateInRange =
			(!startDate || transactionDate >= startDate) &&
			(!endDate || transactionDate <= endDate);

		let isAmountInRange = true;
		if (amountRange) {
			isAmountInRange =
				transaction.amount >= amountRange.from &&
				transaction.amount <= amountRange.to;
		}

		let isTransactionStatusMatch = true;
		if (status) {
			isTransactionStatusMatch = transaction.status === status;
		}

		return isDateInRange && isAmountInRange && isTransactionStatusMatch;
	});

	console.log("filteredSavings", filteredSavings);

	return {
		filteredSavings,
		startDate,
		endDate,
		setStartDate: (date) =>
			setFilters((prevFilters) => ({ ...prevFilters, startDate: date })),
		setEndDate: (date) =>
			setFilters((prevFilters) => ({ ...prevFilters, endDate: date })),
		amountRange,
		setAmountRange: (range) =>
			setFilters((prevFilters) => ({ ...prevFilters, amountRange: range })),
		status,
		setStatus: (type) =>
			setFilters((prevFilters) => ({ ...prevFilters, status: type })),
	};
};

export default useFilterSavings;
