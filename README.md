# How to build an e-commerce Next.js application with Xata and Cloudinary
When building an e-commerce application backend development is important. Developers need to come up with complex functions and this might be time-consuming and costly. Serverless computing allows developers to build applications more quickly and less costly because they don't have to worry about managing their own servers.

## What is serverless?
Serverless is a development model in the cloud that enables developers to create and run applications without the need for server management. These are servers but they are just abstracted away from the developer.

In this article, we are going to use [Xata](https://xata.io/) as serverless database, think of Xata as a platform where we can create and access the database inside our application through API endpoints. 

## The need for image management

Traditionally, we manage our images and media directly from our project. This restricts the way we can serve and transform our media. By transformations we mean basic things like cropping and resizing to advanced layering and text additions.

[Cloudinary](https://cloudinary.com/) is a tool we are going to use to manage the images for our application.

## Github

Check out the complete source code in this  [GitHub Repository](https://github.com/874bowen/herbeauty).


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

In the `src/index.js` file we have imported three components, the `Navbar`, `Featured` and `Footer` component. The `Featured` component renders the featured products we have to the user.


## Step 1: Uploading images to cloudinary

You can download the images we will be using [here](https://collection.cloudinary.com/bowenivan/f98fd40280ed3113c0bf0e094a7ceb9a). Once you have downloaded the images, log in to your   [Cloudinary](https://cloudinary.com/) account and click the media library tab where you can create a new folder by clicking the folder icon besides the home dropdown. 
Open the folder by clicking the three dots as shown in the image below. You can then upload the images you previously downloaded by clicking upload button on the top right corner.

![cl-createfolder](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1670153679/Articles/herbeauty/cl-folder_s50e9c.png)

## Step 2: Authentication using NextAuth.js  



![img_1.png](https://res.cloudinary.com/bowenivan/image/upload/c_scale,h_840,q_auto:best,w_1440/v1669032197/bowen-uploads/herbeauty_db_schema_jdm4s0.png)

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
