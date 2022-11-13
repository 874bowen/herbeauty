import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import logo from "../public/assets/hb_logo.png";
import { useSession, signIn, signOut } from 'next-auth/react';
import leftNav from "./LeftNav";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const { data: session } = useSession();
	const handleNav = () => {
		setNav(!nav);
	}
	
	
	return (
		<div className="fixed w-full h-20 shadow-xl z-[100]">
			<div className="flex justify-between bg-[#292a5e] text-[#efd4e7]  items-center w-full h-full px-2 2xl:px-16">
				<Image
					src={logo}
					alt="/"
					width="100"
					height="100"
				/>
				<div>
					<ul className="hidden items-center md:flex">
						<Link href="/">
							<li className="ml-10 text-sm uppercase hover:border-b">Home</li>
						</Link>
						<Link href="/">
							<li className="ml-10 text-sm uppercase hover:border-b">About</li>
						</Link>
						<Link href="/" onClick={signOut}>{(session) && 
							<Image
								src={session.user.image}
								alt="/"
								width="30"
								height="30"
								className="rounded-xl group-hover:opacity-20"
							/>
						}
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);

};

export default Navbar;
