import SavingsConfigList from "@/component/savings/SavingsConfigList";
import SavingsList from "@/component/savings/SavingsList";

function MyWallet() {
	return (
		<>
			<div className="">
				<SavingsConfigList />
				<SavingsList />
			</div>
		</>
	);
}

export default MyWallet;
