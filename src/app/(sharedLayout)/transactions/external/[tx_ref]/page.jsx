import SelectedExternalTransactionClient from "@/component/transactions/SelectedExternalTransactionClient";

const SelectedExternalTransaction = ({ params }) => {
	return (
		<div>
			<SelectedExternalTransactionClient params={params} />
		</div>
	);
};

export default SelectedExternalTransaction;
