import { useState } from "react";
import EmptyState from "../EmptyState";

// interface MUITableProps {
// 	headers: { label: string, key: string }[];
// 	bodyData: any[];
// 	stripped?: boolean;
// 	showPagination?: boolean;
// 	specialStyles?: { key: string, styles: any }[];
// 	specialActions?: { key: string, action: (ind: number) => void }[];
// 	emptyState?: {
// 		message?: string,
// 		button?: { label: string, action?: () => void },
// 	};
// }

const MUITable = ({
	headers = [],
	bodyData = [],
	stripped = false,
	showPagination = true,
	specialStyles = [{ key: "", styles: {} }],
	specialActions = [],
	emptyState,
}) => {
	const keyList = headers.map((header) => header.key);
	console.log("bodyData", bodyData);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bodyData.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
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

				{bodyData.length !== 0 ? (
					<>
						<tbody>
							{(rowsPerPage > 0
								? bodyData.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: bodyData
							).map((row, rowInd) => (
								<tr
									key={rowInd}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
									style={{
										background:
											stripped && rowInd % 2 == 1 ? "#E9EBEE" : "#fff",
									}}
									className="border-b border-bgray-300 dark:border-darkblack-400"
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
							{emptyRows > 0 && (
								<tr
									style={{ height: 53 * emptyRows }}
									className="border-b border-bgray-300 dark:border-darkblack-400"
								>
									<td colSpan={keyList.length} />
								</tr>
							)}
						</tbody>

						{showPagination && (
							<tfoot>
								<tr className="border-b border-bgray-300 dark:border-darkblack-400">
									<TablePaginationActions />
									{/* <TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: "All", value: -1 },
										]}
										colSpan={keyList.length}
										count={bodyData.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: {
												"aria-label": "rows per page",
											},
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/> */}
								</tr>
							</tfoot>
						)}
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
	);
};

export default MUITable;

function TablePaginationActions(props) {
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		// <Box sx={{ flexShrink: 0, ml: 2.5 }}>
		// 	<IconButton
		// 		onClick={handleFirstPageButtonClick}
		// 		disabled={page === 0}
		// 		aria-label="first page"
		// 	>
		// 		{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
		// 	</IconButton>
		// 	<IconButton
		// 		onClick={handleBackButtonClick}
		// 		disabled={page === 0}
		// 		aria-label="previous page"
		// 	>
		// 		{theme.direction === "rtl" ? (
		// 			<KeyboardArrowRight />
		// 		) : (
		// 			<KeyboardArrowLeftIcon />
		// 		)}
		// 	</IconButton>
		// 	<IconButton
		// 		onClick={handleNextButtonClick}
		// 		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		// 		aria-label="next page"
		// 	>
		// 		{theme.direction === "rtl" ? (
		// 			<KeyboardArrowLeftIcon />
		// 		) : (
		// 			<KeyboardArrowRight />
		// 		)}
		// 	</IconButton>
		// 	<IconButton
		// 		onClick={handleLastPageButtonClick}
		// 		disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		// 		aria-label="last page"
		// 	>
		// 		{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
		// 	</IconButton>
		// </Box>
		<></>
	);
}
