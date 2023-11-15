"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSelectedUserKYC } from "../../../requests/users";
import Loading from "../loading";
import { formatDate } from "../../../utils/helperFuncs";
import GoBack from "../GoBack";
import WalletTransactions from "./WalletTransactions";
import UserWallet from "./UserWallet";
import UserActions from "./UserActions";
import UserInfo from "./UserInfo";
import UserSavings from "./UserSavings";

function UserProfile({ params }) {
	// Data states
	const [userData, setUserData] = useState({});

	// loading states
	const [loading, setLoading] = useState(false);

	// fetch states
	const [refetch, setRefetch] = useState(false);
	const [fetched, setFetched] = useState(false);

	// data fetching requests
	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getSelectedUserKYC(params.id);
			if (res.data?.success) {
				setUserData(res.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setFetched(true);
		}
	};

	useEffect(() => {
		fetchData();
	}, [refetch]);

	console.log("userData", userData);

	return fetched ? (
		loading ? (
			<Loading />
		) : (
			<>
				<GoBack backLink="/users" />
				<div className="2xl:w-[382px] w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7">
					<header className="flex flex-col items-center text-center -mt-8 pb-7">
						<Image
							priority={true}
							height={64}
							width={64}
							src={userData?.dp}
							className="rounded-lg"
							alt=""
						/>
						<h3 className="text-xl font-bold text-bgray-700 dark:text-white mt-4">
							{`${userData?.firstname ?? "-"} ${userData?.lastname ?? "-"}`}
						</h3>
						<p className="text-base font-medium text-bgray-500 dark:text-white">
							{userData?.email} • +{userData?.phone} • Created{" "}
							{userData?.createdAt ? formatDate(userData?.createdAt) : "-"}
						</p>
						<div className="mt-4 flex flex-row items-center gap-2 ">
							<span
								className={` text-sm ${
									userData?.isKYC
										? "text-[#22C55E] bg-[#D9FBE6]"
										: "text-error-300 bg-[#FEE2E2]"
								} font-medium rounded-lg py-1 px-3`}
							>
								{userData?.isKYC ? "KYC Verified" : "KYC Not Verified"}
							</span>
							<span
								className={` text-sm ${
									userData?.bvnVerificationStatus
										? "text-[#22C55E] bg-[#D9FBE6]"
										: "text-error-300 bg-[#FEE2E2]"
								} font-medium rounded-lg py-1 px-3`}
							>
								{userData?.bvnVerificationStatus
									? "BVN Verified"
									: "BVN Not Verified"}
							</span>
						</div>

						<div className="flex flex-col items-center gap-4 mt-6 ">
							<p className="text-warning-300">
								{userData?.isSuspended
									? "This user account has been suspended"
									: ""}
							</p>
						</div>
					</header>

					<UserInfo
						userId={params.id}
						refetch={refetch}
						setRefetch={setRefetch}
						userData={userData}
					/>

					<UserActions
						userId={params.id}
						refetch={refetch}
						setRefetch={setRefetch}
						userData={userData}
					/>

					<UserWallet userId={params.id} refetch={refetch} />

					<WalletTransactions userId={params.id} refetch={refetch} />

					<UserSavings userId={params.id} refetch={refetch} />

					{/* <WalletHistory userId={params.id} refetch={refetch} /> */}
				</div>
			</>
		)
	) : (
		<Loading />
	);
}

export default UserProfile;
