import { useMemo, useState } from "react";
import { MainLayout } from "@/layouts";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { productCategories } from "@/constants/data";

type CategoryFilter = "all" | "wellness" | "pool-build" | "maintenance";



const filterButtons: ReadonlyArray<{ key: CategoryFilter; label: string }> = [
  { key: "all", label: "All Categories" },
  { key: "wellness", label: "Wellness" },
  { key: "pool-build", label: "Pool Build" },
  { key: "maintenance", label: "Maintenance" },
];

export default function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredCategories = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return productCategories.filter((category) => {
      const matchesFilter =
        activeFilter === "all" || category.segment === activeFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        category.name.toLowerCase().includes(normalizedSearch) ||
        category.description.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue]);

  return (
    <MainLayout>
      <div className="main mt-10 space-y-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} />
          
          <span className="font-medium text-main">Categories</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
            Shop by category
          </h2>
          <p className="max-w-2xl text-sm text-main/75 md:text-base">
            Browse our full range of pool and spa categories to find the right
            equipment, accessories, and treatment products.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-line bg-secondary/40 p-4 md:p-5">
          <label className="relative block">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search categories (e.g. heat pumps, filters, saunas)"
              className="h-11 w-full rounded-xl border border-line bg-background pl-10 pr-4 text-sm text-main placeholder:text-muted focus:border-primary/40"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filterButtons.map((filter) => {
              const isActive = activeFilter === filter.key;

              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-background"
                      : "border border-line bg-background text-main hover:bg-secondary"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted">
            Showing {filteredCategories.length} of {productCategories.length}{" "}
            categories
          </p>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-background shadow-sm transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-3 px-4 pb-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-primary md:text-lg">
                      {category.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-main/75">
                      {category.description}
                    </p>
                  </div>
                  <span className="center mt-0.5 h-9 w-9 shrink-0 rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">
              No categories match your search
            </p>
            <p className="mt-1 text-sm text-muted">
              Try another keyword or switch to a different filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                setActiveFilter("all");
              }}
              className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-background"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
