'use client'

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { Cargo } from '@/types/cargo'
import { columns } from './columns'

interface Props {
	data: Cargo[]
	setCargo: any
}

export default function CargoTable({ data, setCargo }: Props) {
	const table = useReactTable({
		data,
		columns: columns(setCargo),
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div
			className='
      w-full
      overflow-x-auto
      rounded-xl
      border
      bg-card
    '
		>
			<Table className='min-w-300'>
				<TableHeader>
					{table.getHeaderGroups().map(group => (
						<TableRow key={group.id}>
							{group.headers.map(header => (
								<TableHead
									key={header.id}
									className='
                      whitespace-nowrap
                      px-4
                    '
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className='
                          whitespace-nowrap
                          px-4
                        '
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className='
                  h-24
                  text-center
                '
							>
								No cargo found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
