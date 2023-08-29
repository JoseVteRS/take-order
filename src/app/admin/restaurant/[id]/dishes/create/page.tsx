'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

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
  allergen: string
}

type CreateCategoryInputs = {
  categoryName: string
}

type CategoryOption = {
  value: string,
  label: string
}

const FormSchema = z.object({
  // allergens: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
  name: z.string().refine((value) => value, { message: "Name is required" }),
  description: z.string().optional(),
  active: z.boolean().optional(),
  category: z.string().refine((value) => value, { message: "Category is required" }),
  price: z.string().refine((value) => value, { message: "Price is required" }),
})

export default function RestaurantDishCreatePage({ params }: Props) {
  // const cld = new Cloudinary({ cloud: { cloudName: 'ddkimmrqv' } });
  const [file, setFile] = useState<File>()

  const [categories, setCategories] = useState<CategoryOption[]>([])

  const createDish = useForm<CreateDishInputs>()
  const createCategory = useForm<CreateCategoryInputs>()

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

    // formData.append('files', file)



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


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // allergens: [],
      name: '',
      description: '',
      active: false,
      price: '0',
      category: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    try {

      const response = await fetch(`/api/restaurant/${params.id}/dish/create`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          // allergens: data.allergens,
          description: data.description,
          category: data.category,
          active: data.active,
          price: Number(data.price),
          restaurantId: params.id
        })
      })

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: "Error al guardar el plato. Revisa la información e inténtalo de nuevo.",
        })
      }

      const result = await response.json()
      toast({
        variant: 'success',
        title: `Plato ${data.name} creado correctamente`
      })

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: `Error del servidor: ${error.message}`
      })
    }

  }


  return (
    <section className="flex gap-8">

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <FormField
              control={form.control}
              name="allergens"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Sidebar</FormLabel>
                    <FormDescription>
                      Selecciona los alérgenos que contiene el plato
                    </FormDescription>
                  </div>
                  {ALERGENOS.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="allergens"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step={0.10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>


      <aside className="w-4/12" >

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