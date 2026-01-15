"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";
import ProductsMenu, { products } from "./ProductsMenu";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "QUIÉNES SOMOS", href: "/quienes-somos" },
        { name: "PRODUCTOS", href: "#products" },
        { name: "BLOG", href: "/blog" },
        { name: "CONTACTO", href: "/contacto" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/segurologo.svg"
                        alt="Seguro Seguros Logo"
                        width={120}
                        height={120}
                        className="w-32 md:w-48 lg:w-60 h-auto"
                    />

                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        link.name === "PRODUCTOS" ? (
                            <button
                                key={link.name}
                                onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                                className={`text-sm font-medium transition-colors tracking-wide ${isProductsMenuOpen ? "text-primary" : "text-white/90 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/90 hover:text-primary transition-colors tracking-wide"
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </nav>

                {/* Socials & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4 border-l border-white/20 pl-4">
                        <a href="#" className="text-white hover:text-primary transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
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
                onClose={() => setIsProductsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 py-6 px-6 flex flex-col gap-6 h-screen overflow-y-auto pb-20">
                    {navLinks.map((link) => (
                        link.name === "PRODUCTOS" ? (
                            <div key={link.name} className="flex flex-col gap-4">
                                <button
                                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                                    className="text-lg font-medium text-white hover:text-primary flex items-center justify-between"
                                >
                                    {link.name}
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isMobileProductsOpen && (
                                    <div className="flex flex-col gap-4 pl-4 border-l border-white/10 ml-2">
                                        {products.map((product) => (
                                            <Link
                                                key={product.title}
                                                href={product.href}
                                                className="text-[15px] font-medium text-white/70 hover:text-primary"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {product.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-white hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                    <div className="flex gap-6 mt-4">
                        <a href="#" className="text-white hover:text-primary">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="text-white hover:text-primary">
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
