'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'

import { Cargo } from '@/types/cargo'

interface Props {
	cargo: Cargo
}

export default function CargoDetailsSheet({ cargo }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='sm'>
					View
				</Button>
			</SheetTrigger>

			<SheetContent
				className='
w-100
sm:w-135
'
			>
				<SheetHeader>
					<SheetTitle>Cargo Details</SheetTitle>
				</SheetHeader>

				<div
					className='
mt-6
space-y-6
'
				>
					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Cargo Code
						</p>

						<p
							className='
font-medium
'
						>
							{cargo.cargoCode}
						</p>
					</div>

					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Client
						</p>

						<p>{cargo.clientName}</p>
					</div>

					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Driver
						</p>

						<p>{cargo.driverName}</p>
					</div>

					<div
						className='
grid
grid-cols-2
gap-4
'
					>
						<div>
							<p
								className='
text-sm
text-muted-foreground
'
							>
								Weight
							</p>

							<p>{cargo.weightKg} KG</p>
						</div>

						<div>
							<p
								className='
text-sm
text-muted-foreground
'
							>
								Cube
							</p>

							<p>{cargo.cube} m³</p>
						</div>
					</div>

					<div
						className='
grid
grid-cols-3
gap-4
'
					>
						<div>
							<p
								className='
text-sm
text-muted-foreground
'
							>
								Length
							</p>

							<p>{cargo.length}</p>
						</div>

						<div>
							<p
								className='
text-sm
text-muted-foreground
'
							>
								Width
							</p>

							<p>{cargo.width}</p>
						</div>

						<div>
							<p
								className='
text-sm
text-muted-foreground
'
							>
								Height
							</p>

							<p>{cargo.height}</p>
						</div>
					</div>

					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Method Used
						</p>

						<p>{cargo.method}</p>
					</div>

					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Final Price
						</p>

						<p
							className='
text-2xl
font-bold
'
						>
							${cargo.finalPrice}
						</p>
					</div>

					<div>
						<p
							className='
text-sm
text-muted-foreground
'
						>
							Status
						</p>

						<p>{cargo.status}</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
