import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link'


const Cart = () => {
   let [total, setTotal] = useState(0)
   const { data: session } = useSession();
   let [cartItems, setCartItems] = useState([]);
   let email = "";
   if (session) {
      email = session.user.email
   }
   (async function getCart() {
      const cartItems = await fetch("/api/get-carts", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email: email
         })
      }).then(r => r.json());
      setCartItems(cartItems);
   })();
   // console.log(cartItems);
   const handleAddQuantity = (product_id, quantity) => {

      fetch("/api/add-product-quantity", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            product_id: product_id,
            quantity: quantity + 1
         }),
      }).then(() => window.location.reload());
   }

   const handleReduceQuantity = (product_id, quantity) => {
      fetch("/api/reduce-product-quantity", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            product_id: product_id,
            quantity: quantity - 1
         }),
      })
   }

   const handleOrder = (total) => {
      fetch("/api/order", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            total: total,
            email: email
         }),
      }).then(() => window.location.reload());
   }

   return (
      <div className="container">
         <div className="w-[80%] md:h-screen p-2 m-auto py-20">


            {cartItems.length === 0 && <p>No Items in Cart <Link href="/" passHref={true} className='underline'>Back to home</Link></p>}

            {cartItems.length > 0 &&
               <div>
                  <Link href="/" className='underline'> <p>Back to home</p></Link>
                  {cartItems.map((item, i) => {
                     total += Math.round((item.price * item.quantity) * 100) / 100;
                     return (
                        <div className='md:w-[50%]' key={i}>
                           <p className='m-2 flex items-center gap-2 justify-around'> <span>{item.name}</span> <button className='bg-[#292a5e]  text-[#efd4e7]' onClick={(e) => {
                              e.preventDefault();
                              handleReduceQuantity(item.id, item.quantity)
                           }}>-</button>{" "}{item.quantity}{" "}<button className='bg-[#292a5e] text-[#efd4e7]' onClick={(e) => {
                              e.preventDefault();
                              handleAddQuantity(item.id, item.quantity)
                           }}>+</button><p className='w-[10%]'>{item.price}</p></p>
                        </div>
                     );

                  })}

                  <p>Total: {total}</p><button className='bg-[#292a5e]  text-[#efd4e7]' onClick={(e) => {
                     e.preventDefault();
                     handleOrder(total)
                  }}>Order</button>
               </div>}
         </div>
      </div>
   )
}

export default Cart