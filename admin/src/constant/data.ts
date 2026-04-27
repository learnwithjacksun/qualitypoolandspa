
export const navLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/add-product", label: "Add Product" },
];

export const languages = [
    { code: "EN", name: "English" },
    { code: "FR", name: "French" },
    { code: "ES", name: "Spanish" },
    { code: "DE", name: "German" },
    { code: "SV", name: "Swedish" },
    { code: "RU", name: "Russian" },
];

export const productCategories = [
    {
        name: "Hot Tubs",
        slug: "hot-tubs",
        image: "/category/hot-tub.png",
        description:
            "Premium hot tubs built for comfort, hydrotherapy, and year-round use.",
        segment: "wellness" as const,
    },
    {
        name: "Spas",
        slug: "spas",
        image: "/category/swim-spa.png",
        description:
            "Luxury spa systems with advanced jets and efficient temperature control.",
        segment: "wellness" as const,
    },
    {
        name: "Pools",
        slug: "pools",
        image: "/category/pools.jpg",
        description:
            "Fiberglass and custom pool solutions for modern outdoor living spaces.",
        segment: "pool-build" as const,
    },
    {
        name: "Saunas",
        slug: "saunas",
        image: "/category/suana.png",
        description:
            "Contemporary indoor and outdoor saunas for wellness and recovery.",
        segment: "wellness" as const,
    },
    {
        name: "Pool Covers",
        slug: "pool-covers",
        image: "/category/pool-cover.jpg",
        description:
            "Durable pool covers to improve safety, retention, and water cleanliness.",
        segment: "pool-build" as const,
    },
    {
        name: "Heat Pumps",
        slug: "heat-pumps",
        image: "/category/heatpump.png",
        description:
            "Energy-efficient heat pumps for reliable and cost-effective pool heating.",
        segment: "pool-build" as const,
    },
    {
        name: "Salt Chlorinators",
        slug: "salt-chlorinators",
        image: "/category/salt.png",
        description:
            "Low-maintenance chlorination systems for softer, cleaner pool water.",
        segment: "maintenance" as const,
    },
    {
        name: "Filters",
        slug: "filters",
        image: "/category/filter.png",
        description:
            "High-performance filtration equipment to keep your water crystal clear.",
        segment: "maintenance" as const,
    },
    {
        name: "Water Chemicals",
        slug: "water-chemicals",
        image: "/category/chemical.png",
        description:
            "Professional treatment chemicals for balance, clarity, and hygiene.",
        segment: "maintenance" as const,
    },
] as const;