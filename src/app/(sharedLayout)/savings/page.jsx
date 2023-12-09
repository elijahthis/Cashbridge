import SavingsAnalyticsWidget from "@/component/savings/SavingsAnalyticsWidget";
import SavingsConfigList from "@/component/savings/SavingsConfigList";
import SavingsList from "@/component/savings/SavingsList";

function Savings() {
	return (
		<>
			<div className="">
				<SavingsAnalyticsWidget />
				<SavingsConfigList />
				<SavingsList />
			</div>
		</>
	);
}

export default Savings;
