import React from "react";

export const metadata = {
	title: "Billing | Cashbridge",
	description: "Cashbridge Billing",
};

function BillingLayout({ children }) {
	return (
		<main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-[48px] xl:pb-[48px] dark:bg-darkblack-700">
			<div className="">{children}</div>
		</main>
	);
}

export default BillingLayout;
