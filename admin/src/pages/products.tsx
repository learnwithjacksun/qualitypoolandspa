import { MainLayout } from "../layouts";
import { useEffect } from "react";
import axios from "axios";

type Category = {
  id: number;
  nameKey: string;
  nameFallback: string;
  slug: string;
  descriptionKey: string;
  descriptionFallback: string;
  image: string;
  segment: string;
};

type CategoryFilter = "all" | "wellness" | "pool-build" | "maintenance";

const filterButtons: ReadonlyArray<{ key: CategoryFilter; label: string }> = [
  { key: "all", label: "All Categories" },
  { key: "wellness", label: "Wellness" },
  { key: "pool-build", label: "Pool Build" },
  { key: "maintenance", label: "Maintenance" },
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Products() {
     const [searchValue, setSearchValue] = useState("");
     const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
     const [categories, setCategories] = useState<Category[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchCategories = async () => {
         try {
           const response = await axios.get(`${API_URL}/categories`);
           setCategories(response.data);
         } catch (error) {
           console.error("Failed to fetch categories:", error);
         } finally {
           setLoading(false);
         }
       };

       fetchCategories();
     }, []);

     const filteredCategories = useMemo(() => {
       const normalizedSearch = searchValue.trim().toLowerCase();

       return categories.filter((category) => {
         const matchesFilter =
           activeFilter === "all" || category.segment === activeFilter;
         const matchesSearch =
           normalizedSearch.length === 0 ||
           category.nameFallback.toLowerCase().includes(normalizedSearch) ||
           (category.descriptionFallback?.toLowerCase().includes(normalizedSearch) ?? false);

         return matchesFilter && matchesSearch;
       });
     }, [activeFilter, searchValue, categories]);
  return (
    <MainLayout>
      <div className="main space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
            Select by category
          </h2>
          <p className="max-w-2xl text-sm text-main/75 md:text-base">
            Browse the full range of pool and spa categories of uploaded products
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
            Showing {filteredCategories.length} of {categories.length}{" "}
            categories
          </p>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid gap-5 grid-cols-2 xl:grid-cols-3">
            {filteredCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={category.image.startsWith("/") ? `${API_URL}${category.image}` : category.image}
                    alt={category.nameFallback}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-3 px-2 md:px-4 pb-4 relative">
                  <div className="space-y-1.5">
                     <h3 className="text-base font-semibold text-primary md:text-lg">
                       {category.nameFallback}
                     </h3>
                     <p className="text-sm leading-relaxed text-main/75 line-clamp-2 md:line-clamp-none">
                       {category.descriptionFallback}
                     </p>
                  </div>
                </div>

                <div className="flex items-center justify-center bg-secondary text-sm text-primary font-medium font-space gap-2 px-3 md:px-4 py-4">
                  <p>View</p>
                  <ChevronRight size={16} />
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
