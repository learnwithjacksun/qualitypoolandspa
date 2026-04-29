import { useMemo, useState } from "react";
import { MainLayout } from "@/layouts";
import { ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productCategories } from "@/constants/data";



type CategoryFilter = "all" | "wellness" | "pool-build" | "maintenance";



export default function Categories() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");


  const filterButtons: ReadonlyArray<{ key: CategoryFilter; label: string }> = [
    { key: "all", label: t("allCategories", "All Categories") },
    { key: "wellness", label: t("wellness", "Wellness") },
    { key: "pool-build", label: t("poolBuild", "Pool Build") },
    { key: "maintenance", label: t("maintenance", "Maintenance") },
  ];

 

  const filteredCategories = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return productCategories.filter((category) => {
      const matchesFilter =
        activeFilter === "all" || category.segment === activeFilter;
      const categoryName = t(category.nameKey, category.nameFallback).toLowerCase();
      const categoryDescription = t(
        category.descriptionKey || "",
        category.descriptionFallback || ""
      ).toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        categoryName.includes(normalizedSearch) ||
        categoryDescription.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchValue, t]);

  return (
    <MainLayout>
      <div className="main mt-10 space-y-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            {t('home', 'Home')}
          </Link>
          <ChevronRight size={14} />

          <span className="font-medium text-main">{t('categories', 'Categories')}</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
            {t('shopByCategory', 'Shop by category')}
          </h2>
          <p className="max-w-2xl text-sm text-main/75 md:text-base">
            {t('browseOurFullRangeOfPoolAndSpaCategoriesToFindTheRightEquipmentAccessoriesAndTreatmentProducts', 'Browse our full range of pool and spa categories to find the right\r\n            equipment, accessories, and treatment products.')}
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
              placeholder={t('searchCategoriesEgHeatPumpsFiltersSaunas', 'Search categories (e.g. heat pumps, filters, saunas)')}
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

          <p className="text-xs text-muted">{t('showingLengthOfLength2', 'Showing {{length}} of {{length2}}', { length: filteredCategories.length, length2: productCategories.length })}{" "}
            {t('categories', 'categories')}
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
                    src={category.image}
                    alt={t(category.nameKey, category.nameFallback)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-3 px-2 md:px-4 pb-4 relative">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-primary md:text-lg">
                      {t(category.nameKey, category.nameFallback)}
                    </h3>
                    <p className="text-sm leading-relaxed text-main/75 line-clamp-2 md:line-clamp-none">
                      {t(category.descriptionKey, category.descriptionFallback)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center bg-secondary text-sm text-primary font-medium font-space gap-2 px-3 md:px-4 py-4">
                  <p>{t('view', 'View')}</p>
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-background px-6 py-10 text-center center flex-col">
            <p className="text-base font-semibold text-primary">
              {t('noCategoriesMatchYourSearch', 'No categories match your search')}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t('tryAnotherKeywordOrSwitchToADifferentFilter', 'Try another keyword or switch to a different filter.')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                setActiveFilter("all");
              }}
              className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-background"
            >
              {t('resetFilters', 'Reset filters')}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
