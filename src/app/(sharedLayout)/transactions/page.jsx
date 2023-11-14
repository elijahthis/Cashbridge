import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import { middleware } from "../middleware";
import CompanyWallet from "@/component/transactions/CompanyWallet";
import CompanyTransactions from "@/component/transactions/CompanyTransactions";
import CompanyWalletHistory from "@/component/transactions/CompanyWalletHistory";

async function Transaction() {
	return (
		<>
			{/* <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
				<ListTab pageSize={9} />
			</section> */}

			<CompanyTransactions />
			<CompanyWallet />
			<CompanyWalletHistory />
		</>
	);
}

export default Transaction;
