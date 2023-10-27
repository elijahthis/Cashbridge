import Link from "next/link";
import logo from "@/assets/images/logo/logo-short.svg";
import clogo from "@/assets/images/logo/c-logo-short.png";
import logoW from "@/assets/images/logo/logo-short-white.svg";
import Image from "next/image";
import { sidebarList } from "@/data/constants";

function SidebarV2() {
	return (
		<aside className="relative hidden w-[96px] bg-white dark:bg-black sm:block">
			<div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
				<div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
					<Link href="/">
						<Image
							priority={true}
							height={32}
							width={45}
							src={clogo.src}
							className="block dark:hidden"
							alt="logo"
						/>
						<Image
							priority={true}
							height={logoW.height}
							width={logoW.width}
							src={logoW.src}
							className="hidden dark:block"
							alt="logo"
						/>
					</Link>
				</div>
				<div className="sidebar-body w-full pt-[14px]">
					<div className="flex flex-col items-center">
						<div className="nav-wrapper mb-[36px]">
							<div className="item-wrapper mb-5">
								<ul className="mt-2.5 flex flex-col items-center justify-center">
									{sidebarList.map((item, ind) => (
										<li className="item px-[43px] py-[11px]" key={ind}>
											<Link href={item.link}>
												<span className="item-ico">{item.icon}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default SidebarV2;
