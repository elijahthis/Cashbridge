import LoanList from "@/component/loans/LoanList";
import LoanTierList from "@/component/loans/LoanTierList";

function Loans() {
	return (
		<>
			<div className="mb-6 ">
				<LoanList />
				<LoanTierList />
			</div>
		</>
	);
}

export default Loans;
