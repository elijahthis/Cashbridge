"use client";
import { useEffect, useState } from "react";
import { getCompanyWalletBalance } from "../../../requests/transactions";
import WalletComponent from "../WalletComponent";
import Loading from "../loading";

const CompanyWallet = () => {
	const [walletList, setWalletList] = useState([]);
	const [balanceLoading, setBalanceLoading] = useState(false);

	const fetchWalletBalance = async () => {
		setBalanceLoading(true);
		try {
			const res = await getCompanyWalletBalance();
			console.log("res", res);
			if (res.data?.success) {
				setWalletList(res.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBalanceLoading(false);
		}
	};

	useEffect(() => {
		fetchWalletBalance();
	}, []);

	return (
		<div className="">
			{balanceLoading ? (
				<Loading size="80px" />
			) : (
				<div className="grid grid-cols-3 gap-4 flex-wrap w-full">
					{walletList.map((item, index) => (
						<WalletComponent walletData={item} />
					))}
				</div>
			)}
		</div>
	);
};

export default CompanyWallet;
