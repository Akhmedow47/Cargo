'use client'
import AddCargoDialog from '@/components/china/add-cargo-dialog'
import CargoFilters from '@/components/china/cargo-filters'
import CargoTable from '@/components/china/cargo-table'

import DriverCard from '@/components/china/driver-card'
import DriverMap from '@/components/china/driver-map'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export default function ChinaWarehouse() {
	const [cargo, setCargo] = useState([
		{
			id: '1',
			cargoCode: 'LGT-CHN-001',
			clientName: 'Ali',
			driverName: 'DRV001',
			weightKg: 15,
			length: 50,
			width: 40,
			height: 60,
			cube: 0.12,
			method: 'KG' as const,
			finalPrice: 600,
			status: 'IN_TRANSIT' as const,
		},
	])
	return (
		<div
			className='
space-y-6
p-6
'
		>
			{/* HEADER */}

			<div
				className='
flex
items-center
justify-between
'
			>
				<div>
					<h1
						className='
text-3xl
font-bold
'
					>
						China Warehouse
					</h1>

					<p
						className='
text-muted-foreground
'
					>
						Manage incoming cargo from China
					</p>
				</div>

				<AddCargoDialog setCargo={setCargo} />
			</div>

			{/* STATS */}

			<div
				className='
grid
grid-cols-1
gap-4

md:grid-cols-2

xl:grid-cols-4
'
			>
				<Card>
					<CardHeader>
						<CardTitle>Total Cargo</CardTitle>
					</CardHeader>

					<CardContent>
						<div
							className='
text-3xl
font-bold
'
						>
							250
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Drivers</CardTitle>
					</CardHeader>

					<CardContent>
						<div
							className='
text-3xl
font-bold
'
						>
							12
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Transit</CardTitle>
					</CardHeader>

					<CardContent>
						<div
							className='
text-3xl
font-bold
'
						>
							80
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Waiting</CardTitle>
					</CardHeader>

					<CardContent>
						<div
							className='
text-3xl
font-bold
'
						>
							30
						</div>
					</CardContent>
				</Card>
			</div>

			{/* DRIVER + MAP */}

			<div
				className='
grid
gap-6

lg:grid-cols-[350px_1fr]
'
			>
				<DriverCard />

				<DriverMap />
			</div>

			{/* FILTERS */}

			<CargoFilters />

			{/* TABLE */}

			<CargoTable data={cargo} setCargo={setCargo} />
		</div>
	)
}
