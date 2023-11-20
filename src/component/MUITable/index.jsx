import { useState } from "react";
import EmptyState from "../EmptyState";
import PaginationComponent from "../PaginationComponent";
import Loading from "../loading";

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
							{headers.map((header, ind) => (
								<th
									key={`table-header-${ind}`}
									className="text-base text-left font-medium text-bgray-600 dark:text-bgray-50 px-6 py-5 "
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
											"&:last-child td, &:last-child th": {
												border: 0,
											},
										}}
										className={`border-b border-bgray-300 bg-white ${
											row?.onClick && "cursor-pointer hover:bg-gray-200"
										} `}
										onClick={row?.onClick}
									>
										{keyList.map((key, ind) => {
											const specialIndex = specialStyles.findIndex(
												(obj) => obj.key === key
											);
											return (
												<td
													className="text-base font-medium px-6 py-5 text-left "
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
