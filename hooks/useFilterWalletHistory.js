import { useEffect, useState } from "react";

const useFilterWalletHistory = (transactionArr) => {
	const [filterDate, setFilterDate] = useState(null);
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactionArr);

	const handleFilterDate = (date) => {
		setFilterDate(date);
	};

	useEffect(() => {
		if (filterDate) {
			setFilteredTransactions(
				transactionArr.filter((transaction) => {
					const transactionDate = new Date(transaction.startTime);
					return transactionDate.toDateString() === filterDate.toDateString();
				})
			);
		} else {
			setFilteredTransactions(transactionArr);
		}
	}, [filterDate, transactionArr]);

	return { filterDate, filteredTransactions, handleFilterDate };
};

export default useFilterWalletHistory;
