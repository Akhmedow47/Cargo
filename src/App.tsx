import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./components/AdminLayout"
import ChinaWarehouse from "./pages/ChinaWarehouse"
import TajikistanWarehouse from "./pages/TajikistanWarehouse"
import ClientHandover from "./pages/ClientHandover"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Главная обертка с сайдбаром */}
        <Route path="/" element={<AdminLayout />}>
          
          {/* Внутренние страницы, которые вставляются внутрь Outlet */}
          <Route index element={<ChinaWarehouse />} /> {/* Ссылка: / */}
          <Route path="tj" element={<TajikistanWarehouse />} /> {/* Ссылка: /tj */}
          <Route path="handover" element={<ClientHandover />} /> {/* Ссылка: /handover */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
