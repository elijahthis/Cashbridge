"use client";
import UserFilter from "@/component/forms/UserFilter";
import UsersList from "@/component/user/UsersList";
import RightSidebar from "@/component/user/RightSidebar";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../requests/users";
import Loading from "@/component/loading";

function Users() {
	const [userArr, setUserArr] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllUsers();
			setUserArr(res?.data?.data?.users);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	console.log("userArr", userArr);

	return (
		<>
			<div className="2xl:flex-1 w-full">
				<UserFilter />
				{loading ? <Loading /> : <UsersList userArr={userArr} />}
			</div>
			<RightSidebar />
		</>
	);
}

export default Users;
