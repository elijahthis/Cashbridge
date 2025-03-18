"use client";
import UserFilter from "@/component/forms/UserFilter";
import UsersList from "@/component/user/UsersList";
import RightSidebar from "@/component/user/UserProfile";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../requests/users";
import Loading from "@/component/loading";
import UserAnalyticsWidget from "@/component/user/UserAnalyticsWidget";
import { IoSearchOutline } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";

const UserClientPage = () => {
	const [userArr, setUserArr] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currPage, setCurrPage] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const [search, setSearch] = useState("");

	const itemsPerPage = 50;

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getAllUsers(currPage, itemsPerPage, search);
			setUserArr(res?.data?.data?.users);
			setTotalUsers(res?.data?.data?.totalUsers);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const debouncedSearch = useDebounce(search ?? "", 500);

	useEffect(() => {
		fetchData();
	}, [currPage, itemsPerPage, debouncedSearch]);

	console.log("userArr", userArr);

	return (
		<div className="w-full">
			{/* <UserFilter /> */}
			<UserAnalyticsWidget />

			<div className="w-full mb-4 grid grid-cols-[1rem_1fr] items-center bg-white px-4 ">
				<IoSearchOutline />
				<input
					type="search"
					name=""
					id=""
					className="border-0 outline-none focus:outline-0 focus:outline-none focus:border-0 focus:border-transparent "
					placeholder="Search users"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

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
