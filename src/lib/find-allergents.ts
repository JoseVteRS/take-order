import ALERGENS from "@/config/alergenos.json"

type Allergen = {
    id: string
    name: string
    imgSrc: string
}

export const findAllergens = (allergenId: string) => {
    return ALERGENS.find(allergen => allergen.id === allergenId)
}