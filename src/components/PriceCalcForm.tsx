"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PriceCalcForm() {
  const [calcWeight, setCalcWeight] = useState("")
  const [ratePerKg, setRatePerKg] = useState("3.5") // Базовый тариф
  const [calcResult, setCalcResult] = useState<number | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const weight = parseFloat(calcWeight)
    const rate = parseFloat(ratePerKg)
    if (!isNaN(weight) && !isNaN(rate)) {
      setCalcResult(weight * rate)
    }
  }

  return (
    <Card className="max-w-[450px] border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>Калькулятор стоимости</CardTitle>
        <CardDescription>Быстрый расчет стоимости доставки карго перед выдачей.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calc-weight">Вес груза (кг)</Label>
            <Input 
              id="calc-weight" 
              type="number" 
              step="0.01" 
              placeholder="Введите вес, например 5.4" 
              value={calcWeight}
              onChange={(e) => setCalcWeight(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Тариф ($ за 1 кг)</Label>
            <Input 
              id="rate" 
              type="number" 
              step="0.1" 
              value={ratePerKg}
              onChange={(e) => setRatePerKg(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Рассчитать стоимость</Button>
          
          {calcResult !== null && (
            <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border text-center animate-in fade-in duration-200">
              <span className="text-sm text-muted-foreground block">Итого к оплате:</span>
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                ${calcResult.toFixed(2)}
              </span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
