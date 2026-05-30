export interface Cargo {
  id: string

  cargoCode: string

  clientName: string

  driverName: string

  weightKg: number

  length: number

  width: number

  height: number

  cube: number

  method: "KG" | "CUBE"

  finalPrice: number

  status:
    | "CHINA_WAREHOUSE"
    | "IN_TRANSIT"
    | "TAJIK_WAREHOUSE"
}