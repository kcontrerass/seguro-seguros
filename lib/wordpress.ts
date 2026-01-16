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

// Placeholder for other functions that were GraphQL-based
// We should implement them as needed if other pages also shift to REST.

export async function getAllPosts(): Promise<any[]> {
  // TODO: Implement REST version if needed
  return [];
}

export async function getAllPages(): Promise<any[]> {
  // TODO: Implement REST version if needed
  return [];
}

export async function getMenu(menuName: string): Promise<any[]> {
  // TODO: Implement REST version if needed
  return [];
}

export async function getFooterData(): Promise<any[]> {
  return [];
}
