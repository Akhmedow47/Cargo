'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import CargoDetailsSheet from '@/components/china/cargo-details-sheet'

import { Cargo } from '@/types/cargo'

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal } from 'lucide-react'

export const columns = (
	setCargo: any
): ColumnDef<Cargo>[] => [
	{
		accessorKey: 'cargoCode',

		header: 'Code',
	},

	{
		accessorKey: 'clientName',

		header: 'Client',
	},

	{
		accessorKey: 'driverName',

		header: 'Driver',
	},

	{
		accessorKey: 'weightKg',

		header: 'KG',
	},

	{
		accessorKey: 'cube',

		header: 'Cube',
	},

	{
		accessorKey: 'method',

		header: 'Method',

		cell: ({ row }) => (
			<Badge>

				{row.original.method}

			</Badge>
		),
	},

	{
		accessorKey: 'finalPrice',

		header: 'Price',

		cell: ({ row }) => (
			<div className='font-medium'>

				${row.original.finalPrice}

			</div>
		),
	},

	{
		accessorKey: 'status',

		header: 'Status',

		cell: ({ row }) => {

			const status =
				row.original.status

			return (

				<Badge
					variant='outline'

					className={

						status ===
						'IN_TRANSIT'

							? 'border-blue-500 text-blue-500'

							: status ===
								'CHINA_WAREHOUSE'

								? 'border-yellow-500 text-yellow-500'

								: 'border-green-500 text-green-500'

					}
				>

					{status}

				</Badge>

			)

		},
	},

	{
		id: 'actions',

		cell: ({ row }) => (

			<div
				className='
					flex
					items-center
					gap-2
				'
			>

				<CargoDetailsSheet
					cargo={row.original}
				/>

				<DropdownMenu>

					<DropdownMenuTrigger asChild>

						<Button
							variant='ghost'
							size='icon'
						>

							<MoreHorizontal
								className='
									h-4
									w-4
								'
							/>

						</Button>

					</DropdownMenuTrigger>

					<DropdownMenuContent align='end'>

						<DropdownMenuItem>

							Edit Cargo

						</DropdownMenuItem>

						<DropdownMenuItem>

							Assign Driver

						</DropdownMenuItem>

						<DropdownMenuItem>

							Move To Transit

						</DropdownMenuItem>

						<DropdownMenuItem
							className='
								text-red-500
							'

							onClick={() => {

								setCargo((prev:any) =>

									prev.filter(

										(item:any) =>

											item.id !==
											row.original.id

									)

								)

							}}
						>

							Delete

						</DropdownMenuItem>

					</DropdownMenuContent>

				</DropdownMenu>

			</div>

		),
	},
]