import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

export const client = new GraphQLClient(API_URL);

// --- Types ---

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  parentId?: string;
  childItems?: {
    nodes: MenuItem[];
  };
}

// --- Queries ---

const TASKS_QUERY = `
  query GetPosts {
    posts(first: 20) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const PAGES_QUERY = `
  query GetPages {
    pages(first: 20) {
      nodes {
        id
        title
        slug
        content
      }
    }
  }
`;

const MENU_QUERY = `
  query GetMenu($id: ID!, $idType: MenuNodeIdTypeEnum!) {
    menu(id: $id, idType: $idType) {
      menuItems(first: 100) {
        nodes {
          id
          label
          path
          parentId
          childItems {
            nodes {
              id
              label
              path
            }
          }
        }
      }
    }
  }
`;

// --- Fetch Functions ---

export async function getAllPosts(): Promise<Post[]> {
  const data: any = await client.request(TASKS_QUERY);
  return data?.posts?.nodes || [];
}

export async function getAllPages(): Promise<Page[]> {
  const data: any = await client.request(PAGES_QUERY);
  return data?.pages?.nodes || [];
}

export async function getMenu(menuName: string): Promise<MenuItem[]> {
  const variables = {
    id: menuName,
    idType: "NAME"
  };
  const data: any = await client.request(MENU_QUERY, variables);
  return data?.menu?.menuItems?.nodes || [];
}

// Assumes there's a menu named "Footer" or similar logic
export async function getFooterData(): Promise<MenuItem[]> {
  return getMenu('Footer');
}

// --- Home Page Query ---

export interface HomeData {
  tituloprincipal: string;
  bannerprincipal: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
}

const HOME_QUERY = `
  query GetHomePage {
  paginaDeInicios {
    nodes {
      inicio {
        tituloprincipal
        bannerprincipal {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
}
`;

export async function getHeroData(): Promise<HomeData | null> {
  const data: any = await client.request(HOME_QUERY);
  return data?.paginaDeInicios?.nodes?.[0]?.inicio || null;
}
