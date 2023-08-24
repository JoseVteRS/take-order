'use client'

import { Switch } from "@/components/ui/switch";
import { useParams } from "next/navigation";
import { useState } from "react";



export function VisibilitySwitch({ visibility, dishId }: { visibility: boolean, dishId: string }) {

    const [isVisible, setIsVisible] = useState(visibility)
    const params = useParams()
    const id = params['id']

    const handleChange = async () => {
        setIsVisible(oldVisible => !oldVisible)

        await fetch(`/api/restaurant/${id}/dish/${dishId}`, {
            method: 'PUT',
            body: JSON.stringify({
                active: !isVisible,
            })
        })
    }


    return (
        <Switch defaultChecked={isVisible} onCheckedChange={handleChange} />
    )
}