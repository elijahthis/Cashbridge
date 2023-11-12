"use client";
import UserData from "./UserData";
import { authors } from "../../data/user";
import PaginationComponent from "../PaginationComponent";
import usePaginate from "../../../hooks/usePaginate";
import Loading from "../loading";

function UsersList({
	userArr,
	loading,
	itemsPerPage,
	handlePageClick,
	totalUsers,
}) {
	return (
		<div className="w-full overflow-x-scroll">
			<table className="w-full">
				{loading ? (
					<Loading size="480px" />
				) : (
					<tbody>
						{userArr?.map((item, index) => (
							<UserData key={item?._id} userInfo={item} index={index} />
						))}
					</tbody>
				)}
			</table>
			<PaginationComponent
				handlePageClick={handlePageClick}
				pageCount={Math.ceil(totalUsers / itemsPerPage)}
			/>
		</div>
	);
}

export default UsersList;
