import { useState, useEffect } from 'react';
import Link from 'next/link'
import React from 'react';
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';

const Featured = ({ images }) => {
   console.log(images);
   const {data: session} = useSession();
   
   const handleAddToCart = () => {
      console.log("Logged in");
      // else signIn;
   }
   return (
      <div className="w-full md:h-screen p-2 flex items-center py-16">
         <div className="mt-5 max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
            {images.map(image => {
               return (
                  <div  key={image.id} className=" relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4">
                     <Image  width={250} height={250}  src={image.image} className="rounded-xl group-hover:opacity-20" alt="/" />
                     <div className="absolute bottom-[12%] right-[23%] translate-x-[50%] translate-y-[50%]">
                     
                     <Link href="" onClick={ session ? handleAddToCart : signIn}>
                        <p className="text-center rounded-lg bg-[#292a5e] text-[#efd4e7] font-bold lg:text-md text-sm cursor-pointer p-2">Add To Cart</p>
                     </Link> 
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
