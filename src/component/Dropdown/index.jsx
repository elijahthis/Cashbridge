"use client";
import { useState } from "react";

const Dropdown = ({
	optionsList,
	selectedOption,
	handleSelect,
	placeholder,
}) => {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<div className="relative ">
			<div
				onClick={() => {
					setShowFilter(!showFilter);
				}}
				className="bg-[#fafafa] flex items-center justify-between gap-2 p-4 cursor-pointer rounded-lg"
			>
				<p>{selectedOption ? selectedOption : placeholder}</p>
				<span>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 9L12 15L18 9"
							stroke="#94A3B8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>
			<div
				id="locationSelect"
				className={`rounded-lg shadow-lg w-full bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-full  overflow-hidden ${
					showFilter ? "block" : "hidden"
				}`}
			>
				<ul className="max-h-[160px] overflow-auto ">
					{optionsList.map((option, index) => (
						<li
							onClick={(e) => {
								setShowFilter(!showFilter);
								handleSelect(e, index);
							}}
							className="text-sm  text-bgray-900 dark:text-bgray-50 hover:dark:bg-darkblack-600  cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
							key={index}
						>
							{option}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
