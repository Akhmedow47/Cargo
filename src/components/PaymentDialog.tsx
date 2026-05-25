"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"

interface PaymentDialogProps {
  trackingCode: string
  totalAmount: number
  onPaymentSuccess: (trackingCode: string) => void
}

export function PaymentDialog({ trackingCode, totalAmount, onPaymentSuccess }: PaymentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cash")

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    onPaymentSuccess(trackingCode)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5 border-zinc-300 dark:border-zinc-700">
          <CreditCard className="h-3.5 w-3.5" /> Оплата
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Прием оплаты</DialogTitle>
          <DialogDescription>
            Проведение расчета за посылку <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{trackingCode}</span>.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handlePay} className="space-y-4 pt-2">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900 border text-center">
            <span className="text-xs text-muted-foreground block">Сумма к оплате:</span>
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50">${totalAmount.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Способ оплаты</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Наличные (TJS / USD)</SelectItem>
                <SelectItem value="alif">Alif / Душанбе Сити (QR)</SelectItem>
                <SelectItem value="card">Банковская карта (Терминал)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Подтвердить платёж
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
