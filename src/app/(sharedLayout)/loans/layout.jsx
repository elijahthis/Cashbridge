import React from "react";

export const metadata = {
	title: "Loans | Cashbridge",
	description: "Cashbridge Loans",
};

function LoansLayout({ children }) {
	return (
		<main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-[48px] xl:pb-[48px] dark:bg-darkblack-700">
			<div className="">{children}</div>
		</main>
	);
}

export default LoansLayout;
