import SelectedLoanInfo from "@/component/loans/SelectedLoanInfo";

const LoanDetails = ({ params }) => {
	return (
		<div>
			<SelectedLoanInfo id={params?.id} />
		</div>
	);
};

export default LoanDetails;
