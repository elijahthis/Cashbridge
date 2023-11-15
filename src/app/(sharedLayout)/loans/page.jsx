import Wallet from "@/component/wallet";
import TeamChat from "@/component/teamChat";
import HistoryTable from "@/component/listTab/HistoryTable";

function History() {
	return (
		<>
			<section className="mb-6 ">
				<HistoryTable />
			</section>
			<section className=" w-full flex flex-col lg:flex-row lg:space-x-6 space-x-0">
				<Wallet />
				<TeamChat />
			</section>
		</>
	);
}

export default History;
