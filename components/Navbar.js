import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import logo from "../public/assets/hb_logo.png";
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {

	const { data: session } = useSession();
	let name = "";
	let email = "";
	if (session){
		email = session.user.email
		name = session.user.name.split(" ")[0]
	}
	let [number, setNumber] = useState(1);
	(async function getCart () {   
      const cartItems = await fetch("/api/get-carts", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
			body: JSON.stringify({
				email: email
			})
       }).then(r => r.json());
      
       setNumber(cartItems.length);
   })()



	

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
					<ul className="items-center gap-3 flex">

						<Link href="/">
							<li className="ml-10 text-sm uppercase hover:border-b">
								{(session) && <p className="hidden md:block mr-6">Welcome, {name}!</p>}
							</li>
						</Link>
						{(session) &&
						<>
						<Link href="/" onClick={signIn}>
							<button>Cart {number}</button>
						
						</Link>
						<Link href="/" onClick={signOut}>
							<Image
								src={session.user.image}
								alt="/"
								width="30"
								height="30"
								className="rounded-xl ml-3 group-hover:opacity-20"
							/>
						</Link>
						</>
						}
						
						<Link href="/" onClick={signIn}>{(!session) &&
							<button>Login</button>
						}
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);

};

export default Navbar;
