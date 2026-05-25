"use client"

import React, { useState } from 'react'
import { Search, CheckCircle2, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PaymentDialog } from "@/components/PaymentDialog" // Импорт диалога оплаты

interface DeliveryOrder {
  id: string
  trackingCode: string
  clientName: string
  phone: string
  total: number
  paymentStatus: "Оплачено" | "Не оплачено"
  deliveryStatus: "Готов к выдаче" | "Выдан клиенту"
}

const initialDeliveryOrders: DeliveryOrder[] = [
  { id: "del_1", trackingCode: "CN-99482-X", clientName: "Алишер Рахимов", phone: "+992 93 111 2233", total: 15.75, paymentStatus: "Не оплачено", deliveryStatus: "Готов к выдаче" },
  { id: "del_2", trackingCode: "CN-10293-A", clientName: "Мадина Солихова", phone: "+992 90 444 5566", total: 42.70, paymentStatus: "Оплачено", deliveryStatus: "Готов к выдаче" },
  { id: "del_3", trackingCode: "CN-44910-Z", clientName: "Алишер Рахимов", phone: "+992 93 111 2233", total: 6.30, paymentStatus: "Оплачено", deliveryStatus: "Выдан клиенту" },
]

export default function ClientDelivery() {
  const [orders, setOrders] = useState<DeliveryOrder[]>(initialDeliveryOrders)
  const [searchQuery, setSearchQuery] = useState("")

  // Обработка успешной оплаты
  const handlePaymentSuccess = (trackingCode: string) => {
    setOrders(prev => prev.map(order => 
      order.trackingCode === trackingCode 
        ? { ...order, paymentStatus: "Оплачено" } 
        : order
    ))
  }

  // Обработка выдачи посылки клиенту
  const handleDeliver = (id: string) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, deliveryStatus: "Выдан клиенту" } 
        : order
    ))
  }

  // Фильтрация заказов по поисковому запросу (Имя, Телефон, Трек)
  const filteredOrders = orders.filter(order => 
    order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.phone.includes(searchQuery) ||
    order.trackingCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full p-6 space-y-4">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Выдача клиентам</h1>
        <p className="text-sm text-muted-foreground">Поиск клиентов, проведение кассовых операций (Payment) и регистрация выдачи (Delivery).</p>
      </div>

      {/* Панель поиска */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Поиск по имени, телефону или трек-коду..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Таблица заказов к выдаче */}
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Доставка и Расчеты</CardTitle>
          <CardDescription>Управление статусами оплаты и фактическим отпуском посылок со склада.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking Code</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Финансы</TableHead>
                <TableHead>Логистика</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-bold">{order.trackingCode}</TableCell>
                    <TableCell className="font-medium">{order.clientName}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{order.phone}</TableCell>
                    <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.paymentStatus === "Оплачено" ? (
                        <Badge className="bg-emerald-500 text-white border-none gap-1"><CheckCircle2 className="h-3 w-3" /> Оплачено</Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" /> Долг</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.deliveryStatus === "Выдан клиенту" ? "secondary" : "default"}>
                        {order.deliveryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      {/* Если не оплачено — выводим кнопку оплаты */}
                      {order.paymentStatus === "Не оплачено" && (
                        <PaymentDialog 
                          trackingCode={order.trackingCode} 
                          totalAmount={order.total} 
                          onPaymentSuccess={handlePaymentSuccess} 
                        />
                      )}
                      
                      {/* Кнопка выдачи (активна только если заказ оплачен и еще не выдан) */}
                      {order.deliveryStatus === "Готов к выдаче" ? (
                        <Button 
                          size="sm" 
                          disabled={order.paymentStatus === "Не оплачено"} 
                          onClick={() => handleDeliver(order.id)}
                        >
                          Выдать
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground self-center px-3">Закрыт</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    Совпадений по запросу не найдено.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
