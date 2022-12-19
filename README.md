# How to build an e-commerce Next.js application with Xata and Cloudinary

When building an e-commerce application backend development is important. Developers need to come up with complex functions and this might be time-consuming and costly. Serverless computing allows developers to build applications more quickly and less costly because they don't have to worry about managing their own servers.

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
- Authentication using nextAuth and Xata using Google
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

In the `src/index.js` file we have imported three components, the `Navbar`, `Featured` and `Footer` component. The `Featured` component renders the featured products to the user.

## Step 1: Uploading images to cloudinary

You can download the images we will be using [here](https://collection.cloudinary.com/bowenivan/f98fd40280ed3113c0bf0e094a7ceb9a). Once you have downloaded the images, log in to your [Cloudinary](https://cloudinary.com/) account and click the media library tab where you can create a new folder by clicking the folder icon besides the home dropdown.
Open the folder by clicking the three dots as shown in the image below. You can then upload the images you previously downloaded by clicking upload button on the top right corner.

![cl-createfolder](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1670153679/Articles/herbeauty/cl-folder_s50e9c.png)

## Step 2: Authentication using XataAdapter and NextAuth.js

Authentication is a standard thing for web applications because we want to know who is making requests and manage transactions while protecting confidential or private information. [NextAuth.js](https://next-auth.js.org) allows us to manage access to our data by providing a way to authenticate users using providers such as Google.
[XataAdapter](https://next-auth.js.org/adapters/xata) allows us to store users and sessions into our Xata database.

#### Creating a database on Xata

For our simple e-commerce application, we are going to have a structure like the one below: each user is has a cart, a cart belongs to only one user, a cart comprises of many products and one or many products can belong to many carts. Once an order is placed the products in that cart will have an foreign key to the order placed.

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

With everything ready, let's create a new Xata project that uses our next-auth schema and can be used by the Xata adapter. To do this we will use the scheme in the `schema.json` at the root of our folder of our application which was included in the starter project.

`schema.json` contains tables that we are going to have on our Xata database and as you might have guessed the tables named `nextauth_...` stores the users' information we are going to get from Google provider.

Once done, run the following command:

```bash
xata init --schema=./path/to/your/schema.json
```
The CLI will guide you through a setup process in which you will select a workspace and a database. We recommend creating a new database for this, as we'll be supplementing it with tables required by next-auth.

![xata](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,w_1440/v1671351888/Articles/herbeauty/xata_cq6irj.png)

Once done with the setup, we can use NextAuth and XataAdapter in our application by creating a `./pages/api/auth/[...nextauth]` route and paste the following:

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

You can find more about NextAuth and Google provider [here](https://next-auth.js.org/providers/google). Xata Adapter will ensure that once a user has used Google for authentication in our app the details provided by Google will be stored in our Xata database.

#### Inserting items into our products table
We can insert products into our products on our Xata database using the [browser interface](http://app.xata.io/). You can then go to Cloudinary and copy the links of the images you uploaded and paste it in the images column for individual products as shown below.
![products](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671357208/Articles/herbeauty/table_esa9kf.png)

### Step 3: Using OAuth 2.0 to Access Google APIs for Authentication

To create a Google provider application log in to [Google Cloud for Developers](https://console.cloud.google.com/), click the new project button on the OAuth consent screen then give your project a name then click create.

![gcp](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671353924/Articles/herbeauty/gcp_fzzqmb.png)

Once you are done, you are required to fill in more information about your project: choose an external project then fill the required fields only which include app name, support email and developers email. 

After creating a project, go to the Credentials tab then click the CREATE CREDENTIALS button on the top mid of the screen and choose OAuth Client ID. Fill out the form as shown below and click Create. Note that I have two URI's one is for localhost and the other for the deployed application on [Netlify](https://www.netlify.com/). This means that you will just need the localhost URI only unless you have deployed your application.

![credentialsform](https://res.cloudinary.com/bowenivan/image/upload/c_fit,h_840,q_auto:best,w_1440/v1671373589/Articles/herbeauty/gcp1_da3svj.png)

Having finished, you will be given the client id and client secret. These values should be treated as passwords and will be stored inside the `.env` file and this file should be listed inside `.gitignore` file. The JWT_SECRET is also required by Xata for creating access tokens.

```
GOOGLE_CLIENT_ID=PASTE_YOUR_CLIENT_ID_SECRET_HERE
GOOGLE_CLIENT_SECRET=PASTE_YOUR_CLIENT_SECRET_GOES_HERE
JWT_SECRET=SOME_RANDOM_VALUES
```

### Step 4: Login and Logout Functionality
For our users to be able to log in and log out of our application we are going to `useSession`, a React Hook that helps us check if someone signed in. Before we use this hook we have to wrap our application with the `SessionProvider`. To do this, copy this to `_app.js`:

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

With our application wrapped with SessionProvider we can implement user login and logout in `Navbar.js`. If we have a valid session it means that the user logged in successfully and we can display the name, image on the Navbar. Otherwise, an invalid session means a user is not logged in and we can display the login button.

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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
