import { useState } from "react";
import EmptyState from "../EmptyState";
import PaginationComponent from "../PaginationComponent";
import Loading from "../loading";
import { TbExternalLink } from "react-icons/tb";

// interface MUITableProps {
// 	headers: { label: string, key: string }[];
// 	bodyData: any[];
// 	showPagination?: boolean;
// 	specialStyles?: { key: string, styles: any }[];
// 	specialActions?: { key: string, action: (ind: number) => void }[];
// 	emptyState?: {
// 		message?: string,
// 		button?: { label: string, action?: () => void },
// 	};
// handlePageClick,
// pageCount,
// loading
// }

const MUITable = ({
	headers = [],
	bodyData = [],
	showPagination = true,
	specialStyles = [{ key: "", styles: {} }],
	specialActions = [],
	emptyState,
	handlePageClick,
	pageCount,
	loading,
}) => {
	const keyList = headers.map((header) => header.key);
	console.log("bodyData", bodyData);

	return (
		<>
			<div className="table-content w-full overflow-x-auto">
				<table className="w-full w-max">
					<thead>
						<tr className="border-b border-bgray-300 dark:border-darkblack-400">
							{bodyData[0]?.onClick && (
								<th className="p-3 lg:px-3 lg:py-5 "></th>
							)}
							{headers.map((header, ind) => (
								<th
									key={`table-header-${ind}`}
									className="text-sm lg:text-base text-left font-medium text-bgray-600 dark:text-bgray-50 p-3 lg:px-6 lg:py-5 "
								>
									{header.label}
								</th>
							))}
						</tr>
					</thead>

					{loading ? (
						<tbody>
							<tr>
								<td colSpan={headers.length}>
									<Loading size="480px" />
								</td>
							</tr>
						</tbody>
					) : bodyData.length !== 0 ? (
						<>
							<tbody>
								{bodyData.map((row, rowInd) => (
									<tr
										key={rowInd}
										sx={{
											"&:last-child td, &:last-child th relative": {
												border: 0,
											},
										}}
										className={`border-b border-bgray-300 bg-white animation transition-all duration-100 ${
											row?.onClick && "cursor-pointer hover:bg-gray-200"
										} `}
										onClick={row?.onClick}
									>
										{row?.onClick && (
											<td className="p-3 lg:px-3 lg:py-5 ">
												<TbExternalLink className="" />
											</td>
										)}
										{keyList.map((key, ind) => {
											const specialIndex = specialStyles.findIndex(
												(obj) => obj.key === key
											);
											return (
												<td
													className="text-sm lg:text-base font-medium p-3 lg:px-6 lg:py-5 text-left "
													style={
														specialIndex !== -1
															? specialStyles[specialIndex].styles
															: null
													}
													onClick={() => {
														specialActions.map((item) => {
															if (item.key === key) {
																console.log("rowInd", rowInd);
																item.action(rowInd);
															}
														});
													}}
													key={ind}
												>
													{row[key]}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</>
					) : (
						<tbody>
							<tr className="border-b border-bgray-300 dark:border-darkblack-400">
								<td colSpan={headers.length} sx={{ borderBottom: 0 }}>
									<EmptyState
										message={emptyState?.message || "Nothing to see here"}
										button={
											emptyState?.button && {
												label: emptyState?.button?.label || "Empty button",
												action: emptyState?.button?.action,
											}
										}
									/>
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
			{showPagination && (
				<div className="border-b border-bgray-300 dark:border-darkblack-400">
					<PaginationComponent
						handlePageClick={handlePageClick}
						pageCount={pageCount}
					/>
				</div>
			)}
		</>
	);
};

export default MUITable;
