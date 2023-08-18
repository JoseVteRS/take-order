'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const GoBack = () => {
    const router = useRouter()

    const handleBack = () => router.back()

    return (
        <button onClick={handleBack}>
            <ArrowLeft />
        </button>
    )
}