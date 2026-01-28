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
    const logoAlt = data?.logo.alt || "Seguro Seguros Logo";

    const siteName = data?.site_info.name || "SESE Corredores de Seguros";

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

    // Helper to extract info from the provided Gutenberg JSON structure
    const extractFromBlocks = (blocks: any[]) => {
        let phone = "";
        let email = "";
        let addressLines: string[] = [];
        let legalLines: string[] = [];
        let extractedLogoUrl = "";
        let powerBy = { text: "", logo: "" };

        // The structure provided is: core/group -> children [core/columns (main), core/columns (power by)]
        const mainGroup = blocks.find(b => b.type === "core/group");
        const children = mainGroup?.children || [];

        // 1. Process Main Columns (Navigation, Brand, Contact)
        const mainColumns = children.find((b: any) => b.type === "core/columns");
        if (mainColumns?.children) {
            // Column 0: Brand & Legal
            const brandCol = mainColumns.children[0];
            brandCol.children?.forEach((b: any) => {
                if (b.type === "core/image") extractedLogoUrl = b.image?.url;
                if (b.type === "core/paragraph" && b.content) legalLines.push(b.content);
            });

            // Column 2 (usually): Contact Info (in the 50% width column)
            // But let's traverse all to be safe for contact info (Phone, Address, Email)
            mainColumns.children.forEach((col: any) => {
                col.children?.forEach((b: any) => {
                    if (b.type === "core/group") {
                        // Check for contact details inside groups
                        b.children?.forEach((subB: any) => {
                            if (subB.type === "core/paragraph" && subB.content) {
                                const content = subB.content.replace(/<[^>]*>/g, "").trim();
                                if (content.includes("@")) email = content;
                                else if (content.match(/\+?\d{3,}/)) phone = content;
                                else if (content.includes("Via 4") || content.includes("Edificio TEC") || content.includes("Guatemala")) addressLines.push(subB.content);
                            }
                        });
                    }
                });
            });
        }

        // 2. Process Power By Columns
        const powerColumns = children.find((b: any, i: number) => b.type === "core/columns" && i > 0);
        if (powerColumns?.children?.length >= 2) {
            const textCol = powerColumns.children[0];
            const logoCol = powerColumns.children[1];
            powerBy.text = textCol.children?.find((b: any) => b.type === "core/paragraph")?.content || "";
            powerBy.logo = logoCol.children?.find((b: any) => b.type === "core/image")?.image?.url || "";
        }

        return { phone, email, address: addressLines.join("<br>"), legalLines, extractedLogoUrl, powerBy };
    };

    const blockData = extractFromBlocks(data?.content?.blocks || []);

    const logoUrl = blockData.extractedLogoUrl || data?.logo.url || "https://segurosegurosbe.aumenta.do/wp-content/uploads/2026/01/Frame-6.svg";

    const siteDescription = blockData.legalLines.length > 0 ? blockData.legalLines : [
        "Registro CS-218",
        "Supervisado por la Superintendencia de Bancos de Guatemala"
    ];

    const contactLinks = {
        phone: menuItems.find(item => item.url.startsWith("tel:"))?.title || blockData.phone || "+502 4811 9511",
        phoneUrl: menuItems.find(item => item.url.startsWith("tel:"))?.url || `tel:${blockData.phone.replace(/\s+/g, "")}`,
        address: menuItems.find(item => item.slug.includes("via-4"))?.title || blockData.address || "Via 4 1-00 zona 4 Campus Tecnológico, Edificio TEC II, Nivel 5 Oficina 504, Ciudad Guatemala",
        email: menuItems.find(item => item.url.startsWith("mailto:"))?.title || blockData.email || "info@sesecorredores.com",
        emailUrl: menuItems.find(item => item.url.startsWith("mailto:"))?.url || `mailto:${blockData.email}`
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
                        <div className="max-w-xs space-y-1">
                            {siteDescription.map((line, i) => (
                                <p key={i} className="w-[250px]">{line}</p>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8">
                        <p className=" text-sm text-gray-300">
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

            {/* Power By */}
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span>{blockData.powerBy.text || "powered by"}</span>
                    <a href="https://aumenta.do" target="_blank" rel="noopener noreferrer">
                        <Image
                            src={blockData.powerBy.logo || "https://segurosegurosbe.aumenta.do/wp-content/uploads/2026/01/Imagen-17@2x-2.png"}
                            alt="Aumenta Logo"
                            width={100}
                            height={24}
                            className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                        />
                    </a>

                </div>
            </div>
        </footer>
    );
}
