"use client";
import UserFilter from "@/component/forms/UserFilter";
import UsersList from "@/component/user/UsersList";
import RightSidebar from "@/component/user/UserProfile";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../requests/users";
import Loading from "@/component/loading";

const UserClientPage = () => {
	const [userArr, setUserArr] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currPage, setCurrPage] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);

	const itemsPerPage = 5;

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllUsers(currPage, itemsPerPage);
			setUserArr(res?.data?.data?.users);
			setTotalUsers(res?.data?.data?.totalUsers);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [currPage, itemsPerPage]);

	console.log("userArr", userArr);

	return (
		<div className="2xl:flex-1 w-full">
			{/* <UserFilter /> */}
			<UsersList
				userArr={userArr}
				loading={loading}
				itemsPerPage={itemsPerPage}
				handlePageClick={(page) => setCurrPage(page)}
				totalUsers={totalUsers}
			/>
		</div>
	);
};

export default UserClientPage;
