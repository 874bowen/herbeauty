import Head from 'next/head'
import Featured from '../components/Featured'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar'
import { getFolders, mapIMageResources } from '../lib/cloudinary'


export default function Home({ images }) {

  return (
    <div>
      <Head>
        <title>HerBeauty</title>
        <meta name="description" content="Next.js e-commerce application using Xata as a serverless data storage and Cloudinary for media transformations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Featured images={images} />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?expression=folder%3D%22herbeauty%22`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());

  const { resources, next_cursor: nextCursor } = results;

  const images = mapIMageResources(resources);

  const { folders } = await getFolders();

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
      folders
    }
  }
}