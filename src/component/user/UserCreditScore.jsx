"use client";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { getUserCreditHistory } from "../../../requests/loans";

const UserCreditScore = ({ userId }) => {
	const [loading, setLoading] = useState(false);
	const [creditScore, setCreditScore] = useState(null);

	const fetchCreditScore = async () => {
		setLoading(true);
		try {
			const res = await getUserCreditHistory(userId);
			console.log("resssss", res);
			if (res?.data?.success) {
				setCreditScore(res.data.data.score);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCreditScore();
	}, []);

	return (
		<div className="py-5">
			{loading ? (
				<Loading size="40px" />
			) : (
				<div>
					<p>Credit Score: </p>
					<p className="font-bold text-success-300 text-2xl">{creditScore ?? "-"}</p>
				</div>
			)}
		</div>
	);
};

export default UserCreditScore;
