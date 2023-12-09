import SavingsConfigList from "@/component/savings/SavingsConfigList";
import SavingsList from "@/component/savings/SavingsList";
import SavingsWidget from "@/component/savings/SavingsWidget";

function MyWallet() {
	return (
		<>
			<div className="">
				<SavingsWidget />
				<SavingsConfigList />
				<SavingsList />
			</div>
		</>
	);
}

export default MyWallet;
