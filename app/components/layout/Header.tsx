"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";
import ProductsMenu from "./ProductsMenu";
import { HeaderData, MenuItem } from "@/lib/wordpress";
import { useMenu } from "../../context/MenuContext";

interface HeaderProps {
    data: HeaderData | null;
}

export default function Header({ data }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isProductsMenuOpen, toggleProductsMenu, closeProductsMenu } = useMenu();
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const defaultLinks = [
        { name: "HOME", href: "/" },
        { name: "QUIÉNES SOMOS", href: "/quienes-somos" },
        { name: "PRODUCTOS", href: "#products" },
        { name: "BLOG", href: "/blog" },
        { name: "CONTACTO", href: "/contacto" },
    ];

    const apiItems = data?.menu.items || [];

    // Find the products item and its children
    const productsItem = apiItems.find(item =>
        item.title.toUpperCase() === "PRODUCTOS" ||
        item.slug === "productos" ||
        item.url.includes("productos")
    );
    const productSubItems = productsItem?.children || [];

    const navLinks = apiItems.length > 0
        ? apiItems.map(item => ({
            name: item.title.toUpperCase(),
            href: item.url,
            hasChildren: item.children.length > 0
        }))
        : defaultLinks.map(link => ({ ...link, hasChildren: false }));

    const logoUrl = data?.logo.url || "/segurologo.svg";
    const logoAlt = data?.logo.alt || "Seguro Seguros Logo";
    const socialNetworks = data?.social_networks.networks || [];

    const isLinkActive = (href: string, name?: string) => {
        if (!href) return false;

        // Products logic: active if it's the products menu or if we're in a /productos/ path
        if (name === "PRODUCTOS" || href.includes("productos") || href === "#products") {
            return pathname.startsWith("/productos");
        }

        // Normalize for comparison
        const normPath = pathname.replace(/\/$/, "") || "/";
        const normHref = href.replace("https://segurosegurosbe.aumenta.do", "").replace(/\/$/, "") || "/";

        return normPath === normHref;
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={logoUrl}
                        alt={logoAlt}
                        width={120}
                        height={120}
                        className="w-32 md:w-48 lg:w-60 h-auto"
                    />

                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        link.name === "PRODUCTOS" || link.hasChildren ? (
                            <button
                                key={link.name}
                                onClick={toggleProductsMenu}
                                className={`text-sm font-medium transition-colors tracking-wide ${isProductsMenuOpen || isLinkActive(link.href, link.name) ? "text-gold-gradient" : "text-white/90 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors tracking-wide ${isLinkActive(link.href) ? "text-gold-gradient" : "text-white/90 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </nav>

                {/* Socials & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4 border-l border-white/20 pl-4">
                        {socialNetworks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary transition-colors"
                                title={social.image_alt}
                            >
                                {social.image ? (
                                    <Image
                                        src={social.image}
                                        alt={social.image_alt}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5 filter brightness-0 invert"
                                    />
                                ) : (
                                    social.platform.toLowerCase() === "facebook" ? <Facebook size={20} /> :
                                        social.platform.toLowerCase() === "instagram" ? <Instagram size={20} /> : null
                                )}
                            </a>
                        ))}
                    </div>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Products Mega Menu */}
            <ProductsMenu
                isOpen={isProductsMenuOpen}
                onClose={closeProductsMenu}
                items={productSubItems}
            />

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 py-6 px-6 flex flex-col gap-6 h-screen overflow-y-auto pb-20">
                    {navLinks.map((link) => (
                        link.name === "PRODUCTOS" || link.hasChildren ? (
                            <div key={link.name} className="flex flex-col gap-4">
                                <button
                                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                    className={`text-lg font-medium hover:text-primary flex items-center justify-between ${isLinkActive(link.href, link.name) ? "text-gold-gradient" : "text-white"}`}
                                >
                                    {link.name}
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isMobileProductsOpen && (
                                    <div className="flex flex-col gap-4 pl-4 border-l border-white/10 ml-2">
                                        {productSubItems.map((subItem) => (
                                            <Link
                                                key={subItem.id}
                                                href={subItem.url}
                                                className="text-[15px] font-medium text-white/70 hover:text-primary"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-lg font-medium hover:text-primary ${isLinkActive(link.href) ? "text-gold-gradient" : "text-white"}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <div className="flex gap-6 mt-4">
                        {socialNetworks.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-primary"
                                title={social.image_alt}
                            >
                                {social.image ? (
                                    <Image
                                        src={social.image}
                                        alt={social.image_alt}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 filter brightness-0 invert"
                                    />
                                ) : (
                                    social.platform.toLowerCase() === "facebook" ? <Facebook size={24} /> :
                                        social.platform.toLowerCase() === "instagram" ? <Instagram size={24} /> : null
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
