type BrandCard = {
    image: string;
    desc: string;
    className?: string;
};

const brandCards: BrandCard[] = [
    {
        image: "/og-links.jpg",
        desc: "This is the first brand card",
    },
    {
        image: "/og-links.jpg",
        desc: "This is the second brand card",
    },
    {
        image: "/og-links.jpg",
        desc: "This is the third brand card",
    },
];

export default brandCards;