"use client";
import UserFilter from "@/component/forms/UserFilter";
import RightSidebar from "@/component/user/UserProfile";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../requests/users";
import Loading from "@/component/loading";
import UsersList from "./UsersList";
import { useRouter } from "next/navigation";

const UserDashPage = () => {
	const [userArr, setUserArr] = useState([]);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllUsers(1, 5);
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
		<div className="w-full">
			<div className=" mb-4 flex flex-row items-center justify-between ">
				<h2 className="font-bold text-3xl">Users</h2>
				<button
					onClick={() => {
						router.push("/users");
					}}
					className="text-sm text-success-300 font-bold "
				>
					View More
				</button>
			</div>
			<UsersList
				userArr={userArr}
				loading={loading}
				itemsPerPage={5}
				handlePageClick={() => {}}
				totalUsers={5}
				showPagination={false}
			/>
		</div>
	);
};

export default UserDashPage;
