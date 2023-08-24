'use server'

import path from 'path'
import fs from 'node:fs/promises'
import os from 'node:os'
import crypto from 'crypto'
import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



async function uploadImageToCloudinary(file: any) {


  const image = await cloudinary.uploader.upload(file, {
    folder: 'dish',
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  })

  console.log('CloudinaryImage', image)

  return image
}



async function saveImageToLocal(formData: any) {

  const file: File = formData.get('files')

  const bufferPromise = await file.arrayBuffer()
    .then((data: any) => {
      const buffer = Buffer.from(data)
      const name = crypto.randomUUID()
      const ext = file.type.split('/')[1]

      // Does'nt work in Vercel
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', `/${file.name}`)

      // const temdir = os.tmpdir()
      // const uploadDir = path.join(temdir, `/${name}.${ext}`) // Works in vercel

      fs.writeFile(uploadDir, buffer)

      console.log({ filepath: uploadDir, filename: file.name })

      return { filepath: uploadDir, filename: file.name }

    })

  return await Promise.all([bufferPromise])
}

export async function uploadImage(formData: any) {
  try {

    const newFile = await saveImageToLocal(formData)
    const image = await uploadImageToCloudinary(newFile[0].filepath)

    console.log('image', { newFile, image });

  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}