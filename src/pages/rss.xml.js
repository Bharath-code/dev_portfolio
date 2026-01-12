import rss from '@astrojs/rss';
import { siteContent } from '@/content/site-content';

export async function GET(context) {
    return rss({
        title: 'Bharathkumar Palanisamy | Blog',
        description: 'Software Architecture, TUI, and Full Stack Development',
        site: context.site,
        items: [], // Since we currently fetch from Dev.to/Medium, we can link to those profiles or leave empty for now
        customData: `<language>en-us</language>`,
    });
}
