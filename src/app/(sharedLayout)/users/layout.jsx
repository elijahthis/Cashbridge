import React from "react";

export const metadata = {
	title: "Users | Cashbridge",
	description: "Cashbridge Users",
};

function UsersLayout({ children }) {
	return (
		<main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] dark:bg-darkblack-700">
			<div className="flex flex-col space-y-20">{children}</div>
		</main>
	);
}

export default UsersLayout;
