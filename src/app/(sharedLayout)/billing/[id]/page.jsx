import SelectedBillingInfo from "@/component/billing/BillingInfo";

const SingleBillingPage = ({ params }) => {
	return <SelectedBillingInfo id={params?.id} />;
};

export default SingleBillingPage;
