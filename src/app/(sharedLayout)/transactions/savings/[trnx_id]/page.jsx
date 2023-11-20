import SelectedExternalTransactionClient from "@/component/transactions/SelectedSavingsTransactionClient";

const SelectedSavingsTransaction = ({ params }) => {
	return (
		<div>
			<SelectedExternalTransactionClient params={params} />
		</div>
	);
};

export default SelectedSavingsTransaction;
