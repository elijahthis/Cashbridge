"use client";
import { useRouter } from "next/navigation";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const GoBack = ({ backLink }) => {
	const router = useRouter();
	return (
		<div
			className="flex flex-row items-center gap-2 cursor-pointer font-bold text-success-300 "
			onClick={() => {
				if (backLink) router.push(backLink);
				else router.back();
			}}
		>
			<HiOutlineArrowNarrowLeft size={24} />
			<span>Go back</span>
		</div>
	);
};

export default GoBack;
