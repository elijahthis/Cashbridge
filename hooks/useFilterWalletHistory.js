import { useEffect, useState } from "react";

const useFilterWalletHistory = (transactionArr) => {
	const [filterStartDate, setFilterStartDate] = useState(undefined);
	const [filterEndDate, setFilterEndDate] = useState(undefined);
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactionArr);

	useEffect(() => {
		if (filterStartDate) {
			if (filterEndDate) {
				setFilteredTransactions(
					filteredTransactions.filter((transaction) => {
						const transactionDate = new Date(transaction.date);
						return (
							transactionDate >= filterStartDate &&
							transactionDate <= filterEndDate
						);
					})
				);
			} else
				setFilteredTransactions(
					transactionArr.filter((transaction) => {
						const transactionDate = new Date(transaction.date);
						return transactionDate >= filterStartDate;
					})
				);
		} else if (filterEndDate) {
			setFilteredTransactions(
				transactionArr.filter((transaction) => {
					const transactionDate = new Date(transaction.date);
					return transactionDate <= filterEndDate;
				})
			);
		} else {
			setFilteredTransactions(transactionArr);
		}
	}, [filterStartDate, filterEndDate, transactionArr]);

	return {
		filteredTransactions,
		filterStartDate,
		filterEndDate,
		setFilterStartDate,
		setFilterEndDate,
	};
};

export default useFilterWalletHistory;
