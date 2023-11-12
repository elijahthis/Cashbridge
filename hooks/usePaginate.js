import { useState } from "react";

/**
 * A custom hook that paginates an array of items.
 * @param itemsPerPage The number of items to display per page.
 * @param itemList The array of items to paginate.
 * @returns An object containing the current page's item offset, end offset, current items, page count, and a function to handle page clicks.
 */
const usePaginate = (itemsPerPage, itemList) => {
	const [itemOffset, setItemOffset] = useState(0);

	const endOffset = itemOffset + itemsPerPage;
	const currentItems = itemList.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(itemList.length / itemsPerPage);

	/**
	 * A function that handles page clicks and updates the item offset state.
	 * @param event The click event object.
	 */
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % itemList.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	return { itemOffset, endOffset, currentItems, pageCount, handlePageClick };
};

export default usePaginate;
