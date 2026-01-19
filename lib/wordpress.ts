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
 * Fetches the home page data (ID 7) from the custom Gutenberg API.
 */
export async function getHomeData(): Promise<HomeData | null> {
  try {
    const data = await fetchFromRest("/gutenberg-api/v1/pages/inicio");
    return data || null;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}

/**
 * Fetches the header data from the custom Gutenberg API.
 */
export async function getHeaderData(): Promise<HeaderData | null> {
  try {
    const data = await fetchFromRest("/gutenberg-api/v1/header");
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
  try {
    const data = await fetchFromRest("/gutenberg-api/v1/pages/quienes-somos");
    return data || null;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}
