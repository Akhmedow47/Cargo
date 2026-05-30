'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'

export default function DriverMap() {
	return (
		<div
			className='
h-87.5
overflow-hidden
rounded-xl
border
relative
z-10
'
		>
			<MapContainer
				center={[38.5598, 68.787] as const}
				zoom={6}
				className='
h-full
w-full
'
			>
				<TileLayer
					url='
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
'
				/>

				<Marker position={[38.5598, 68.787] as const} />
			</MapContainer>
		</div>
	)
}
