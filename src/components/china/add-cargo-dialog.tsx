"use client"

import { useMemo } from "react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"

type FormValues = {

  client:string

  weightKg:number

  length:number

  width:number

  height:number

}

interface Props{

  setCargo:any

}

export default function AddCargoDialog({

  setCargo

}:Props){

  const {

    register,

    watch,

    handleSubmit,

    reset

  } = useForm<FormValues>()

  const length = Number(
    watch("length") || 0
  )

  const width = Number(
    watch("width") || 0
  )

  const height = Number(
    watch("height") || 0
  )

  const cube = useMemo(()=>{

    return (

      (length/100)

      *

      (width/100)

      *

      (height/100)

    )

  },[
    length,
    width,
    height
  ])

const onSubmit = (data: FormValues) => {

  const KG_TARIFF = 25

  const CUBE_TARIFF = 2500

  const kgPrice =

    Number(data.weightKg)

    *

    KG_TARIFF

  const cubePrice =

    cube

    *

    CUBE_TARIFF

  const finalPrice =

    Math.max(
      kgPrice,
      cubePrice
    )

  const method =

    kgPrice > cubePrice

      ? "KG"

      : "CUBE"

  const newCargo = {

    id: Date.now().toString(),

    cargoCode:
      `LGT-CHN-${Date.now()}`,

    clientName: data.client,

    driverName: "Not Assigned",

    weightKg: Number(
      data.weightKg
    ),

    length: Number(
      data.length
    ),

    width: Number(
      data.width
    ),

    height: Number(
      data.height
    ),

    cube: Number(
      cube.toFixed(2)
    ),

    method,

    finalPrice,

    status: "CHINA_WAREHOUSE"

  }

  setCargo((prev: any) => [

    newCargo,

    ...prev

  ])

  reset()

}

  return (

    <Dialog>

      <DialogTrigger asChild>

        <Button>

          Add Cargo

        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>

            New Cargo

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }

          className="
            space-y-4
          "
        >

          <div>

            <Label>

              Client

            </Label>

            <Input

              {...register(
                "client"
              )}

            />

          </div>

          <div>

            <Label>

              Weight KG

            </Label>

            <Input

              type="number"

              {...register(
                "weightKg"
              )}

            />

          </div>

          <div className="
            grid
            grid-cols-3
            gap-4
          ">

            <Input
              placeholder="L"

              type="number"

              {...register(
                "length"
              )}

            />

            <Input
              placeholder="W"

              type="number"

              {...register(
                "width"
              )}

            />

            <Input
              placeholder="H"

              type="number"

              {...register(
                "height"
              )}

            />

          </div>

          <div className="
            rounded-lg
            border
            p-3
            text-sm
          ">

            Cube:

            <span className="
              ml-2
              font-bold
            ">

              {cube.toFixed(2)}

            </span>

            m³

          </div>

          <Button
            className="
              w-full
            "
            type="submit"
          >

            Save

          </Button>

        </form>

      </DialogContent>

    </Dialog>

  )

}