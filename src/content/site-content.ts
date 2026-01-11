// Consolidated site content with full project data

export interface Metric {
    label: string;
    value: string;
}

export interface WalkthroughStep {
    label: string;
    summary: string;
    metricLabel: string;
    metricValue: string;
    code: string;
    language: string;
}

export interface Sandbox {
    title: string;
    description: string;
    src: string;
}

export interface Spotlight {
    headline: string;
    overview: string;
    roles: string[];
    highlights: string[];
    outcomes: Metric[];
    walkthrough: WalkthroughStep[];
    sandbox: Sandbox;
}

export interface Project {
    slug: string;
    title: string;
    badges: string[];
    description: string;
    metrics: Metric[];
    link: string;
    spotlight?: Spotlight;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Skill {
    title: string;
    description: string;
    tags: string[];
}

export interface ImpactHighlight {
    label: string;
    value: string;
    description: string;
}

export interface SiteContent {
    hero: {
        title: string;
        subtitle: string;
        bio: string;
    };
    blogConfig: {
        devto: string;
        medium: string;
    };
    navigation: { label: string; href: string }[];
    impactHighlights: ImpactHighlight[];
    projects: Project[];
    skills: string[];
    skillCategories: Skill[];
    experience: Experience[];
    testimonials: any[];
    contact: {
        email: string;
        socials: { label: string; href: string }[];
    };
}

export const siteContent: SiteContent = {
    hero: {
        title: "Software Architect",
        subtitle: "Open Source • TUI • Full Stack",
        bio: "I am a software developer based in India, dedicated to building impactful software solutions and exploring the cutting edge of technology. I thrive in collaborative environments and love contributing to open-source projects that solve real-world problems."
    },
    blogConfig: {
        devto: "iam_pbk",
        medium: "@kumarbharath63"
    },
    navigation: [
        { label: "Home", href: "/" },
        { label: "Work", href: "/#work" },
        { label: "Experience", href: "/#experience" },
        { label: "Blog", href: "/blog" },
        { label: "Books", href: "/books" },
        { label: "Contact", href: "mailto:kumarbharath63@icloud.com" }
    ],
    impactHighlights: [
        {
            label: "Open Source",
            value: "Active",
            description: "Maintainer of git-scope & debugg"
        },
        {
            label: "Tech Stack",
            value: "Modern",
            description: "React, Node.js, Go, Rust, AWS"
        },
        {
            label: "Problem Solver",
            value: "Creative",
            description: "Building tools that solve real dev pain points"
        },
        {
            label: "Experience",
            value: "5+ Years",
            description: "Delivering production-grade software"
        }
    ],
    projects: [
        {
            slug: "git-scope",
            title: "git-scope",
            badges: ["Go", "Bubbletea", "TUI"],
            description: "A fast TUI for managing multiple Git repositories. Features contribution graphs, time machine history, and batch operations.",
            metrics: [
                { label: "Role", value: "Creator" },
                { label: "Downloads", value: "Active" }
            ],
            link: "https://github.com/Bharath-code/git-scope",
            spotlight: {
                headline: "Managing multiple repos without context switching",
                overview: "Built a terminal-first workflow tool that gives developers instant visibility into their entire Git ecosystem without leaving the terminal.",
                roles: ["Solo creator", "Go development", "TUI design"],
                highlights: [
                    "Built with Bubbletea for a responsive, keyboard-driven interface",
                    "Contribution graph visualization inspired by GitHub's UI",
                    "Time machine feature to navigate through commit history",
                    "Batch operations across multiple repositories"
                ],
                outcomes: [
                    { label: "Stars", value: "Growing" },
                    { label: "Interface", value: "TUI" },
                    { label: "Language", value: "Go" }
                ],
                walkthrough: [
                    {
                        label: "Repository discovery",
                        summary: "Recursively scans directories to find all Git repositories and displays them in a navigable list.",
                        metricLabel: "Scan speed",
                        metricValue: "< 1s",
                        code: "repos := scanner.FindRepos(rootPath)\nfor _, repo := range repos {\n    status := repo.GetStatus()\n    display.Render(status)\n}",
                        language: "go"
                    },
                    {
                        label: "Contribution visualization",
                        summary: "Generates a GitHub-style contribution graph showing commit activity over time.",
                        metricLabel: "History",
                        metricValue: "1 year",
                        code: "graph := contributions.Generate(repo, timeRange)\nui.RenderGraph(graph)",
                        language: "go"
                    }
                ],
                sandbox: {
                    title: "Interactive demo",
                    description: "See git-scope in action with sample repositories.",
                    src: "https://github.com/Bharath-code/git-scope"
                }
            }
        },
        {
            slug: "debugg",
            title: "debugg",
            badges: ["TypeScript", "NPM"],
            description: "A comprehensive error handling library for TypeScript applications.",
            metrics: [
                { label: "Type", value: "Library" },
                { label: "Stack", value: "TS/Node" }
            ],
            link: "https://github.com/Bharath-code/debugg",
            spotlight: {
                headline: "Error handling that doesn't suck",
                overview: "Created a developer-friendly error handling library that makes debugging easier with structured errors, stack traces, and context preservation.",
                roles: ["Library author", "TypeScript", "NPM publishing"],
                highlights: [
                    "Type-safe error creation with full TypeScript support",
                    "Automatic stack trace capture and formatting",
                    "Error context chaining for debugging complex flows",
                    "Serialization support for logging and monitoring"
                ],
                outcomes: [
                    { label: "Type Safety", value: "100%" },
                    { label: "Bundle", value: "Tiny" },
                    { label: "Platform", value: "NPM" }
                ],
                walkthrough: [
                    {
                        label: "Creating typed errors",
                        summary: "Define error types with full TypeScript inference and context.",
                        metricLabel: "Type coverage",
                        metricValue: "100%",
                        code: "const AppError = createError('AppError', {\n  code: 'string',\n  context: 'object'\n});\n\nthrow new AppError({ code: 'NOT_FOUND', context: { id: 123 } });",
                        language: "ts"
                    }
                ],
                sandbox: {
                    title: "Try it on StackBlitz",
                    description: "Experiment with debugg in a live TypeScript environment.",
                    src: "https://stackblitz.com/fork/github/stackblitz-labs/react-ts"
                }
            }
        },
        {
            slug: "smart-crisis-counselor",
            title: "Smart Crisis Counselor",
            badges: ["AI", "RAG", "Python"],
            description: "An intelligent system for handling crisis situations using LLMs.",
            metrics: [
                { label: "Domain", value: "AI" },
                { label: "Status", value: "Prototype" }
            ],
            link: "https://github.com/Bharath-code/smart-crisis-councelor",
            spotlight: {
                headline: "AI-powered crisis response",
                overview: "Developed a RAG-based system that helps crisis counselors respond effectively with context-aware suggestions and knowledge retrieval.",
                roles: ["AI/ML developer", "Python", "LLM integration"],
                highlights: [
                    "Retrieval Augmented Generation for accurate responses",
                    "Vector database for crisis response knowledge base",
                    "Context-aware prompt engineering",
                    "Safety guardrails for sensitive content"
                ],
                outcomes: [
                    { label: "Architecture", value: "RAG" },
                    { label: "Safety", value: "Built-in" },
                    { label: "Status", value: "Prototype" }
                ],
                walkthrough: [
                    {
                        label: "Knowledge retrieval",
                        summary: "Retrieves relevant crisis response protocols based on the situation context.",
                        metricLabel: "Retrieval",
                        metricValue: "Semantic",
                        code: "context = vector_db.similarity_search(query)\nresponse = llm.generate(\n    prompt=format_prompt(query, context),\n    guardrails=crisis_safety_rules\n)",
                        language: "python"
                    }
                ],
                sandbox: {
                    title: "View on GitHub",
                    description: "Explore the codebase and documentation.",
                    src: "https://github.com/Bharath-code/smart-crisis-councelor"
                }
            }
        },
        {
            slug: "youtube-companion",
            title: "YouTube Companion",
            badges: ["Next.js", "Dashboard"],
            description: "A dashboard that enhances the YouTube experience for creators and viewers.",
            metrics: [
                { label: "Platform", value: "Web" },
                { label: "Data", value: "Real-time" }
            ],
            link: "https://github.com/Bharath-code/youtube_companion_dashboard",
            spotlight: {
                headline: "YouTube analytics made simple",
                overview: "Built a companion dashboard that provides YouTube creators with actionable insights beyond the standard YouTube Studio.",
                roles: ["Full-stack developer", "Next.js", "API integration"],
                highlights: [
                    "Real-time analytics with intuitive visualizations",
                    "Trend analysis and content recommendations",
                    "Competitor tracking and benchmarking",
                    "Performance alerts and notifications"
                ],
                outcomes: [
                    { label: "Framework", value: "Next.js" },
                    { label: "Updates", value: "Real-time" },
                    { label: "Type", value: "Dashboard" }
                ],
                walkthrough: [
                    {
                        label: "Analytics dashboard",
                        summary: "Displays key metrics with interactive charts and trend indicators.",
                        metricLabel: "Refresh",
                        metricValue: "Real-time",
                        code: "const { data } = useSWR('/api/analytics', fetcher, {\n  refreshInterval: 30000\n});\n\nreturn <MetricsGrid data={data} />;",
                        language: "tsx"
                    }
                ],
                sandbox: {
                    title: "View on GitHub",
                    description: "Check out the source code and setup instructions.",
                    src: "https://github.com/Bharath-code/youtube_companion_dashboard"
                }
            }
        }
    ],
    skills: ["Go", "HTML", "CSS", "Docker", "React", "Node.js", "Rust", "Git", "MySQL", "AWS", "Linux", "Astro", "Tailwind", "Vercel", "Supabase", "Postgres", "Bun", "Vite", "Vitest", "Next.js", "Netlify", "Express", "Redis", "Svelte"],
    skillCategories: [
        {
            title: "Frontend craft",
            description: "Modern frameworks, design systems, accessibility, performance.",
            tags: ["React", "Next.js", "Tailwind", "Astro"]
        },
        {
            title: "Backend & CLI",
            description: "API design, CLI tools, TUI applications, system programming.",
            tags: ["Go", "Node.js", "Rust", "Bubbletea"]
        },
        {
            title: "AI & Data",
            description: "LLM integration, RAG systems, vector databases.",
            tags: ["Python", "LangChain", "Pinecone", "OpenAI"]
        },
        {
            title: "DevOps",
            description: "Containerization, CI/CD, cloud infrastructure.",
            tags: ["Docker", "AWS", "Vercel", "GitHub Actions"]
        }
    ],
    experience: [
        {
            company: "Accenture",
            role: "Full-Stack Engineer",
            period: "2019 — 2021",
            description: "Built enterprise code scanning platforms and optimized CI/CD pipelines, reducing deployment times by 60%."
        },
        {
            company: "Infosys",
            role: "Full-Stack Engineer",
            period: "2015 — 2019",
            description: "Delivered secure banking features for national clients. Improved backend performance by 40% using Redis caching."
        }
    ],
    testimonials: [],
    contact: {
        email: "kumarbharath63@icloud.com",
        socials: [
            { label: "Twitter", href: "https://x.com/iam_pbk" },
            { label: "GitHub", href: "https://github.com/Bharath-code/" },
            { label: "Portfolio", href: "https://www.bharathkumar.dev" },
            { label: "LinkedIn", href: "https://linkedin.com/in/bharathkumar-palanisamy" }
        ]
    }
};

// Helper to find project by slug
export function getProjectBySlug(slug: string): Project | undefined {
    return siteContent.projects.find(p => p.slug === slug);
}

// Helper to get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
    return siteContent.projects.map(p => p.slug);
}
