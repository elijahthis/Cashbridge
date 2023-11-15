import React from "react";

export const metadata = {
	title: "Transactions | Cashbridge",
	description: "Cashbridge Transactions",
};

function TransactionsLayout({ children }) {
	return (
		<main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
			<div className="">{children}</div>
		</main>
	);
}

export default TransactionsLayout;
