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
    proofPoints?: string[];
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

export interface AiToolkitCategory {
    label: string;
    tools: string[];
}

export interface AiToolkit {
    headline: string;
    subtitle: string;
    categories: AiToolkitCategory[];
}

export interface OpportunityRole {
    title: string;
    summary: string;
}

export interface SecondaryProject {
    title: string;
    href: string;
    category: string;
    summary: string;
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
    opportunities: {
        headline: string;
        summary: string;
        roles: OpportunityRole[];
        preferences: string[];
    };
    secondaryProjects: SecondaryProject[];
    skills: string[];
    skillCategories: Skill[];
    experience: Experience[];
    testimonials: any[];
    aiToolkit: AiToolkit;
    contact: {
        email: string;
        socials: { label: string; href: string }[];
    };
}

export const siteContent: SiteContent = {
    hero: {
        title: "I build developer tools and AI-integrated products that ship fast and hold up in production",
        subtitle: "Software Engineer · Developer Tools · AI-Augmented Builder",
        bio: "India-based software engineer building developer tools, full-stack products, and AI-assisted workflows. I use AI to move faster, but the bar stays the same: useful products, clear interfaces, and engineering decisions that survive real usage."
    },
    blogConfig: {
        devto: "iam_pbk",
        medium: "@kumarbharath63"
    },
    navigation: [
        { label: "Work", href: "/#work" },
        { label: "Experience", href: "/#experience" },
        { label: "Writing", href: "/blog" },
        { label: "Library", href: "/books" },
        { label: "Contact", href: "/#contact" }
    ],
    impactHighlights: [
        {
            label: "Open Source Tools",
            value: "4",
            description: "Shipped & maintained on GitHub"
        },
        {
            label: "CI/CD Optimization",
            value: "60%",
            description: "Faster deployment pipelines at Accenture"
        },
        {
            label: "Backend Performance",
            value: "+40%",
            description: "Redis caching at Infosys"
        },
        {
            label: "Experience",
            value: "6+ yrs",
            description: "Production-grade software delivery"
        }
    ],
    projects: [
        {
            slug: "git-scope",
            title: "git-scope",
            badges: ["Go", "Bubbletea", "TUI"],
            description: "Fast TUI for managing Git repositories. Features contribution graphs, time machine history, and batch operations for high-velocity developer workflows.",
            metrics: [
                { label: "Role", value: "Creator" },
                { label: "Distribution", value: "Homebrew + npm" }
            ],
            link: "https://github.com/Bharath-code/git-scope",
            proofPoints: [
                "71+ GitHub stars and 15 releases shipped in 10 weeks",
                "Homebrew distribution with multi-repo workflows built for daily use",
                "Scans 50+ repositories with fuzzy search, workspace switching, and dirty filters"
            ],
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
            description: "Comprehensive error handling library for TypeScript. Simplifies debugging with structured errors, stack traces, and context preservation for robust apps.",
            metrics: [
                { label: "Type", value: "Library" },
                { label: "Stack", value: "TS/Node" }
            ],
            link: "https://github.com/Bharath-code/debugg",
            proofPoints: [
                "Universal TypeScript error handling for browser and Node runtimes",
                "Routes rich context to Sentry and webhook pipelines",
                "Designed for type-safe severity classification and structured debugging"
            ],
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
            description: "Intelligent RAG-based system for crisis counseling. Uses LLMs to provide context-aware response suggestions and knowledge retrieval for sensitive scenarios.",
            metrics: [
                { label: "Domain", value: "AI" },
                { label: "Response", value: "< 800ms" }
            ],
            link: "https://github.com/Bharath-code/smart-crisis-councelor",
            proofPoints: [
                "Voice-first AI flow with real-time transcript handling",
                "Sub-800ms response time with Gemini and ElevenLabs in the loop",
                "Sensitive-mode features like 911 auto-call, breathing support, and privacy controls"
            ],
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
            description: "Actionable analytics dashboard for YouTube creators. Beyond Studio metrics with real-time trend analysis, recommendations, and competitor benchmarking.",
            metrics: [
                { label: "Platform", value: "Web" },
                { label: "Data", value: "Real-time" }
            ],
            link: "https://github.com/Bharath-code/youtube_companion_dashboard",
            proofPoints: [
                "Full-stack dashboard with Google OAuth and audit logging",
                "Searchable tagging and content workflows for creator operations",
                "Built as an end-to-end product surface, not just an analytics mock"
            ],
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
    opportunities: {
        headline: "Open to opportunities where I can build products end-to-end and use AI as a force multiplier.",
        summary: "Best fit for teams building developer tools, B2B SaaS, or AI products and looking for someone who can move from system design to shipped UI without losing rigor.",
        roles: [
            {
                title: "Developer Tools Engineer",
                summary: "CLIs, SDKs, terminal UX, and workflow tooling shipped to real developers."
            },
            {
                title: "Full-Stack Engineer",
                summary: "Go, TypeScript, React, PostgreSQL, and end-to-end ownership across product surfaces."
            },
            {
                title: "AI/ML Engineer",
                summary: "LLM integrations, voice AI, structured outputs, and AI-augmented product workflows."
            }
        ],
        preferences: [
            "Based in India and open to remote, hybrid, or onsite roles globally",
            "Strong fit for early-stage to growth-stage startups",
            "Looking for teams that value speed, product ownership, and public iteration"
        ]
    },
    secondaryProjects: [
        {
            title: "snip",
            href: "https://github.com/Bharath-code/snip",
            category: "CLI & Developer Tools",
            summary: "Terminal snippet manager for saving, searching, sharing, and running reusable code."
        },
        {
            title: "resume-cli",
            href: "https://github.com/Bharath-code/resume-cli",
            category: "CLI & Developer Tools",
            summary: "Generate and manage resume content from the command line."
        },
        {
            title: "rivaleye",
            href: "https://github.com/Bharath-code/rivaleye",
            category: "SaaS & AI",
            summary: "Competitor intelligence and monitoring SaaS for market tracking."
        },
        {
            title: "salesIQ",
            href: "https://github.com/Bharath-code/salesIQ",
            category: "SaaS & AI",
            summary: "AI-powered sales coaching with transcript analysis and workflow support."
        },
        {
            title: "tabZero",
            href: "https://github.com/Bharath-code/tabZero",
            category: "Browser Extensions",
            summary: "Svelte-based new-tab replacement extension with a stronger daily workflow focus."
        },
        {
            title: "how_the_web_works",
            href: "https://github.com/Bharath-code/how_the_web_works",
            category: "Frontend & Education",
            summary: "Interactive Astro project explaining web fundamentals through productized visuals."
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
    aiToolkit: {
        headline: "My AI Stack",
        subtitle: "The tools I use daily to move faster — from writing code to deploying production systems.",
        categories: [
            {
                label: "AI Assistants",
                tools: ["Claude", "GPT-4o", "Gemini", "Cursor"]
            },
            {
                label: "Shipping Tools",
                tools: ["Copilot", "v0", "Bolt", "Vercel AI SDK"]
            },
            {
                label: "Agent Frameworks",
                tools: ["LangChain", "LangGraph", "CrewAI", "MCP"]
            },
            {
                label: "AI Infrastructure",
                tools: ["Pinecone", "Hugging Face", "Replicate", "RAG"]
            }
        ]
    },
    experience: [
        {
            company: "Accenture",
            role: "Full-Stack Engineer",
            period: "2019 — 2021",
            description: "Built enterprise code scanning platforms, improved delivery workflows, and reduced deployment time by 60% through CI/CD redesign."
        },
        {
            company: "Infosys",
            role: "Full-Stack Engineer",
            period: "2015 — 2019",
            description: "Delivered banking software for high-trust environments and improved backend performance by 40% with targeted caching and service optimizations."
        }
    ],
    testimonials: [],
    contact: {
        email: "kumarbharath63@gmail.com",
        socials: [
            { label: "X", href: "https://x.com/iam_pbk" },
            { label: "GitHub", href: "https://github.com/Bharath-code/" },
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

// Helper to find the next project for kinetic navigation
export function getNextProject(currentSlug: string): Project | undefined {
    const currentIndex = siteContent.projects.findIndex(p => p.slug === currentSlug);
    if (currentIndex === -1) return undefined;

    const nextIndex = (currentIndex + 1) % siteContent.projects.length;
    return siteContent.projects[nextIndex];
}
