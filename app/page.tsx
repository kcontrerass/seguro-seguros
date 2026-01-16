import { getHomeData } from "@/lib/wordpress";
import Hero from "./components/home/Hero";
import ServicesGrid from "./components/home/ServicesGrid";
import Testimonials from "./components/home/Testimonials";
import Partners from "./components/home/Partners";
import ContactCTA from "./components/home/ContactCTA";

export default async function Home() {
  const data = await getHomeData();
  const sections = data?.gutenberg_structure || [];

  // Seccion Introducción
  const introData = sections.find((s: any) => s.attributes?.metadata?.name === "Seccion Introducción");
  // Seccion Nuestros Productos
  const productsData = sections.find((s: any) => s.attributes?.metadata?.name === "Seccion Nuestros Productos");
  // Seccion Nuestros Clientes
  const testimonialsData = sections.find((s: any) => s.attributes?.metadata?.name === "Seccion Nuestros Clientes");
  // Seccion Aseguradoras
  const partnersData = sections.find((s: any) => s.attributes?.metadata?.name === "Seccion Aseguradoras");
  // Seccion Contactanos
  const contactData = sections.find((s: any) => s.attributes?.metadata?.name === "Seccion Contactanos");

  return (
    <main className="min-h-screen bg-black">
      <Hero data={introData} />
      <ServicesGrid data={productsData} />
      <Testimonials data={testimonialsData} />
      <Partners data={partnersData} />
      <ContactCTA data={contactData} />
    </main>
  );
}
