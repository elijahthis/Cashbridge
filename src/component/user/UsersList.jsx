"use client";
import UserData from "./UserData";
import { authors } from "../../data/user";
import PaginationComponent from "../PaginationComponent";
import usePaginate from "../../../hooks/usePaginate";
import Loading from "../loading";
import { IoSearchOutline } from "react-icons/io5";

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
					<tbody>
						<tr>
							<td>
								<Loading size="480px" />
							</td>
						</tr>
					</tbody>
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
