interface Image {
    src: string;
    alt: string;
}

interface TimelineItem {
    title: string;
    time: string;
    bullets: string[];
    images: Image[];
}

const timelineData: TimelineItem[] = [
    {
        title: "Website Demo Created.",
        time: "April 10, 2025",
        bullets: [
            "Created initial website demo",
            "Implemented basic component structure",
            "Set up demo environment for showcasing components",
            "Added documentation for initial components"
        ],
        images: [
            {
                src: "/changelog/astra-website.png",
                alt: "Website Demo Image 1"
            },
            {
                src: "/changelog/astra-contact.png",
                alt: "Website Demo Image 2"
            }
        ],
    },
    {
        title: "Project Initialization",
        time: "April 6, 2025",
        bullets: [
            "Project initialization",
            "Set up repository structure",
            "Created foundational architecture for the UI library",
            "Established project roadmap and component guidelines"
        ],
        images: [
            {
                src: "/changelog/astra-text.png",
                alt: "Project Start Image 1"
            },
            {
                src: "/changelog/astra-logo.png",
                alt: "Project Start Image 2"
            }
        ],
    }
];

export default timelineData;