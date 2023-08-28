'use client'
import { uploadImage } from "@/actions/uploadAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  params: {
    id: string
  }
}

type CreateDishInputs = {
  name: string,
  description: string,
  active: string,
  category: string,
  categoryName: string,
  price: number,
}

type CreateCategoryInputs = {
  categoryName: string
}

type CategoryOption = {
  value: string,
  label: string
}

export default function RestaurantDishCreatePage({ params }: Props) {
  // const cld = new Cloudinary({ cloud: { cloudName: 'ddkimmrqv' } });
  const [file, setFile] = useState<File>()

  const [categories, setCategories] = useState<CategoryOption[]>([])

  const createDish = useForm<CreateDishInputs>()
  const createCategory = useForm<CreateCategoryInputs>()


  const onSubmitCreateDish: SubmitHandler<CreateDishInputs> = async (data) => {
    const response = await fetch(`/api/restaurant/${params.id}/dish/create`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        category: data.category,
        active: data.active === 'on' ? true : false,
        price: Number(data.price),
        restaurantId: params.id
      })
    })

    createDish.reset()

    const result = await response.json()
    return result
  }

  const onSubmitCreateCategory: SubmitHandler<CreateCategoryInputs> = async (data) => {
    const response = await fetch('/api/category/create', {
      method: 'POST',
      body: JSON.stringify({
        name: data.categoryName,
        restaurantId: params.id,
      })
    })

    createCategory.reset()
    const result = await response.json()

    setCategories([...categories, {
      value: result.newCategory.id,
      label: result.newCategory.name
    }])
    return result
  }

  const onSubmitUploadImage = async () => {
    const formData = new FormData()

    formData.append('files', file)

    const res = await uploadImage(formData)

  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.currentTarget?.files) throw new Error('No files selected')
    setFile(e.currentTarget.files[0])
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`/api/category/${params.id}`)
      const result = await response.json()

      setCategories(result.categories.map((category: Category) => {
        return {
          value: category.id,
          label: category.name
        }
      }))
    }

    fetchCategories()
  }, [params.id])


  return (
    <section className="flex gap-8">
      <form className="w-full" onSubmit={createDish.handleSubmit(onSubmitCreateDish)}>
        <div className="w-full">
          <h2 className="mt-4 font-regular text-xl">Nuevo Plato</h2>
          <div className="mt-8" >
            <div className="">
              <div className="border rounded-lg p-3">
                <Input
                  {...createDish.register('name')}
                  type="text"
                  placeholder="Nombre del plato"
                  className="text-xl font-semibold mb-2"
                />
                <Input
                  {...createDish.register('price')}
                  type="number"
                  step={0.01}
                  placeholder="Precio"
                  className="text-xl mb-2"
                />
                <Textarea
                  {...createDish.register('description')}
                  placeholder="Breve descripción" className="text-xl mt-2 mb-2" />

                <select {...createDish.register('category')} className="w-full border p-1 rounded-md">
                  {categories.map((client) => (
                    <option value={client.value} key={client.value} >
                      {client.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-3 my-3">
                  <label htmlFor="active">Estado: </label>
                  <Switch
                    {...createDish.register('active')}
                  />
                </div>


                <div className="">
                  <Button type="submit" className="mt-2">Publicar</Button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </form>

      <aside className="w-4/12">

        <div className="my-5 border rounded p-5">
          <h3 className="text-xl font-regular">Nueva categoría</h3>

          <div className="mt-2">
            <form onSubmit={createCategory.handleSubmit(onSubmitCreateCategory)}>
              <Input type="text" {...createCategory.register('categoryName')} placeholder="Nombre de la categoría" />
              <Button type="submit" className="mt-2">Añadir</Button>
            </form>
          </div>
        </div>
        <div className="my-5 border rounded p-5">
          <h3 className="text-xl font-regular">Imagen</h3>
          <div className="mt-2">
            <div className="">
              <div>
                {
                  file && <img src={URL.createObjectURL(file)} className="rounded-lg mb-2" />
                }

                <form action={onSubmitUploadImage}>
                  <Input type="file" accept="image/*" onChange={(event) => handleChangeImage(event)} />
                  <Button className="mt-2">Subir imagen</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section >

  );
}