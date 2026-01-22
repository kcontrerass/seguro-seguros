"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FooterData } from "@/lib/wordpress";
import { useMenu } from "../../context/MenuContext";

interface FooterProps {
    data: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
    const logoUrl = data?.logo.url || "/logo.svg";
    const logoAlt = data?.logo.alt || "Seguro Seguros Logo";

    const siteName = data?.site_info.name || "SESE Corredores de Segurossss";
    const siteDescription = data?.site_info.description || "Registro CS-218<br>Supervisado por la Superintendencia de Bancos de Guatemalaaaa";

    const copyrightText = data?.copyright.text || `© ${new Date().getFullYear()} Todos los derechos reservados a Seguros Seguros.`;

    const menuItems = data?.menu.items || [];

    // Filter out contact info for the navigation column
    const navLinks = menuItems.filter(item =>
        !item.url.startsWith("tel:") &&
        !item.url.startsWith("mailto:") &&
        !item.slug.includes("via-4")
    );

    // If navigation column is empty, use defaults
    const finalNavLinks = navLinks.length > 0 ? navLinks : [
        { title: "Inicio", url: "/" },
        { title: "Quiénes Somos", url: "#about" },
        { title: "Productos", url: "#products" },
        { title: "Blog", url: "#blog" },
        { title: "Respaldo", url: "#" },
        { title: "Contacto", url: "#contact" },
    ];

    // Helper to extract contact info from blocks
    const extractFromBlocks = (blocks: any[]) => {
        let phone = "";
        let email = "";
        let addressLines: string[] = [];

        const traverse = (items: any[]) => {
            for (const item of items) {
                if (item.type === "core/paragraph" && item.content) {
                    const content = item.content.replace(/<[^>]*>/g, "").trim();
                    if (!content) continue;

                    if (content.includes("@") && content.includes(".")) {
                        email = content;
                    } else if (content.match(/\+?\d{3,}\s?\d{3,}\s?\d{3,}/)) {
                        phone = content;
                    } else if (content.includes("Via 4") || content.includes("Edificio TEC") || content.includes("Ciudad Guatemala") || content.includes("zona 4")) {
                        addressLines.push(item.content); // Keep HTML for address if it has <br>
                    }
                }
                if (item.children) traverse(item.children);
            }
        };

        traverse(blocks);
        return { phone, email, address: addressLines.join("<br>") };
    };

    const blockContact = extractFromBlocks(data?.content?.blocks || []);

    const contactLinks = {
        phone: menuItems.find(item => item.url.startsWith("tel:"))?.title || blockContact.phone || "+502 4811 9511",
        phoneUrl: menuItems.find(item => item.url.startsWith("tel:"))?.url || `tel:${blockContact.phone.replace(/\s+/g, "")}`,
        address: menuItems.find(item => item.slug.includes("via-4"))?.title || blockContact.address || "Via 4 1-00 zona 4 Campus Tecnológico, Edificio TEC II, Nivel 5 Oficina 504, Ciudad Guatemala",
        email: menuItems.find(item => item.url.startsWith("mailto:"))?.title || blockContact.email || "info@sesecorredores.com",
        emailUrl: menuItems.find(item => item.url.startsWith("mailto:"))?.url || `mailto:${blockContact.email}`
    };

    return (
        <footer className="bg-black text-white pt-20 pb-20 border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand & Legal */}
                <div className="space-y-6">
                    <div>
                        <Image
                            src={logoUrl}
                            alt={logoAlt}
                            width={120}
                            height={120}
                            className="w-40 h-auto mb-4"
                        />
                    </div>

                    <div className="space-y-2 text-sm text-gray-300">
                        <p className="font-semibold">{siteName}</p>
                        <div
                            className="max-w-xs"
                            dangerouslySetInnerHTML={{ __html: siteDescription }}
                        />
                    </div>

                    <div className="pt-8">
                        <p className="text-xs text-gray-500">
                            {copyrightText}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="md:pl-20 pt-4">
                    <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Navegación</h4>
                    <ul className="space-y-4">
                        {finalNavLinks.map((link, index) => {
                            const linkTitle = (link as any).title || (link as any).name || "";
                            const linkUrl = (link as any).url || (link as any).href || "#";
                            const isProducts = typeof linkTitle === 'string' && linkTitle.toLowerCase().includes("producto");

                            const { toggleProductsMenu } = useMenu();

                            return (
                                <li key={index}>
                                    {isProducts ? (
                                        <button
                                            onClick={toggleProductsMenu}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm text-left w-full"
                                        >
                                            {linkTitle}
                                        </button>
                                    ) : (
                                        <Link
                                            href={linkUrl}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm"
                                        >
                                            {linkTitle}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="pt-4">
                    <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Contacto</h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <a href={contactLinks.phoneUrl} className="hover:text-primary transition-colors">
                                {contactLinks.phone}
                            </a>
                        </li>
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span dangerouslySetInnerHTML={{ __html: contactLinks.address }} />
                        </li>
                        <li className="flex items-start gap-4 text-sm text-gray-300">
                            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <a href={contactLinks.emailUrl} className="hover:text-primary transition-colors">
                                {contactLinks.email}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
