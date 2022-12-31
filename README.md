# How to build an e-commerce Next.js application with Xata and Cloudinary

When building an e-commerce application backend development is important. Developers need to come up with complex functions and this might be time-consuming and costly. Serverless computing allows developers to build applications more quickly and less costly since they don't have to worry about managing their own servers.

## What is serverless?

Serverless is a development model in the cloud that enables developers to create and run applications without the need for server management. These are servers but they are just abstracted away from the developer.

In this article, we are going to use [Xata](https://xata.io/) as a serverless database, think of Xata as a platform where we can create and access the database inside our application through API endpoints.

## The need for image management

Traditionally, we manage our images and media directly from our project. This restricts the way we can serve and transform our media. By transformations we mean basic things like cropping, resizing to advanced layering and text additions.

[Cloudinary](https://cloudinary.com/) is a tool we are going to use to manage the images for our application.

## Github

Check out the complete source code in this [GitHub Repository](https://github.com/874bowen/herbeauty).

## What we are going to build

In this article we are going to build a Next.js e-commerce application for beauty products with Xata and Cloudinary for image management.

We will cover:

- Uploading images to Cloudinary
- Authentication using nextAuth, Xata and Google provider
- Create, Read, Update and Delete operations on a Xata database

To follow along through this article you are required to have:

- Create a free [Xata](https://xata.io/) and [Cloudinary](https://cloudinary.com/) account
- Basic knowledge of React or Next.js
- Basic knowledge in ES6 JavaScript features
- Familiarity in using CSS frameworks like tailwind

## Step 0: Getting started from a demo starter

We are going to get started from a basic application the build up on it through the rest of this article.

On your terminal you can run this:

```bash
npx create-next-app -e https://github.com/874bowen/herbeauty_demo_starter
# or
yarn create next-app -e https://github.com/874bowen/herbeauty_demo_starter
```

Once the installation is done you can navigate to the directory then start your development server:

```bash
cd herbeauty_demo_starter

npx run dev
# or
yarn dev

```

Once the development server is up on your browser address bar type http://localhost:3000 and we should be able to see an application like the one below.

![img](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1670145998/Articles/herbeauty/demo_ss_xzv5v2.png)

In the `src/index.js` file we have imported three components: the `Navbar`, `Featured` and `Footer` component. The `Featured` component renders the featured products to the user.

## Step 1: Uploading images to cloudinary

You can download the images we will be using [here](https://collection.cloudinary.com/bowenivan/f98fd40280ed3113c0bf0e094a7ceb9a). Once you have downloaded the images, log in to your [Cloudinary](https://cloudinary.com/) account and click the media library tab where you can create a new folder by clicking the folder icon besides the home dropdown.
Open the folder by clicking the three dots as shown in the image below. You can then upload the images you previously downloaded by clicking upload button on the top right corner.

![cl-createfolder](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1670153679/Articles/herbeauty/cl-folder_s50e9c.png)

## Step 2: Authentication using XataAdapter and NextAuth.js

Authentication is a standard thing for web applications because we want to know who is making requests and manage transactions while protecting confidential or private information. [NextAuth.js](https://next-auth.js.org) allows us to manage access to our data by providing a way to authenticate users using providers such as Google.
We will use [XataAdapter](https://next-auth.js.org/adapters/xata) to store user's information and sessions into our Xata database once a user is authenticated.

#### Creating a database on Xata

For our simple e-commerce application, we are going to have a structure like the one below: each user is has a cart, a cart belongs to only one user, a cart comprises of one or many products and one or many products can belong to many carts. Once an order is placed the products in that cart will have an foreign key to the order placed.

![img_1.png](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1669032197/bowen-uploads/herbeauty_db_schema_jdm4s0.png)

We can use the browser to create the database but for this demo we are using the [Xata Command Line Interface](https://docs.xata.io/cli/getting-started) which generates a XataClient that will help us work with Xata in a safe way.

Having created a Xata account, we are going to install next-auth, XataAdapter, Xata CLI then configure Xata on our application. We can do it this way:

```bash
# Install next-auth + adapter
npm install next-auth @next-auth/xata-adapter
# Install the Xata CLI globally
npm install --location=global @xata.io/cli
# Login
# here you can choose the option to create a new API Key from the browser
xata auth login
```

With everything ready, let's create a new Xata project that uses our next-auth schema and can be used by the Xata adapter. To do this we will use the schema in the `schema.json` at the root of our folder of our application which was included in the starter project.

> `schema.json` contains tables which we will create in our Xata database and as you might have guessed the tables named `nextauth_...` stores the users' information we are going to get from Google provider.

To perform this task, run this in your terminal:

```bash
xata init --schema=./schema.json
```
The CLI will guide you through a setup process in which you will select a workspace and a database. We recommend creating a new database for this.

![xata](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,w_1440/v1671351888/Articles/herbeauty/xata_cq6irj.png)

Once done with the setup, we can use NextAuth and XataAdapter in our application by creating a `./pages/api/auth/[...nextauth]` route and pasting the following code:

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "../../../util/xata";

const client = new XataClient();

export default NextAuth({
   adapter: XataAdapter(client),
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   secret: process.env.JWT_SECRET
});
```

You can find more about NextAuth and Google provider [here](https://next-auth.js.org/providers/google). Xata Adapter will ensure that once a user has been authenticated in our app the details provided by Google provider will be stored in our Xata database.

#### Inserting items into our products table
We can insert items into our products table in our Xata database using the [browser interface](http://app.xata.io/). For the images column go to Cloudinary and copy the links of the images you uploaded and paste it in the images column for individual products as shown below.
![products](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671357208/Articles/herbeauty/table_esa9kf.png)

### Step 3: Using OAuth 2.0 to Access Google APIs for Authentication

To create a Google provider application log in to [Google Cloud for Developers](https://console.cloud.google.com/), click the new project button on the OAuth consent screen then give your project a name then click create.

![gcp](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671353924/Articles/herbeauty/gcp_fzzqmb.png)

Once you are done, you are required to fill in more information about your project: choose an external project then fill the required fields only which include app name, support email and developers email. 

After creating a project, go to the Credentials tab then click the CREATE CREDENTIALS button on the top middle of the screen and choose OAuth Client ID. Fill out the form as shown below and click Create. Note that I have two URI's one is for localhost and the other for the deployed application on [Netlify](https://www.netlify.com/). This means that you will just need the localhost URI only unless you have deployed your application.

![credentialsform](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671373589/Articles/herbeauty/gcp1_da3svj.png)

Having finished, you will be given the client id and client secret. These values should be treated as passwords and will be stored inside the `.env` file and this file should be listed inside `.gitignore` file. The JWT_SECRET is also required by Xata for creating access tokens.

```
GOOGLE_CLIENT_ID=PASTE_YOUR_CLIENT_ID_SECRET_HERE
GOOGLE_CLIENT_SECRET=PASTE_YOUR_CLIENT_SECRET_GOES_HERE
JWT_SECRET=SOME_RANDOM_VALUES
```

### Step 4: Login and Logout Functionality
For our users to be able to log in and log out of our application we are going to `useSession`, a React Hook that helps us check if someone signed in. Before we use this hook, we have to wrap our application with the `SessionProvider`. 
To perform this task, your `_app.js` file should look like this:

```javascript
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps, session }) {
  return(
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
```

With our application wrapped with SessionProvider, we can implement user login and logout in `Navbar.js`. If we have a valid session it means that the user logged in successfully and we can display the name, image on the Navbar. Otherwise, an invalid session means a user is not logged in and we can display the login button only.

```javascript
import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import logo from "../public/assets/hb_logo.png";
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
   const { data: session } = useSession();
   let name = "";
   let email = "";
   if (session) {
      email = session.user.email
      name = session.user.name.split(" ")[0]
   }
   let [number, setNumber] = useState(0);

   return (
      <div className="fixed w-full h-20 shadow-xl z-[100]">
         <div className="flex justify-between bg-[#292a5e] text-[#efd4e7]  items-center w-full h-full px-2 2xl:px-16">
            <Image
               src={logo}
               alt="/"
               width="70"
               height="70"
            />
            <div>
               <ul className="items-center xs:gap-1 gap-3 flex">
                  {(session) &&
                     <>
                        <Link href="/">
                           <li className="ml-10 text-sm uppercase hover:border-b">
                              <p className="hidden md:block mr-6">Welcome, {name}!</p>
                           </li>
                        </Link>
                        <Link href="/cart">
                           <button className="xs:p-0 text-sm">Cart {number}</button>
                        </Link>
                        <Link href="/" >
                           <Image
                              src={session.user.image}
                              alt="/"
                              width="40"
                              height="40"
                              className="rounded-full ml-3 group-hover:opacity-20"
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
```

Having implemented this, you should be able to click the login button and be redirected to a login page. You will choose your email and you will be redirected back to your application. When you check your Xata database, a new row has been added on the nextauth_users table.

### Step 5: Querying Data
To fetch products from our database, we need to query Xata from our Next.js application. To do this we will have to use the `useEffect` hook as an [Immeidiately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IIFE) that will run as soon as defined without the need for a function call. Inside this function we fetch data from the `./pages/api/get-products` API route which is implemented as follows:

```javascript
import { getXataClient } from "../../util/xata";

async function handler(req, res) {
   const xata = getXataClient();
   // get all products from the products table in our xata database 
   const products = await xata.db.products.filter({ }).getMany();
   // sends a HTTP respose back which contains an object of products if the fetch was successfull
   res.send(products);
}

export default handler;
```
Our Featured component retrieves structured data of products from the database via the get-products endpoint. The fetched data is then used to set the products displayed in the component which should be incorporated as follows:
 
```javascript
import Link from 'next/link'
...

const Featured = () => {
   let [products, setProducts] = useState(images)
   
   const handleAddToCart = () => {

   }

   (async function getProducts() {
      const products = await fetch('/api/get-products', {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         },
      }).then(r => r.json());
      setProducts(products)
   })();
   return (
      ...
      {products && products.map(product => {
         return (
            ...
            <div key={product.id} className="...">
               <div>
                  <div>
                     <Image src={product?.image} width={200} height={200} className=" group-hover:opacity-20" alt="/" />
                     <div className="absolute top-[-2%] left-[-10%] translate-x-[50%] translate-y-[50%]">
                        <p className="...">${product.price}</p>
                     </div>
                  </div>
                  <div className='...'>
                     <Link href="" onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                     }}>Add to Cart</Link>
                  </div>
               </div>
            </div>
            ...
            )
      })}
   );
}
```

### Step 6: Adding products to cart
To add an item to cart we need to have the product id and the user id since our cart table has a foreign key to users and products table. We will obtain the product id directly from the products we retrieved from the database before and we will use `useSession()` hook to obtain the user email which will give us the user id.

In the Featured component, we post data when the user clicks the add to cart button: we send a HTTP Request with the method POST and the body should contain the user email and the product id. Once we are done sending the request we reload the browser window to get an updated data once the request is sent.

```javascript
let [products, setProducts] = useState(images);

const { data: session } = useSession();

const handleAddToCart = (email, id) => {

   fetch(`${server}/api/add-to-cart`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: email,
         id: id
      }),
   }).then(() => window.location.reload());
}

... 
return (
   ...
   <Link href="" onClick={(e) => {
      e.preventDefault();
      handleAddToCart(session.user.email, product.id);
   }}>Add to Cart</Link>
   ...
);
```
In the `./pages/api/add-to-cart` file, we are retrieving the email and id from the body of the request. The email is then used to get the user and a check is done to see if the user has same product in his/her cart. If the product exists just increment the quantity of the product (update) else create a new item in the cart
```javascript
import { getXataClient } from "../../util/xata";

const handler = async (req, res) => {
   const { email, id } = req.body;
   const xata = getXataClient();
   // get user with email sent in the request body
   const user = await xata.db.nextauth_users.filter({ email }).getFirst();
   // check to see whether the product exists in the user's cart
   const inCart = await xata.db.cart.filter({ user_id: user.id, product_id: id }).getFirst();
   if (inCart) {
      inCart.update({ quantity: inCart.quantity + 1 });
   } else {
      await xata.db.cart.create({ user_id: { id: user.id }, product_id: { id: id } });
   }
   res.end();
}

export default handler;
```
When you view your Xata database from the browser an item will be added to the cart table when a user adds an item to cart.

### Step 7: Creating the /cart route 
In this application, we need to create a page where the user might actually see the items in his/her cart and confirm order of the items.
To do this:
First, create a new file `/pages/cart.js` and inside it import Navbar, Cart and Footer components as shown:
```javascript
import Head from 'next/head'
import Cart from '../components/Cart'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>HerBeauty</title>
        <meta name="description" content="Next.js e-commerce application using Xata as a serverless data storage and Cloudinary for media storage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Cart />
      <Footer />
    </div>
  )
}

```
We have to query Xata to retrieve items in the cart. To do this create a `./pages/api/get-cart-items` which will give us the product details. 

```javascript
import { getXataClient } from "../../util/xata";

async function handler(req, res) {
   let products = []
   const xata = getXataClient();
   const { email } = req.body;
   const user = await xata.db.nextauth_users.filter({ email }).getFirst();
   // remember an item in the cart is not yet ordered: is_ordered: false
   const cartItems = await xata.db.cart.filter({ user_id: user.id, is_ordered: false }).getMany();
   // since cartItems returns an array of objects with quantity, product_id (foreign key) and user_id (foreign key)
   // use product id to query the products table
   for (let item of cartItems) {
      const id = item.product_id.id;
      let product = await xata.db.products.filter({ id }).getFirst();
      // add item quantity to product details
      product = { ...product, quantity: item.quantity };
      products.push(product);
   }
   res.send(products);
}
export default handler;
```
Once done, create a `Cart` component inside the components folder. Here we need the user to see the cart items, be able to increment and decrement the quantity for a certain item, see the total price and order the items. It should be implemented as follows:

```javascript
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
      const cartItems = await fetch("/api/get-cart-items", {
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
export default Cart;
```
#### Incrementing item quantity
To increment the item quantity an api route, `./pages/api/increment-item-quantity` is required since we are updating data in our Xata database.

```javascript
import { getXataClient } from "../../util/xata";

const handler = async (req, res) => {
   const { product_id, quantity } = req.body;
   const xata = getXataClient();
   const item = await xata.db.cart.filter({ product_id }).getFirst();
   item.update({ quantity: quantity });
   res.end();
}
export default handler;
```

This increment is performed when the increment button is clicked. In the Cart component add this:

```javascript
const handleAddQuantity = (product_id, quantity) => {
   fetch("/api/increment-item-quantity", {
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
```

#### Decrementing item quantity
To decrement the item quantity an api route, `./pages/api/decrement-item-quantity` is required since we are updating data in our Xata database.

```javascript
import { getXataClient } from "../../util/xata";

const handler = async (req, res) => {
   const { product_id, quantity } = req.body;
   const xata = getXataClient();
   if (quantity > 0) {
      const item = await xata.db.cart.filter({ product_id }).getFirst();
      item.update({ quantity: quantity });
   } else {
      const item = await xata.db.cart.filter({ product_id }).getFirst();
      await xata.db.cart.delete(item.id);
   }
   res.end();
}
export default handler;
```
Decrementing the quantity is done when the decrement button is clicked. In the Cart component add the following code:

```javascript
const handleReduceQuantity = (product_id, quantity) => {
   fetch("/api/decrement-item-quantity", {
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
```

#### Ordering cart items
Once a user has confirmed the cart items he/she can order the products. This is where we update the items in our cart table by marking them as ordered by simply setting is_ordered column to `true` through the `./pages/api/order-products` api endpoint. We also create a new order and update the order_id of the cart table with the one just obtained.

```javascript
import { getXataClient } from "../../util/xata";

async function handler(req, res) {
   const xata = getXataClient();
   const { total, email } = req.body;
   const user = await xata.db.nextauth_users.filter({ email }).getFirst();
   const order = await xata.db.orders.create({ total_amount: total });
   const cartItems = await xata.db.cart.filter({ user_id: user.id, is_ordered: false }).getMany();
   for (let item of cartItems) {
      item.update({ is_ordered: true, order: order.id });
   }
   res.end();
}
export default handler;
```

The order is issued when the user clicks the order button, thus we have to implement the handleOrder function in Cart component as shown below:

```javascript
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
```

### Step 8: Update number of items in cart
As you might have seen, the navbar shows the number of items in cart and the default is zero. To update it once a user adds an item to cart, we have to query Xata to retrieve the number of items in cart. 
To determine the number of items in cart, we can use `get-cart-items` API endpoint and get the length of the resulting data. In the Navbar component, add:

```javascript
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
   // set the number to be the number of items in cart.
   setNumber(cartItems.length);
})()
```

### Conclusion
In conclusion, building an e-commerce Next.js application with Xata and Cloudinary is a straightforward process that can be completed in just a few steps. By following the instructions outlined in this article, you can easily set up a fully functional e-commerce application that is fast, scalable and visually apealling. 

The combination of Next.js, Xata and Cloudinary provides a powerful and flexible plaform for building your online store.