# How to build an e-commerce Next.js application with Xata and Cloudinary

When building an e-commerce application backend development is important. Developers need to come up with complex functions and this might be time-consuming and costly. Serverless computing allows developers to build applications more quickly and less costly because they don't have to worry about managing their own servers.

## What is serverless?

Serverless is a development model in the cloud that enables developers to create and run applications without the need for server management. These are servers but they are just abstracted away from the developer.

In this article, we are going to use [Xata](https://xata.io/) as serverless database, think of Xata as a platform where we can create and access the database inside our application through API endpoints.

## The need for image management

Traditionally, we manage our images and media directly from our project. This restricts the way we can serve and transform our media. By transformations we mean basic things like cropping and resizing to advanced layering and text additions.

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

```json
{
   "tables": [
      {
         "name": "nextauth_accounts",
         "columns": [
            {
               "name": "user",
               "type": "link",
               "link": {
                  "table": "nextauth_users"
               }
            },
            {
               "name": "type",
               "type": "string"
            },
            {
               "name": "provider",
               "type": "string"
            },
            {
               "name": "providerAccountId",
               "type": "string"
            },
            {
               "name": "refresh_token",
               "type": "string"
            },
            {
               "name": "access_token",
               "type": "string"
            },
            {
               "name": "expires_at",
               "type": "int"
            },
            {
               "name": "token_type",
               "type": "string"
            },
            {
               "name": "scope",
               "type": "string"
            },
            {
               "name": "id_token",
               "type": "text"
            },
            {
               "name": "session_state",
               "type": "string"
            }
         ]
      },
      {
         "name": "nextauth_sessions",
         "columns": [
            {
               "name": "sessionToken",
               "type": "string"
            },
            {
               "name": "expires",
               "type": "datetime"
            },
            {
               "name": "user",
               "type": "link",
               "link": {
                  "table": "nextauth_users"
               }
            }
         ]
      },
      {
         "name": "nextauth_users",
         "columns": [
            {
               "name": "email",
               "type": "email"
            },
            {
               "name": "emailVerified",
               "type": "datetime"
            },
            {
               "name": "name",
               "type": "string"
            },
            {
               "name": "image",
               "type": "string"
            }
         ]
      },
      {
         "name": "nextauth_users_accounts",
         "columns": [
            {
               "name": "user",
               "type": "link",
               "link": {
                  "table": "nextauth_users"
               }
            },
            {
               "name": "account",
               "type": "link",
               "link": {
                  "table": "nextauth_accounts"
               }
            }
         ]
      },
      {
         "name": "nextauth_users_sessions",
         "columns": [
            {
               "name": "user",
               "type": "link",
               "link": {
                  "table": "nextauth_users"
               }
            },
            {
               "name": "session",
               "type": "link",
               "link": {
                  "table": "nextauth_sessions"
               }
            }
         ]
      },
      {
         "name": "nextauth_verificationTokens",
         "columns": [
            {
               "name": "identifier",
               "type": "string"
            },
            {
               "name": "token",
               "type": "string"
            },
            {
               "name": "expires",
               "type": "datetime"
            }
         ]
      },
      {
         "name": "products",
         "columns": [
            {
               "name": "name",
               "type": "string",
               "unique": true
            },
            {
               "name": "description",
               "type": "string"
            },
            {
               "name": "price",
               "type": "float",
               "notNull": true,
               "defaultValue": "0.00"
            },
            {
               "name": "image",
               "type": "string"
            },
            {
               "name": "available",
               "type": "int"
            }
         ]
      },
      {
         "name": "cart_session",
         "columns": [
            {
               "name": "user_id",
               "type": "link",
               "link": {
                  "table": "nextauth_users"
               }
            },
            {
               "name": "quantity",
               "type": "float",
               "notNull": true,
               "defaultValue": "1"
            },
            {
               "name": "is_ordered",
               "type": "bool",
               "notNull": true,
               "defaultValue": "false"
            },
            {
               "name": "order",
               "type": "link",
               "link": {
                  "table": "orders"
               }
            },
            {
               "name": "product_id",
               "type": "link",
               "link": {
                  "table": "products"
               }
            }
         ]
      },
      {
         "name": "orders",
         "columns": [
            {
               "name": "total_amount",
               "type": "float"
            }
         ]
      }
   ]
}
```

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
