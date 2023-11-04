// "use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "../config/helpers";
import { getMe } from "../requests";
import Loading from "@/component/loading";

export default function withAuth(WrappedComponent) {
	return function WithAuth(props) {
		const router = useRouter();

		const [isAuthenticated, setIsAuthenticated] = useState(false);

		const fetchData = async () => {
			try {
				const res = await getMe();
				if (res?.data?.success) {
					setIsAuthenticated(true);
				}
			} catch (e) {
				console.log(e);
				router.push("/signin");
			} finally {
				// setLoading(false);
			}
		};

		useEffect(() => {
			// Check if the user is authenticated (you can use a state management library, such as Redux or React Context, or fetch from an API)

			if (getToken()) {
				fetchData();
			} else {
				router.push("/signin");
			}

			// if (!isAuthenticated) {
			// 	// Redirect to the sign-in page
			// 	router.push("/signin");
			// }
		}, []);

		if (!isAuthenticated) {
			return <Loading />; // Return null while the authentication check is in progress
		}

		return <WrappedComponent {...props} />;
	};
}
