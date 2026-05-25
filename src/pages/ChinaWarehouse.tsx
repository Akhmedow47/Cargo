'use client'

import { AddCargoForm } from '@/components/AddCargoForm'
import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Package, Plus, Truck } from 'lucide-react'
import { useState } from 'react'

type CargoStatus = 'На складе в Китае' | 'В пути' | 'Таможня'

interface CargoOrder {
	id: string
	trackingCode: string
	clientId: string
	clientName: string
	warehouseOrigin: string
	status: CargoStatus
	total: number
	weightOrVolume: string
}

const mockClients = [
	{ id: 'cli_1', name: 'Алишер Рахимов', phone: '+992 93 111 2233' },
	{ id: 'cli_2', name: 'Мадина Солихова', phone: '+992 90 444 5566' },
	{ id: 'cli_3', name: 'Иван Петров', phone: '+7 999 123 4567' },
]

const initialOrders: CargoOrder[] = [
	{
		id: 'ord_1',
		trackingCode: 'CN-99482-X',
		clientId: 'cli_1',
		clientName: 'Алишер Рахимов',
		warehouseOrigin: 'Гуанчжоу',
		status: 'В пути',
		total: 15.75,
		weightOrVolume: '4.5 кг',
	},
	{
		id: 'ord_2',
		trackingCode: 'CN-10293-A',
		clientId: 'cli_2',
		clientName: 'Мадина Солихова',
		warehouseOrigin: 'Иу',
		status: 'На складе в Китае',
		total: 42.0,
		weightOrVolume: '0.1200 м³',
	},
]

export default function ChinaWarehouse() {
	const [orders, setOrders] = useState<CargoOrder[]>(initialOrders)
	const [activeTab, setActiveTab] = useState('add-cargo')

	const handleAddNewCargo = (formData: any) => {
		const newOrder: CargoOrder = {
			id: Math.random().toString(),
			status: 'На складе в Китае',
			...formData,
		}
		setOrders([newOrder, ...orders])
		setActiveTab('tracking') // Авто-переключение на трекинг после сохранения
	}

	const getStatusBadge = (status: CargoStatus) => {
		switch (status) {
			case 'На складе в Китае':
				return (
					<Badge className='bg-amber-500 text-white border-none'>
						{status}
					</Badge>
				)
			case 'В пути':
				return (
					<Badge className='bg-blue-500 text-white border-none'>{status}</Badge>
				)
			default:
				return (
					<Badge className='bg-purple-500 text-white border-none'>
						{status}
					</Badge>
				)
		}
	}

	return (
		<div className='w-full p-6 space-y-4'>
			<div className='flex flex-col space-y-1'>
				<h1 className='text-2xl font-bold tracking-tight'>Склад Китай</h1>
				<p className='text-sm text-muted-foreground'>
					Управление приемкой и логистическими статусами.
				</p>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
				<TabsList className='grid w-full grid-cols-3 max-w-[450px]'>
					<TabsTrigger value='add-cargo' className='gap-2'>
						<Plus className='h-4 w-4' /> Add cargo
					</TabsTrigger>
					<TabsTrigger value='tracking' className='gap-2'>
						<Truck className='h-4 w-4' /> Tracking
					</TabsTrigger>
					<TabsTrigger value='status' className='gap-2'>
						<BarChart3 className='h-4 w-4' /> Status
					</TabsTrigger>
				</TabsList>

				{/* ВКЛАДКА 1: ФОРМА ДОБАВЛЕНИЯ */}
				<TabsContent value='add-cargo' className='pt-2'>
					<AddCargoForm
						mockClients={mockClients}
						onAddCargo={handleAddNewCargo}
					/>
				</TabsContent>

				{/* ВКЛАДКА 2: ТАБЛИЦА ТРЕКИНГА */}
				<TabsContent value='tracking' className='pt-2'>
					<Card>
						<CardHeader>
							<CardTitle>Текущие отправления</CardTitle>
							<CardDescription>Мониторинг движения посылок.</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Tracking Code</TableHead>
										<TableHead>Клиент</TableHead>
										<TableHead>Склад</TableHead>
										<TableHead>Метрика</TableHead>
										<TableHead>Стоимость</TableHead>
										<TableHead className='text-right'>Статус</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orders.map(o => (
										<TableRow key={o.id}>
											<TableCell className='font-mono font-bold'>
												{o.trackingCode}
											</TableCell>
											<TableCell>{o.clientName}</TableCell>
											<TableCell>{o.warehouseOrigin}</TableCell>
											<TableCell className='font-mono'>
												{o.weightOrVolume}
											</TableCell>
											<TableCell className='font-semibold'>
												${o.total}
											</TableCell>
											<TableCell className='text-right'>
												{getStatusBadge(o.status)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				{/* ВКЛАДКА 3: АНАЛИТИКА / СТАТУС */}
				<TabsContent value='status' className='pt-2'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<Card>
							<CardHeader className='pb-2 flex flex-row items-center justify-between'>
								<CardTitle className='text-sm font-medium'>В Китае</CardTitle>
								<Package className='h-4 w-4 text-amber-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{orders.filter(o => o.status === 'На складе в Китае').length}{' '}
									шт.
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2 flex flex-row items-center justify-between'>
								<CardTitle className='text-sm font-medium'>В пути</CardTitle>
								<Truck className='h-4 w-4 text-blue-500' />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{orders.filter(o => o.status === 'В пути').length} шт.
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-2 flex flex-row items-center justify-between'>
								<CardTitle className='text-sm font-medium'>
									Общий оборот
								</CardTitle>
								<span className='text-emerald-500 font-bold'>$</span>
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									${orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
