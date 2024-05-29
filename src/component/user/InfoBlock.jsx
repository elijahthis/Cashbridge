import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";

const InfoBlock = ({ title, children, editFunc, isOpen = false }) => {
	const [collapsed, setCollapsed] = useState(isOpen ? false : true);

	return (
		<div className="mb-5">
			<div
				className="flex flex-row items-center justify-between cursor-pointer"
				onClick={() => setCollapsed((val) => !val)}
			>
				<h3 className="font-bold">{title}</h3>
				<div className="flex flex-row items-center gap-4">
					{editFunc ? (
						<button
							className=" text-sm py-2 pl-4 flex flex-row items-center gap-1 text-success-300 font-semibold"
							onClick={(e) => {
								e.stopPropagation();
								editFunc();
							}}
						>
							Edit
							<FiEdit2 />
						</button>
					) : (
						<></>
					)}
					<LuChevronDown
						size={24}
						className={`cursor-pointer transition-all ${
							collapsed ? "" : "rotate-180"
						}`}
					/>
				</div>
			</div>

			<ul
				className={` border-t border-gray-200 dark:border-darkblack-400 space-y-6 overflow-hidden transition-all duration-500 ${
					collapsed ? "max-h-0 py-0" : "max-h-[600px] py-7 "
				}`}
			>
				{children}
			</ul>
		</div>
	);
};

export default InfoBlock;
