import CompanyWallet from "@/component/transactions/CompanyWallet";
import CompanyTransactions from "@/component/transactions/CompanyTransactions";
import CompanyWalletHistory from "@/component/transactions/CompanyWalletHistory";
import SavingTransactionList from "@/component/transactions/SavingTransactionList";

async function Transaction() {
	return (
		<>
			<CompanyWallet />
			<CompanyTransactions />
			<CompanyWalletHistory />
			<SavingTransactionList />
		</>
	);
}

export default Transaction;
