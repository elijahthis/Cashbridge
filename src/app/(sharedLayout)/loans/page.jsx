import LoanAnalyticsWidget from "@/component/loans/LoanAnalyticsWidget";
import LoanList from "@/component/loans/LoanList";
import LoanTierList from "@/component/loans/LoanTierList";

function Loans() {
	return (
		<>
			<div className="mb-6 ">
				<LoanAnalyticsWidget />
				<LoanList />
				<LoanTierList />
			</div>
		</>
	);
}

export default Loans;
