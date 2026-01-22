/**
 * GitHub API Helper
 * Centralized functions for fetching data from GitHub GraphQL API
 */

const GITHUB_USERNAME = "Bharath-code";

interface ContributionDay {
    date: string;
    contributionCount: number;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionStats {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface Repository {
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: { name: string; color: string } | null;
    updatedAt: string;
}

interface PinnedRepo extends Repository {
    // Same structure as Repository
}

interface LanguageEdge {
    size: number;
    node: {
        name: string;
        color: string;
    };
}

interface UserStats {
    totalStars: number;
    totalRepos: number;
    followers: number;
    following: number;
}

async function fetchGraphQL<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
    const token = import.meta.env.GITHUB_TOKEN;
    if (!token) {
        console.warn("GITHUB_TOKEN not set");
        return null;
    }

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Could not read error response");
            console.error(`GitHub API HTTP error: ${response.status} ${response.statusText}`);
            console.error(`Response body snippet: ${errorText.substring(0, 500)}...`);
            return null;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorText = await response.text().catch(() => "Could not read error response");
            console.error(`GitHub API returned non-JSON response: ${contentType}`);
            console.error(`Response body snippet: ${errorText.substring(0, 200)}...`);
            return null;
        }

        const data = await response.json();
        if (data.errors) {
            console.error("GitHub API errors:", data.errors);
            return null;
        }
        return data.data;
    } catch (error) {
        console.error("GitHub API fetch failed:", error);
        return null;
    }
}

export async function fetchContributionStats(): Promise<ContributionStats | null> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                color
                            }
                        }
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<{ user: { contributionsCollection: { contributionCalendar: ContributionStats } } }>(
        query,
        { username: GITHUB_USERNAME }
    );

    return data?.user?.contributionsCollection?.contributionCalendar || null;
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            name
                            description
                            url
                            stargazerCount
                            forkCount
                            primaryLanguage {
                                name
                                color
                            }
                            updatedAt
                        }
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<{ user: { pinnedItems: { nodes: PinnedRepo[] } } }>(
        query,
        { username: GITHUB_USERNAME }
    );

    return data?.user?.pinnedItems?.nodes || [];
}

export interface RepoStats {
    name: string;
    stargazerCount: number;
    forkCount: number;
    updatedAt: string;
}

export async function fetchRepoStatsByUrls(urls: string[]): Promise<Map<string, RepoStats>> {
    const repoMap = new Map<string, RepoStats>();

    // Extract repo names from GitHub URLs
    const repoNames = urls
        .filter(url => url.includes('github.com'))
        .map(url => {
            const match = url.match(/github\.com\/[^/]+\/([^/]+)/);
            return match ? match[1].replace(/\.git$/, '') : null;
        })
        .filter(Boolean) as string[];

    if (repoNames.length === 0) return repoMap;

    // Build dynamic query for multiple repos
    const repoQueries = repoNames.map((name, i) => `
        repo${i}: repository(owner: "${GITHUB_USERNAME}", name: "${name}") {
            name
            stargazerCount
            forkCount
            updatedAt
        }
    `).join('\n');

    const query = `query { ${repoQueries} }`;

    const data = await fetchGraphQL<Record<string, RepoStats | null>>(query);

    if (data) {
        for (const [key, repo] of Object.entries(data)) {
            if (repo) {
                repoMap.set(repo.name.toLowerCase(), repo);
            }
        }
    }

    return repoMap;
}

export async function fetchTopRepositories(count: number = 10): Promise<Repository[]> {
    const query = `
        query($username: String!, $count: Int!) {
            user(login: $username) {
                repositories(first: $count, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
                    nodes {
                        name
                        description
                        url
                        stargazerCount
                        forkCount
                        primaryLanguage {
                            name
                            color
                        }
                        updatedAt
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<{ user: { repositories: { nodes: Repository[] } } }>(
        query,
        { username: GITHUB_USERNAME, count }
    );

    return data?.user?.repositories?.nodes || [];
}

export async function fetchLanguageDistribution(): Promise<{ name: string; color: string; percentage: number }[]> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                repositories(first: 100, privacy: PUBLIC, isFork: false) {
                    nodes {
                        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                            edges {
                                size
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const data = await fetchGraphQL<{ user: { repositories: { nodes: { languages: { edges: LanguageEdge[] } }[] } } }>(
        query,
        { username: GITHUB_USERNAME }
    );

    if (!data?.user?.repositories?.nodes) return [];

    // Aggregate language sizes
    const languageTotals: Record<string, { size: number; color: string }> = {};

    for (const repo of data.user.repositories.nodes) {
        for (const edge of repo.languages?.edges || []) {
            const name = edge.node.name;
            if (!languageTotals[name]) {
                languageTotals[name] = { size: 0, color: edge.node.color };
            }
            languageTotals[name].size += edge.size;
        }
    }

    // Calculate percentages
    const totalSize = Object.values(languageTotals).reduce((sum, lang) => sum + lang.size, 0);

    return Object.entries(languageTotals)
        .map(([name, { size, color }]) => ({
            name,
            color: color || "#ccc",
            percentage: Math.round((size / totalSize) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 8); // Top 8 languages
}

export async function fetchUserStats(): Promise<UserStats | null> {
    const query = `
        query($username: String!) {
            user(login: $username) {
                repositories(first: 100, privacy: PUBLIC) {
                    totalCount
                    nodes {
                        stargazerCount
                    }
                }
                followers {
                    totalCount
                }
                following {
                    totalCount
                }
            }
        }
    `;

    const data = await fetchGraphQL<{
        user: {
            repositories: { totalCount: number; nodes: { stargazerCount: number }[] };
            followers: { totalCount: number };
            following: { totalCount: number };
        }
    }>(query, { username: GITHUB_USERNAME });

    if (!data?.user) return null;

    const totalStars = data.user.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0);

    return {
        totalStars,
        totalRepos: data.user.repositories.totalCount,
        followers: data.user.followers.totalCount,
        following: data.user.following.totalCount,
    };
}

// Calculate contribution streaks
export function calculateStreaks(weeks: ContributionWeek[]): { current: number; longest: number } {
    // Flatten and sort days chronologically (oldest to newest)
    const allDays = weeks
        .flatMap(w => w.contributionDays)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (allDays.length === 0) {
        return { current: 0, longest: 0 };
    }

    let longest = 0;
    let tempStreak = 0;

    // Calculate longest streak (iterate forward through all days)
    for (const day of allDays) {
        if (day.contributionCount > 0) {
            tempStreak++;
            longest = Math.max(longest, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    // Calculate current streak (iterate backwards from most recent day)
    let current = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = allDays.length - 1; i >= 0; i--) {
        const day = allDays[i];
        const dayDate = new Date(day.date);
        dayDate.setHours(0, 0, 0, 0);

        // Skip future days (shouldn't exist, but safety check)
        if (dayDate > today) continue;

        // If it's today or yesterday and has contributions, or continues a streak
        if (day.contributionCount > 0) {
            current++;
        } else {
            // Check if this zero-day is today - if so, streak could still be valid from yesterday
            const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 0) {
                // Today has 0 contributions, but we haven't broken the streak yet
                // Continue to check if yesterday had contributions
                continue;
            }
            // We hit a zero that's not today - streak is broken
            break;
        }
    }

    return { current, longest };
}

export const GITHUB_USERNAME_EXPORT = GITHUB_USERNAME;
