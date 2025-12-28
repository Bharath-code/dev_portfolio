import Parser from 'rss-parser';

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    url: string;
    platform: 'Dev.to' | 'Medium';
    image?: string;
}

export async function getLatestPosts(config: { devto?: string; medium?: string }, limit = 10): Promise<BlogPost[]> {
    const posts: BlogPost[] = [];

    // Fetch Dev.to posts
    if (config.devto) {
        try {
            const devtoRes = await fetch(`https://dev.to/api/articles?username=${config.devto}`);
            if (devtoRes.ok) {
                const devtoData = await devtoRes.json();
                const devtoPosts = devtoData.slice(0, limit).map((post: any) => ({
                    title: post.title,
                    description: post.description,
                    date: new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    url: post.url,
                    platform: 'Dev.to' as const,
                    image: post.cover_image || post.social_image
                }));
                posts.push(...devtoPosts);
            }
        } catch (e) {
            console.error('Failed to fetch Dev.to posts', e);
        }
    }

    // Fetch Medium posts
    if (config.medium) {
        try {
            // Remove '@' if present for feed URL
            const username = config.medium.replace('@', '');
            const parser = new Parser();
            const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);

            const mediumPosts = feed.items.slice(0, limit).map((item: any) => {
                // Medium RSS content often has the image in the content:encoded or separate.
                // We'll simplisticly try to find an image in content, or use a default.
                // For now, let's skip complex parsing and just map basic data.
                // A regex could extract the first image src from item['content:encoded']
                const imgMatch = item['content:encoded']?.match(/src="([^"]+)"/);

                return {
                    title: item.title,
                    description: item.contentSnippet?.substring(0, 150) + '...', // RSS snippet is often short or missing, fallback needed
                    date: new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    url: item.link,
                    platform: 'Medium' as const,
                    image: imgMatch ? imgMatch[1] : undefined
                };
            });
            posts.push(...mediumPosts);
        } catch (e) {
            console.error('Failed to fetch Medium posts', e);
        }
    }

    // Sort by date (newest first) - Need to re-parse date string back to object for sorting accurately, 
    // or better yet, keep date object then format later.
    // For simplicity in this step, let's just reverse sort by new Date(date).
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}
