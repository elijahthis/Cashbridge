import { useEffect, useState } from "react";

const useFilterWalletHistory = (transactionArr) => {
	const [filterStartDate, setFilterStartDate] = useState(undefined);
	const [filterEndDate, setFilterEndDate] = useState(undefined);
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactionArr);

	const filterTransactionsFunc = [...transactionArr].filter((transaction) => {
		const transactionDate = new Date(transaction.date);
		const startDate = new Date(filterStartDate);
		const endDate = new Date(filterEndDate);
		if (filterStartDate && filterEndDate) {
			return (
				transactionDate.getTime() >= startDate.getTime() &&
				transactionDate.getTime() <= endDate.getTime()
			);
		} else if (filterStartDate) {
			return transactionDate.getTime() >= startDate.getTime();
		} else if (filterEndDate) {
			return transactionDate.getTime() <= endDate.getTime();
		} else {
			return true;
		}
	});
	useEffect(() => {
		// filter transactions by date
		setFilteredTransactions(filterTransactionsFunc);
	}, [filterStartDate, filterEndDate, transactionArr]);

	console.log("filteredTransactions", filteredTransactions);

	return {
		filteredTransactions,
		filterStartDate,
		filterEndDate,
		setFilterStartDate,
		setFilterEndDate,
	};
};

export default useFilterWalletHistory;
