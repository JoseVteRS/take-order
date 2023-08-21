'use client'

import { Switch } from "@/components/ui/switch";
import { useState } from "react";



export function VisibilitySwitch({ visibility, id }: { visibility: boolean, id: string }) {


    const [isVisible, setIsVisible] = useState(visibility)

    const handleChange = async () => {
        setIsVisible(oldVisible => !oldVisible)

        await fetch('/api/dish', {
            method: 'POST',
            body: JSON.stringify({
                dishId: id,
                active: !isVisible,
            })
        })
    }


    return (
        <Switch defaultChecked={isVisible}  onCheckedChange={handleChange} />
    )
}