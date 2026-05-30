"use client"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import {

Select,

SelectContent,

SelectItem,

SelectTrigger,

SelectValue

} from "@/components/ui/select"

export default function CargoFilters(){

return(

<div className="
flex
flex-col
gap-4

rounded-xl
border

bg-card

p-4

lg:flex-row
lg:items-center
lg:justify-between
">

<div className="
flex
flex-1
flex-col
gap-4

md:flex-row
">

<Input
placeholder="
Search code / client
"
className="
max-w-sm
"
/>

<Select>

<SelectTrigger
className="
w-full
md:w-[180px]
"
>

<SelectValue
placeholder="
Status
"
/>

</SelectTrigger>

<SelectContent>

<SelectItem
value="
all
"
>

All

</SelectItem>

<SelectItem
value="
warehouse
"
>

Warehouse

</SelectItem>

<SelectItem
value="
transit
"
>

Transit

</SelectItem>

<SelectItem
value="
tajik
"
>

Tajik

</SelectItem>

</SelectContent>

</Select>

<Select>

<SelectTrigger
className="
w-full
md:w-[180px]
"
>

<SelectValue
placeholder="
Driver
"
/>

</SelectTrigger>

<SelectContent>

<SelectItem
value="all"
>

All Drivers

</SelectItem>

<SelectItem
value="drv1"
>

DRV001

</SelectItem>

<SelectItem
value="drv2"
>

DRV002

</SelectItem>

</SelectContent>

</Select>

</div>

<div className="
flex
gap-3
">

<Button
variant="
outline
"
>

Export

</Button>

<Button>

Refresh

</Button>

</div>

</div>

)

}