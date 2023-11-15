"use client";
import { useEffect, useState } from "react";
import WalletComponent from "../WalletComponent";
import Loading from "../loading";
import { getUserWalletBalance } from "../../../requests/transactions";

const UserWallet = ({ refetch, userId }) => {
	// Data states
	const [balanceLoading, setBalanceLoading] = useState(false);
	const [walletData, setWalletData] = useState({
		currency: "-",
		available_balance: 0,
		ledger_balance: 0,
	});

	const fetchWalletBalance = async () => {
		setBalanceLoading(true);
		try {
			const res = await getUserWalletBalance(userId);
			console.log("res", res);
			if (res.data?.success) {
				setWalletData(res.data?.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setBalanceLoading(false);
		}
	};

	useEffect(() => {
		fetchWalletBalance();
	}, [refetch]);

	return (
		<div className="py-6">
			<h2 className="font-bold text-3xl mb-4">Wallet</h2>
			<div className="card-slider relative w-full ">
				{balanceLoading ? (
					<Loading size="80px" />
				) : (
					<WalletComponent walletData={walletData} />
				)}
			</div>
		</div>
	);
};

export default UserWallet;
