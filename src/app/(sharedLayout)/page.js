import TotalWidget from "@/component/widget/TotalWidget";
import RevenueFlow from "@/component/revenueFlow";
import ListTab from "@/component/listTab";
import Wallet from "@/component/wallet";
import TeamChat from "@/component/teamChat";
import Efficiency from "@/component/revenueFlow/Efficiency";
import UserDashPage from "@/component/dashboard/UserDashPage";
import TransactionDashPage from "@/component/dashboard/TransactionDashPage";

export const metadata = {
	title: "Dashboard | Cashbridge",
	description: "Cashbridge Dashboard",
};

function Home() {
	return (
		<main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
			{/* write your code here */}
			<div>
				<section className="mb-6 ">
					<TotalWidget />
					{/* <ListTab /> */}
					<UserDashPage />
					<TransactionDashPage />
				</section>
			</div>
		</main>
	);
}

export default Home;
