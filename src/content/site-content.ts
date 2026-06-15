// Types matching the simplified site-content.json

export interface Metric {
    label: string;
    value: string;
}

export interface CaseStudyDecision {
    title: string;
    detail: string;
}

export interface CaseStudy {
    problem: string;
    approach: string;
    decisions: CaseStudyDecision[];
    outcome: string;
}

export interface Project {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    link: string;
    metrics: Metric[];
    highlights: string[];
    caseStudy?: CaseStudy;
}

export interface SecondaryProject {
    title: string;
    href: string;
    category: string;
    summary: string;
}

export interface SkillCategory {
    title: string;
    tags: string[];
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface SiteContent {
    hero: {
        greeting: string;
        title: string;
        subtitle: string;
        bio: string;
        cta: {
            primary: { label: string; href: string };
            secondary: { label: string; href: string };
        };
    };
    navigation: { label: string; href: string }[];
    blogConfig: { devto: string; medium: string };
    projects: Project[];
    secondaryProjects: SecondaryProject[];
    skillCategories: SkillCategory[];
    experience: Experience[];
    availability: {
        status: string;
        location: string;
        roles: string[];
    };
    contact: {
        email: string;
        socials: { label: string; href: string }[];
    };
}

// Re-export the JSON as the typed site content
import data from "@/data/site-content.json";

export const siteContent: SiteContent = data as SiteContent;

export function getProjectBySlug(slug: string): Project | undefined {
    return siteContent.projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return siteContent.projects.map(p => p.slug);
}

export function getNextProject(currentSlug: string): Project | undefined {
    const currentIndex = siteContent.projects.findIndex(p => p.slug === currentSlug);
    if (currentIndex === -1) return undefined;
    const nextIndex = (currentIndex + 1) % siteContent.projects.length;
    return siteContent.projects[nextIndex];
}