import UserData from "./UserData";
import { authors } from "../../data/user";

function UsersList({ userArr }) {
	return (
		<div className="w-full overflow-x-scroll">
			<table className="w-full">
				<tbody>
					{userArr?.map((item, index) => (
						<UserData key={item?._id} userInfo={item} index={index} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default UsersList;
