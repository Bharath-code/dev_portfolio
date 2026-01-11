export interface RawBook {
    Name: string;
    Author: string[];
    Genre: string[];
    Link?: string;
    "Score /5"?: string;
    Status: string;
    Summary?: string;
    Priority?: string;
    "No of Pages"?: number;
    "Completed Year"?: number;
}

export interface MappedBook {
    title: string;
    author: string;
    genre: string;
    link: string;
    rating: number;
    review?: string;
    status: "recommended" | "read" | "want-to-read";
    pages?: number;
    year?: number;
}

export function mapBooks(booksData: RawBook[]): MappedBook[] {
    return booksData.map((raw) => {
        // Extract URL from markdown [text](url)
        const linkMatch = raw.Link ? raw.Link.match(/\[.*?\]\((.*?)\)/) : null;
        const link = linkMatch ? linkMatch[1] : raw.Link || "#";

        // Count ⭐️ characters
        const rating = raw["Score /5"]
            ? (raw["Score /5"].match(/⭐️/g) || []).length
            : 0;

        let status: "recommended" | "read" | "want-to-read";
        if (rating === 5 || raw.Priority === "Highest") {
            status = "recommended";
        } else if (raw.Status === "Finished") {
            status = "read";
        } else {
            status = "want-to-read";
        }

        return {
            title: raw.Name,
            author: raw.Author ? raw.Author.join(", ") : "Unknown Author",
            genre: raw.Genre ? raw.Genre.join(", ") : "General",
            link,
            rating,
            review: raw.Summary,
            status,
            pages: raw["No of Pages"],
            year: raw["Completed Year"]
        };
    });
}
