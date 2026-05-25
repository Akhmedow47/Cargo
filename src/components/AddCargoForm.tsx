"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CalcType = "weight" | "cube"

interface AddCargoFormProps {
  mockClients: Array<{ id: string; name: string; phone: string }>;
  onAddCargo: (newCargo: any) => void;
}

export function AddCargoForm({ mockClients, onAddCargo }: AddCargoFormProps) {
  const [clientId, setClientId] = useState("")
  const [trackingCode, setTrackingCode] = useState("")
  const [warehouseOrigin, setWarehouseOrigin] = useState("Гуанчжоу")
  const [calcType, setCalcType] = useState<CalcType>("weight")
  
  // WEIGHT
  const [kg, setKg] = useState("")
  const [rateKg, setRateKg] = useState("3.5")

  // CUBE
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [rateCube, setRateCube] = useState("350")
  
  const [total, setTotal] = useState(0)
  const [m3Result, setM3Result] = useState(0)

  // Расчет TOTAL
  useEffect(() => {
    if (calcType === "weight") {
      setTotal((parseFloat(kg) || 0) * (parseFloat(rateKg) || 0))
    } else {
      const l = parseFloat(length) || 0
      const w = parseFloat(width) || 0
      const h = parseFloat(height) || 0
      const m3 = (l * w * h) / 1000000
      setM3Result(m3)
      setTotal(m3 * (parseFloat(rateCube) || 0))
    }
  }, [calcType, kg, rateKg, length, width, height, rateCube])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientId || !trackingCode) return

    const selectedClient = mockClients.find(c => c.id === clientId)
    
    onAddCargo({
      trackingCode: trackingCode.toUpperCase(),
      clientId,
      clientName: selectedClient?.name || "Неизвестный клиент",
      warehouseOrigin,
      calcType,
      total: parseFloat(total.toFixed(2)),
      weightOrVolume: calcType === "weight" ? `${kg} кг` : `${m3Result.toFixed(4)} м³`
    })

    // Сброс формы
    setTrackingCode("")
    setKg("")
    setLength("")
    setWidth("")
    setHeight("")
  }

  return (
    <Card className="max-w-2xl border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>Принять новый груз</CardTitle>
        <CardDescription>Зафиксируйте габариты посылки и привяжите её к клиенту.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Выберите клиента</Label>
            <Select value={clientId} onValueChange={setClientId} required>
              <SelectTrigger><SelectValue placeholder="Поиск клиента..." /></SelectTrigger>
              <SelectContent>
                {mockClients.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.phone})</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tracking Code</Label>
              <Input placeholder="CN-XXXX-Z" value={trackingCode} onChange={e => setTrackingCode(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Точка отправления</Label>
              <Select value={warehouseOrigin} onValueChange={setWarehouseOrigin}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Гуанчжоу">Гуанчжоу</SelectItem>
                  <SelectItem value="Иу">Иу</SelectItem>
                  <SelectItem value="Пекин">Пекин</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <RadioGroup value={calcType} onValueChange={(v: CalcType) => setCalcType(v)} className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weight" id="w" /><Label htmlFor="w" className="cursor-pointer">По весу (WEIGHT)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cube" id="c" /><Label htmlFor="c" className="cursor-pointer">По объему (CUBE)</Label>
            </div>
          </RadioGroup>

          {calcType === "weight" ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div className="space-y-2"><Label>Вес (кг)</Label><Input type="number" step="0.01" value={kg} onChange={e => setKg(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Тариф за кг ($)</Label><Input type="number" step="0.1" value={rateKg} onChange={e => setRateKg(e.target.value)} required /></div>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1"><Label className="text-xs">Длина (см)</Label><Input type="number" value={length} onChange={e => setLength(e.target.value)} required /></div>
                <div className="space-y-1"><Label className="text-xs">Ширина (см)</Label><Input type="number" value={width} onChange={e => setWidth(e.target.value)} required /></div>
                <div className="space-y-1"><Label className="text-xs">Высота (см)</Label><Input type="number" value={height} onChange={e => setHeight(e.target.value)} required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Объем (м³)</Label><Input value={`${m3Result.toFixed(4)} м³`} disabled className="bg-zinc-100 font-mono dark:bg-zinc-800" /></div>
                <div className="space-y-2"><Label>Тариф за м³ ($)</Label><Input type="number" value={rateCube} onChange={e => setRateCube(e.target.value)} required /></div>
              </div>
            </div>
          )}

          <div className="p-4 bg-zinc-900 text-white rounded-lg flex justify-between items-center dark:bg-zinc-50 dark:text-zinc-900">
            <span className="text-sm opacity-80">Итоговый расчет (TOTAL):</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>

          <Button type="submit" className="w-full">Зарегистрировать груз</Button>
        </form>
      </CardContent>
    </Card>
  )
}
