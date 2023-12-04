"use client";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { getUserCreditHistory } from "../../../requests/loans";

const UserCreditScore = ({ creditLoading, creditScore }) => {
	return (
		<div className="py-5">
			{creditLoading ? (
				<Loading size="40px" />
			) : (
				<div>
					<p>Credit Score: </p>
					<p className="font-bold text-success-300 text-2xl">
						{creditScore ?? "-"}
					</p>
				</div>
			)}
		</div>
	);
};

export default UserCreditScore;
