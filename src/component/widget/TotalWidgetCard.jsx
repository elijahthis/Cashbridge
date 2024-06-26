"use client";
import ProtoTypes from "prop-types";
import LineChart from "../chart/LineChart";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import Loading from "../loading";

const createGradient = (ctx) => {
	const gradient = ctx.createLinearGradient(0, 0, 0, 450);
	gradient.addColorStop(0, "rgba(134, 39, 45, 0.41)");
	gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");
	return gradient;
};

function TotalWidgetCard({
	title,
	amount,
	groth,
	memberImg,
	totalEarnImg,
	loading,
	values = [],
}) {
	return (
		<div className="rounded-lg bg-white p-5 dark:bg-darkblack-600">
			<div className="mb-5 flex items-center justify-between">
				<div className="flex items-center space-x-[7px]">
					<div className="icon">
						<span>
							<Image
								priority={true}
								height={totalEarnImg.height}
								width={totalEarnImg.width}
								src={totalEarnImg.src}
								alt="icon"
							/>
						</span>
					</div>
					<span className="text-lg font-semibold text-bgray-900 dark:text-white">
						{title}
					</span>
				</div>
			</div>
			<div className="flex items-end justify-between">
				<div className="flex-1">
					{loading ? (
						<Loading size={"48px"} />
					) : values.length > 0 ? (
						<div>
							{values.map((item, ind) => (
								<div
									key={ind}
									className="flex flex-row items-center gap-2 text-xl font-bold text-bgray-900 dark:text-white"
								>
									<p className="">{item?.label}:</p>
									<p className="">{item?.value}</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-3xl font-bold leading-[48px] text-bgray-900 dark:text-white">
							{amount}
						</p>
					)}
					{/* <div className="flex items-center space-x-1">
						<span>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
									fill="#86272D"
								/>
								<path
									opacity="0.4"
									d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
									fill="#86272D"
								/>
							</svg>
						</span>
						<span className="text-sm font-medium text-success-300">
							{groth}
						</span>
						<span className="text-sm font-medium text-bgray-700 dark:text-bgray-50">
							from last week
						</span>
					</div> */}
				</div>
				{/* <div className="w-[106px] h-[68px]">
					<LineChart option={options} dataSet={data} refer={chartRef} />
				</div> */}
			</div>
		</div>
	);
}

TotalWidgetCard.propTypes = {
	title: ProtoTypes.string,
	amount: ProtoTypes.string,
	groth: ProtoTypes.string,
	memberImg: ProtoTypes.object,
	totalEarnImg: ProtoTypes.object,
};

export default TotalWidgetCard;
