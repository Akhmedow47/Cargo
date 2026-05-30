// 1. Меняем Link на NavLink
import { PackageCheck, ScanBarcode, WarehouseIcon } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminLayout() {
	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				background: 'linear-gradient(135deg, #f5f7fa 0%, #f8fafc 100%)',
				fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
			}}
		>
			{/* СЛЕВА: Боковое меню */}
			<aside
				style={{
					width: '280px',
					background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
					padding: '32px 20px',
					boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
					display: 'flex',
					flexDirection: 'column',
					gap: '32px',
				}}
			>
				<div style={{ paddingLeft: '12px' }}>
					<div
						style={{
							fontSize: '20px',
							fontWeight: '700',
							background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							marginBottom: '6px',
						}}
					>
						LogiTrack
					</div>
					<div
						style={{
							fontSize: '12px',
							color: '#64748b',
							letterSpacing: '0.3px',
						}}
					>
						Warehouse Management
					</div>
				</div>

				<nav
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
					}}
				>
					{/* 2. Используем NavLink вместо Link */}
					<NavLink
						to='/'
						style={({ isActive }) => ({
							padding: '12px 20px',
							borderRadius: '12px',
							textDecoration: 'none',
							fontWeight: '500',
							fontSize: '14px',
							transition: 'all 0.2s ease',
							background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
							color: isActive ? '#38bdf8' : '#94a3b8',
							borderLeft: isActive
								? '3px solid #38bdf8'
								: '3px solid transparent',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						})}
					>
						<PackageCheck size={16} /> Склад Китай
					</NavLink>

					<NavLink
						to='/tj'
						style={({ isActive }) => ({
							padding: '12px 20px',
							borderRadius: '12px',
							textDecoration: 'none',
							fontWeight: '500',
							fontSize: '14px',
							transition: 'all 0.2s ease',
							background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
							color: isActive ? '#38bdf8' : '#94a3b8',
							borderLeft: isActive
								? '3px solid #38bdf8'
								: '3px solid transparent',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						})}
					>
						<WarehouseIcon size={16} /> Склад Таджикистан
					</NavLink>

					<NavLink
						to='/handover'
						style={({ isActive }) => ({
							padding: '12px 20px',
							borderRadius: '12px',
							textDecoration: 'none',
							fontWeight: '500',
							fontSize: '14px',
							transition: 'all 0.2s ease',
							background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
							color: isActive ? '#38bdf8' : '#94a3b8',
							borderLeft: isActive
								? '3px solid #38bdf8'
								: '3px solid transparent',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						})}
					>
						<ScanBarcode size={16} />
						Выдача клиентам
					</NavLink>
				</nav>

				<div
					style={{
						marginTop: 'auto',
						paddingTop: '24px',
						borderTop: '1px solid rgba(255,255,255,0.06)',
						fontSize: '11px',
						color: '#475569',
						textAlign: 'center',
					}}
				>
					<div>© 2026 LogiTrack</div>
					<div style={{ marginTop: '4px' }}>v2.0 · Express Cargo</div>
				</div>
			</aside>

			{/* СПРАВА: Сюда React Router будет автоматически подставлять выбранную страницу */}
			<main
				style={{
					flex: 1,
					padding: '32px 40px',
					overflowY: 'auto',
				}}
			>
				<Outlet />
			</main>
		</div>
	)
}
