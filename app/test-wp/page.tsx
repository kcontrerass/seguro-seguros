import { getAllPosts, getAllPages, getMenu, getFooterData } from '@/lib/wordpress';

export default async function TestWPPage() {
    let posts, pages, primaryMenu, footerMenu;
    let error = null;

    try {
        posts = await getAllPosts();
        pages = await getAllPages();
        // Assuming 'Primary' is the name of the main menu
        primaryMenu = await getMenu('Primary');
        footerMenu = await getFooterData();
    } catch (e: any) {
        console.error("Failed to fetch WP data:", e);
        error = e.message;
    }

    return (
        <div className="p-10 font-mono text-sm space-y-8 text-black bg-white">
            <h1 className="text-2xl font-bold">WPGraphQL Connection Test</h1>

            {error && (
                <div className="bg-red-100 p-4 border border-red-400 text-red-700">
                    <h2 className="font-bold">Error:</h2>
                    <pre>{error}</pre>
                    <p className="mt-2">Make sure NEXT_PUBLIC_WORDPRESS_API_URL is set in .env.local and valid.</p>
                </div>
            )}

            <section>
                <h2 className="text-xl font-bold border-b mb-4">Posts ({posts?.length || 0})</h2>
                <pre className="bg-gray-100 p-4 overflow-auto max-h-60">
                    {JSON.stringify(posts, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-bold border-b mb-4">Pages ({pages?.length || 0})</h2>
                <pre className="bg-gray-100 p-4 overflow-auto max-h-60">
                    {JSON.stringify(pages, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-bold border-b mb-4">Primary Menu</h2>
                <pre className="bg-gray-100 p-4 overflow-auto max-h-60">
                    {JSON.stringify(primaryMenu, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-bold border-b mb-4">Footer Data</h2>
                <pre className="bg-gray-100 p-4 overflow-auto max-h-60">
                    {JSON.stringify(footerMenu, null, 2)}
                </pre>
            </section>
        </div>
    );
}
