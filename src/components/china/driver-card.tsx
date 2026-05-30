import {
Card,
CardContent,
CardHeader,
CardTitle
} from "@/components/ui/card"

export default function DriverCard(){

return(

<Card>

<CardHeader>

<CardTitle>

Driver Information

</CardTitle>

</CardHeader>

<CardContent
className="
space-y-4
"
>

<div>

<p className="
text-sm
text-muted-foreground
">

Driver

</p>

<p>

Zhang Wei

</p>

</div>

<div>

<p className="
text-sm
text-muted-foreground
">

Truck

</p>

<p>

CN-7788

</p>

</div>

<div>

<p className="
text-sm
text-muted-foreground
">

Route

</p>

<p>

China → Tajikistan

</p>

</div>

<div>

<p className="
text-sm
text-muted-foreground
">

Status

</p>

<p>

In Transit

</p>

</div>

</CardContent>

</Card>

)

}