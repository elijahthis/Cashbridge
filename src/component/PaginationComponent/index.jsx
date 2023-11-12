// import ReactPaginate from "react-paginate";
import {
	LiaLongArrowAltLeftSolid,
	LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import dynamic from "next/dynamic";

const ReactPaginate = dynamic(() => import("react-paginate"), { ssr: false });

// interface PaginationComponentProps {
// 	/**
// 	 * Function to handle page click event.
// 	 * @param selectedItem - The selected page item.
// 	 */
// 	handlePageClick: (selectedItem: { selected: number }) => void;

// 	/**
// 	 * The total number of pages.
// 	 */
// 	pageCount: number;
// }

const PaginationComponent = ({ handlePageClick, pageCount }) => {
	return (
		<ReactPaginate
			breakLabel="..."
			nextLabel={
				<button className="flex flex-row items-center gap-2 text-sm font-semibold">
					<span>Next</span>
					<LiaLongArrowAltRightSolid />
				</button>
			}
			onPageChange={(page) => {
				console.log("page", page);
				handlePageClick(page.selected + 1);
			}}
			pageRangeDisplayed={3}
			pageCount={pageCount}
			previousLabel={
				<button className="flex flex-row items-center gap-2 text-sm font-semibold">
					<LiaLongArrowAltLeftSolid />
					<span>Previous</span>
				</button>
			}
			renderOnZeroPageCount={null}
			containerClassName="PaginationComponent"
			pageClassName="PaginationComponent__page"
			breakClassName="PaginationComponent__break"
			activeClassName="PaginationComponent__active"
		/>
	);
};

export default PaginationComponent;
