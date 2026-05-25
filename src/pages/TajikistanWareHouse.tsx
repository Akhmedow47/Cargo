'use client'

import { PriceCalcForm } from '@/components/PriceCalcForm' // Импорт калькулятора из Шага 1
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
import { Archive, Calculator, ClipboardList } from 'lucide-react'
import { useState } from 'react'

interface ArrivedCargo {
	id: string
	trackingCode: string
	weight: number
	totalCost: number
	storageDays: number
	status: 'Выдано' | 'На складе' | 'Срок истекает'
}

const initialArrivedData: ArrivedCargo[] = [
	{
		id: '1',
		trackingCode: 'CN-99482-X',
		weight: 4.5,
		totalCost: 15.75,
		storageDays: 2,
		status: 'Выдано',
	},
	{
		id: '2',
		trackingCode: 'CN-10293-A',
		weight: 12.2,
		totalCost: 42.7,
		storageDays: 5,
		status: 'На складе',
	},
	{
		id: '3',
		trackingCode: 'CN-44910-Z',
		weight: 1.8,
		totalCost: 6.3,
		storageDays: 12,
		status: 'Срок истекает',
	},
]

export default function TajikistanWarehouse() {
	const [cargoList] = useState<ArrivedCargo[]>(initialArrivedData)

	// Определение цвета плашки в зависимости от дней хранения (Storage)
	const getStorageBadge = (days: number) => {
		if (days >= 10)
			return <Badge variant='destructive'>{days} дней (Платное)</Badge>
		if (days >= 5)
			return (
				<Badge className='bg-amber-500 hover:bg-amber-600 text-white border-none'>
					{days} дней
				</Badge>
			)
		return (
			<Badge className='bg-emerald-500 hover:bg-emerald-600 text-white border-none'>
				{days} дн. (Бесплатно)
			</Badge>
		)
	}

	return (
		<div className='w-full p-6 space-y-4'>
			<div className='flex flex-col space-y-1'>
				<h1 className='text-2xl font-bold tracking-tight'>Склад Таджикистан</h1>
				<p className='text-sm text-muted-foreground'>
					Прием грузов в Душанбе, расчет стоимости и контроль сроков хранения.
				</p>
			</div>

			<Tabs defaultValue='arrived' className='w-full'>
				<TabsList className='grid w-full grid-cols-3 max-w-[450px]'>
					<TabsTrigger value='arrived' className='gap-2'>
						<ClipboardList className='h-4 w-4' /> Arrived cargo
					</TabsTrigger>
					<TabsTrigger value='calc' className='gap-2'>
						<Calculator className='h-4 w-4' /> Price calc
					</TabsTrigger>
					<TabsTrigger value='storage' className='gap-2'>
						<Archive className='h-4 w-4' /> Storage
					</TabsTrigger>
				</TabsList>

				{/* === ВКЛАДКА 1: ARRIVED CARGO (ПРИБЫВШИЕ ГРУЗЫ) === */}
				<TabsContent value='arrived' className='pt-2'>
					<Card className='border-zinc-200 dark:border-zinc-800'>
						<CardHeader>
							<CardTitle>Прибывшие грузы</CardTitle>
							<CardDescription>
								Список посылок, доставленных на склад назначения в Таджикистане.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Tracking Code</TableHead>
										<TableHead>Вес груза</TableHead>
										<TableHead>Стоимость доставки</TableHead>
										<TableHead className='text-right'>Статус</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{cargoList.map(cargo => (
										<TableRow key={cargo.id}>
											<TableCell className='font-mono font-bold'>
												{cargo.trackingCode}
											</TableCell>
											<TableCell>{cargo.weight} кг</TableCell>
											<TableCell>${cargo.totalCost.toFixed(2)}</TableCell>
											<TableCell className='text-right'>
												<Badge
													variant={
														cargo.status === 'Выдано' ? 'secondary' : 'default'
													}
												>
													{cargo.status}
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>

				{/* === ВКЛАДКА 2: PRICE CALC (ИМПОРТ ИЗОЛИРОВАННОЙ ФОРМЫ) === */}
				<TabsContent value='calc' className='pt-2'>
					<PriceCalcForm />
				</TabsContent>

				{/* === ВКЛАДКА 3: STORAGE (КОНТРОЛЬ ХРАНЕНИЯ) === */}
				<TabsContent value='storage' className='pt-2'>
					<Card className='border-zinc-200 dark:border-zinc-800'>
						<CardHeader>
							<CardTitle>Контроль сроков хранения</CardTitle>
							<CardDescription>
								Мониторинг посылок, находящихся на складе. Бесплатный период — 5
								дней.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Tracking Code</TableHead>
										<TableHead>Вес</TableHead>
										<TableHead className='text-right'>Дней на складе</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{cargoList
										.filter(c => c.status !== 'Выдано') // Показываем только те, что еще на складе
										.map(cargo => (
											<TableRow key={cargo.id}>
												<TableCell className='font-mono font-bold'>
													{cargo.trackingCode}
												</TableCell>
												<TableCell>{cargo.weight} кг</TableCell>
												<TableCell className='text-right'>
													{getStorageBadge(cargo.storageDays)}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
