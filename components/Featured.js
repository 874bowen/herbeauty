import { useState, useEffect } from 'react';
import Link from 'next/link'
import React from 'react';
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';



const Featured = ({ images }) => {
   console.log(images);

   const { data: session } = useSession();

   const handleAddToCart = (email, product_name) => {
      
      fetch("/api/add-to-cart", {
         method : "POST",
         headers : {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email: email, 
            name: product_name
         }),
      }).then(() => window.location.reload());
   }

   return (
      <div className="w-full md:h-screen p-2 flex items-center py-16">
         <div className="mt-5 max-w-[1240px] m-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
            {images.map(image => {
               let [name, price] = image.title.split("_");
               return (

                  <div key={image.id} className=" relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-sm md:rounded-lg p-2 md:p-3 hover:scale-105 ease-in duration-300">
                     <div>
                        <div>
                        <Image width={200} height={200} src={image.image} className=" group-hover:opacity-20" alt="/" />
                     
                        <div className="absolute bottom-[12%] right-[23%] translate-x-[50%] translate-y-[50%]">

                           {/* <Link href="" onClick={session ? handleAddToCart : signIn}>
                              <p className="text-center rounded-lg bg-[#292a5e] text-[#efd4e7] font-bold lg:text-md text-sm cursor-pointer p-2">Add To Cart</p>
                           </Link> */}
                        </div>
                        <div className="absolute top-[-2%] left-[-10%] translate-x-[50%] translate-y-[50%]">
                           <p className="text-center rounded-lg bg-[#efdded] text-[#292a5e] font-bold lg:text-lg text-md cursor-pointer p-2">${price}</p>
                        </div>
                        </div>
                        <div className='bg-[#29215e] text-center text-md w-full pt-2 pb-2 uppercase tracking-wide text-[#efdded]'>
                           <Link href="" onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(session.user.email, image.title);
                              }}>Add to Cart</Link>
                        </div>

                     </div>
                  </div>
                  

                  // <li key={image.id}>
                  //    <a href={image.link} rel="noreferrer">
                  //       <div className='w-full h-auto m-auto shadow-xl shadow-[#424369] roundex-xl flex items-center p-4 justify-center hover:scale-105 ease-in duration-300'>
                  //          <Image width={250} height={250} src={image.image} alt="" className='rounded-xl' />
                  //       </div>
                  //       <h3 className="">
                  //          {image.title}
                  //       </h3>
                  //    </a>
                  // </li>
               )
            })}
         </div>
      </div>
   )
}

export default Featured;


