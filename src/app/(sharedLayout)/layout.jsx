"use client";
import HeaderOne from "@/component/header/HeaderOne";
import HeaderTwo from "@/component/header/HeaderTwo";
import Overlay from "@/component/overlay";
import Sidebar from "@/component/sidebar";
import SidebarV2 from "@/component/sidebar/SidebarV2";
import ProtoTypes from "prop-types";
import { BsArrowLeft } from "react-icons/bs";

import { useContext, useEffect, useState } from "react";
import { getMe } from "../../../requests";
import { useRouter } from "next/navigation";
import { getToken } from "../../../config/helpers";
import Loading from "@/component/loading";
import { authContext } from "../../../hooks/useAuth";

function Layout({ bg, overlay, children }) {
	const [sidebar, setSidebar] = useState(true);
	const [authed, setAuthed] = useState(false);

	const { isLoggedIn, setIsLoggedIn, setUserObj } = useContext(authContext);

	const router = useRouter();

	const fetchData = async () => {
		try {
			const res = await getMe();

			if (res?.data?.success) {
				setIsLoggedIn(true);

				console.log(res?.data?.data);
				setUserObj(res?.data?.data);
			}
		} catch (e) {
			console.log(e);
			setIsLoggedIn(false);
			router.push("/signin");
		} finally {
			setAuthed(true);
		}
	};

	useEffect(() => {
		if (getToken()) {
			fetchData();
		} else {
			router.push("/signin");
		}
	}, []);

	return (
		<div className={`layout-wrapper ${sidebar && "active"}  w-full`}>
			<div className="relative flex w-full">
				<Sidebar handleActive={() => setSidebar(!sidebar)} />
				{overlay ? (
					overlay
				) : (
					<Overlay handleActive={() => setSidebar(!sidebar)} />
				)}
				<SidebarV2 />
				<div
					className={`body-wrapper flex-1 overflow-x-hidden ${
						bg ? bg : "dark:bg-darkblack-500"
					} `}
				>
					<HeaderOne handleSidebar={() => setSidebar(!sidebar)} />
					<HeaderTwo handleSidebar={() => setSidebar(!sidebar)} />
					{authed ? children : <Loading />}
				</div>
			</div>
		</div>
	);
}

Layout.propTypes = {
	bg: ProtoTypes.string,
	overlay: ProtoTypes.node,
	children: ProtoTypes.node,
};

export default Layout;
