import { useEffect, useState } from "react";

const useFilterWalletHistory = (transactionArr) => {
	if (!Array.isArray(transactionArr)) {
		throw new Error("Invalid input: transactionArr must be an array");
	}

	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		amountRange: null,
		transactionType: null,
	});

	const { startDate, endDate, amountRange, transactionType } = filters;

	const filteredTransactions = transactionArr.filter((transaction) => {
		const transactionDate = new Date(transaction.date);
		const isDateInRange =
			(!startDate || transactionDate >= startDate) &&
			(!endDate || transactionDate <= endDate);

		let isAmountInRange = true;
		if (amountRange) {
			isAmountInRange =
				transaction.amount >= amountRange.from &&
				transaction.amount <= amountRange.to;
		}

		let isTransactionTypeMatch = true;
		if (transactionType) {
			isTransactionTypeMatch = transaction.type === transactionType;
		}

		return isDateInRange && isAmountInRange && isTransactionTypeMatch;
	});

	console.log("filteredTransactions", filteredTransactions);

	return {
		filteredTransactions,
		startDate,
		endDate,
		setStartDate: (date) =>
			setFilters((prevFilters) => ({ ...prevFilters, startDate: date })),
		setEndDate: (date) =>
			setFilters((prevFilters) => ({ ...prevFilters, endDate: date })),
		amountRange,
		setAmountRange: (range) =>
			setFilters((prevFilters) => ({ ...prevFilters, amountRange: range })),
		transactionType,
		setTransactionType: (type) =>
			setFilters((prevFilters) => ({ ...prevFilters, transactionType: type })),
	};
};

export default useFilterWalletHistory;
