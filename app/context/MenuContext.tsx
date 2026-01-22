"use client";

import React, { createContext, useContext, useState } from "react";

interface MenuContextType {
    isProductsMenuOpen: boolean;
    openProductsMenu: () => void;
    closeProductsMenu: () => void;
    toggleProductsMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

    const openProductsMenu = () => setIsProductsMenuOpen(true);
    const closeProductsMenu = () => setIsProductsMenuOpen(false);
    const toggleProductsMenu = () => setIsProductsMenuOpen(prev => !prev);

    return (
        <MenuContext.Provider value={{
            isProductsMenuOpen,
            openProductsMenu,
            closeProductsMenu,
            toggleProductsMenu
        }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
}
