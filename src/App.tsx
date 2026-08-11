import { Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "@/components/SiteShell";
import Home from "@/pages/Home";
import Nosotros from "@/pages/Nosotros";
import Servicios from "@/pages/Servicios";
import ServicioDetalle from "@/pages/ServicioDetalle";
import Equipo from "@/pages/Equipo";
import Cursos from "@/pages/Cursos";
import Blog from "@/pages/Blog";
import Contacto from "@/pages/Contacto";

export default function App() {
  return (
    <SiteShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/:slug" element={<ServicioDetalle />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteShell>
  );
}
