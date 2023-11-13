import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import { middleware } from "../middleware";
import CompanyWallet from "@/component/transactions/CompanyWallet";
import CompanyTransactions from "@/component/transactions/CompanyTransactions";

async function Transaction() {
	return (
		<>
			{/* <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
				<ListTab pageSize={9} />
			</section> */}
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Company Transactions</h2>
				<CompanyTransactions />
			</section>
			<section className="py-6">
				<h2 className="font-bold text-3xl mb-4">Wallet</h2>
				<CompanyWallet />
			</section>
		</>
	);
}

export default Transaction;
