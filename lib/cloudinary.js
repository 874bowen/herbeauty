export async function search(options={}) {
  const params = {
    ...options
  }

  if (options.nextCursor){
    params.next_cursor = options.nextCursor;
    delete options.nextCursor;
  }

  const paramString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('$')

  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());
  return results;
}

export function mapIMageResources(resources) {
  return resources.map(resource => {
    const { width, height , title } = resource;
    const name = resource.public_id.split("/")[1];
  
    return {
      id: resource.asset_id,
      title: name,
      image: resource.secure_url,
      width,
      height
    }
  })
}

export async function getFolders(options={}) {
  
  const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders/`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(r => r.json());
  return results;
}
