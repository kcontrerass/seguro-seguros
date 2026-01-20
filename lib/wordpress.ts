// lib/wordpress.ts

const BASE_URL = "https://segurosegurosbe.aumenta.do/wp-json";

// --- Types ---



export interface HomeData {
  id: number;
  title: string;
  slug: string;
  gutenberg_structure: any[];
  sections: any[];
}

export interface PageData {
  id: number;
  title: string;
  slug: string;
  gutenberg_structure: any[];
  sections: any[];
  content?: string;
}

export interface HeaderData {
  site_info: {
    name: string;
    description: string;
    url: string;
    admin_email: string;
  };
  logo: {
    has_logo: boolean;
    url: string;
    alt: string;
  };
  social_networks: {
    networks: {
      platform: string;
      url: string;
      image: string;
      image_alt: string;
      icon: string;
    }[];
  };
  menu: {
    items: MenuItem[];
  };
}

export interface MenuItem {
  id: number | string;
  title: string;
  url: string;
  slug: string;
  target: string;
  children: MenuItem[];
  featured_image?: {
    url: string;
    alt: string;
  } | null;
}

export interface FooterData {
  site_info: {
    name: string;
    description: string;
    url: string;
    year: string;
  };
  logo: {
    has_logo: boolean;
    url: string;
    alt: string;
  };
  copyright: {
    text: string;
  };
  menu: {
    items: MenuItem[];
  };
  content?: {
    blocks: any[];
  } | null;
}

// --- Helpers ---

const PRODUCT_SLUGS = ["vida-y-salud", "diversos", "especializados", "patrimoniales"];

/**
 * Fixes a URL to include the /productos/ prefix if it refers to a product page.
 */
function fixUrl(url: string, slug?: string): string {
  if (!url) return url;

  // If we have a known product slug
  if (slug && PRODUCT_SLUGS.includes(slug)) {
    if (!url.startsWith("/productos/")) {
      // If it's a relative URL from WP (like /vida-y-salud/) or absolute from same domain
      const parsedUrl = url.replace("https://segurosegurosbe.aumenta.do", "");
      if (parsedUrl.startsWith("/") && parsedUrl.includes(slug)) {
        return `/productos/${slug}`;
      }
    }
  }

  // Fallback check: if the URL itself contains one of the product slugs and doesn't have /productos/
  for (const productSlug of PRODUCT_SLUGS) {
    if (url.includes(`/${productSlug}`) && !url.includes(`/productos/${productSlug}`)) {
      // Check if it's an internal-ish link
      if (url.startsWith("/") || url.includes("segurosegurosbe.aumenta.do")) {
        return `/productos/${productSlug}`;
      }
    }
  }

  return url;
}

/**
 * Recursively fixes URLs in menu items.
 */
function fixMenuItems(items: MenuItem[]): MenuItem[] {
  return items.map(item => ({
    ...item,
    url: fixUrl(item.url, item.slug),
    children: item.children ? fixMenuItems(item.children) : []
  }));
}

/**
 * Recursively fixes URLs in Gutenberg structure (useful for buttons/links in blocks).
 */
function fixGutenbergLinks(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(fixGutenbergLinks);
  }

  const newObj = { ...obj };

  for (const key in newObj) {
    if (key === "url" && typeof newObj[key] === "string") {
      newObj[key] = fixUrl(newObj[key]);
    } else {
      newObj[key] = fixGutenbergLinks(newObj[key]);
    }
  }

  return newObj;
}

// --- Fetch Functions ---

async function fetchFromRest(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: { revalidate: 60 } // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from WordPress REST API: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Generic function to fetch page data by slug.
 */
export async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const data = await fetchFromRest(`/gutenberg-api/v1/pages/${slug}`);
    if (data && data.gutenberg_structure) {
      data.gutenberg_structure = fixGutenbergLinks(data.gutenberg_structure);
    }
    return data || null;
  } catch (error) {
    console.error(`Error fetching page data for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Fetches the home page data (ID 7) from the custom Gutenberg API.
 */
export async function getHomeData(): Promise<HomeData | null> {
  return (await getPageData("inicio")) as HomeData | null;
}

/**
 * Fetches the header data from the custom Gutenberg API.
 */
export async function getHeaderData(): Promise<HeaderData | null> {
  try {
    const data = await fetchFromRest("/gutenberg-api/v1/header");
    if (data && data.menu && data.menu.items) {
      data.menu.items = fixMenuItems(data.menu.items);
    }
    return data || null;
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}

/**
 * Fetches the footer data from the custom Gutenberg API.
 */
export async function getFooterData(): Promise<FooterData | null> {
  try {
    const data = await fetchFromRest("/gutenberg-api/v1/footer");
    if (data && data.menu && data.menu.items) {
      data.menu.items = fixMenuItems(data.menu.items);
    }
    return data || null;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

/**
 * Fetches the "Quienes Somos" page data from the custom Gutenberg API.
 */
export async function getAboutData(): Promise<PageData | null> {
  return getPageData("quienes-somos");
}
