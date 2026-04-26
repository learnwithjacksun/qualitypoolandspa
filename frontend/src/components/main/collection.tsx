import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const productCategories = [
  {
    name: "Hot Tubs",
    slug: "hot-tubs",
    image: "/category/hot-tub.png",
    description:
      "Premium hot tubs built for comfort, hydrotherapy, and year-round use.",
  },
  {
    name: "Spas",
    slug: "spas",
    image: "/category/swim-spa.png",
    description:
      "Luxury spa systems with advanced jets and efficient temperature control.",
  },
  {
    name: "Pools",
    slug: "pools",
    image: "/category/pools.jpg",
    description:
      "Fiberglass and custom pool solutions for modern outdoor living spaces.",
  },
  {
    name: "Saunas",
    slug: "saunas",
    image: "/category/suana.png",
    description:
      "Contemporary indoor and outdoor saunas for wellness and recovery.",
  },
  {
    name: "Pool Covers",
    slug: "pool-covers",
    image: "/category/pool-cover.jpg",
    description:
      "Durable pool covers to improve safety, retention, and water cleanliness.",
  },
  {
    name: "Heat Pumps",
    slug: "heat-pumps",
    image: "/category/heatpump.png",
    description:
      "Energy-efficient heat pumps for reliable and cost-effective pool heating.",
  },
  {
    name: "Salt Chlorinators",
    slug: "salt-chlorinators",
    image: "/category/salt.png",
    description:
      "Low-maintenance chlorination systems for softer, cleaner pool water.",
  },
  {
    name: "Filters",
    slug: "filters",
    image: "/category/filter.png",
    description:
      "High-performance filtration equipment to keep your water crystal clear.",
  },
  {
    name: "Water Chemicals",
    slug: "water-chemicals",
    image: "/category/chemical.png",
    description:
      "Professional treatment chemicals for balance, clarity, and hygiene.",
  },
] as const;

export default function Collection() {
  return (
    <div className="main space-y-10">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
          Shop by category
        </h2>
        <p className="max-w-2xl text-sm mx-auto text-main/75 md:text-base">
          Browse our full range of pool and spa categories to find the right
          equipment, accessories, and treatment products.
        </p>
      </div>

      <div className="grid gap-5 grid-cols-2 xl:grid-cols-3">
        {productCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
           
              <div className="aspect-[16/10] overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
             

            <div className="mt-4 flex items-start justify-between gap-3 px-2 md:px-4 pb-4 relative">
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-primary md:text-lg">
                  {category.name}
                </h3>
                <p className="text-sm leading-relaxed text-main/75 line-clamp-2 md:line-clamp-none">
                  {category.description}
                </p>
              </div>
            </div>

            <button className="bg-primary/10 mt-auto w-full h-9 text-xs font-semibold text-primary flex items-center justify-center gap-2 hover:bg-primary/20 transition-all duration-300">
             View <ChevronRight size={16} />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
