import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { MainLayout } from "@/layouts";
import { useTranslation } from "react-i18next";
import useProduct from "@/hooks/useProduct";
import { formatNumber } from "@/helpers/formatNumber";




const categoryLabelBySlug: Record<string, string> = {
  "hot-tubs": "Hot Tubs",
  spas: "Spas",
  pools: "Pools",
  saunas: "Saunas",
  "pool-covers": "Pool Covers",
  "heat-pumps": "Heat Pumps",
  "salt-chlorinators": "Salt Chlorinators",
  filters: "Filters",
  "water-chemicals": "Water Chemicals",
};

export default function CategoryItems() {
  const { t } = useTranslation();
  const { products, isLoadingProducts } = useProduct();
  const { categorySlug = "" } = useParams<{ categorySlug: string }>();
  const categoryName = categoryLabelBySlug[categorySlug] ?? "Category";

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => product.categoryId === categorySlug);
  }, [products, categorySlug]);


 

  return (
    <MainLayout>
      <section className="main py-10 md:py-16">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            {t("home", "Home")}
          </Link>
          <ChevronRight size={14} />
          <Link to="/categories" className="hover:text-primary">
            {t("categories", "Categories")}
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-main">{categoryName}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-space font-semibold text-primary md:text-4xl">
            {categoryName}
          </h1>
          <p className="mt-3 max-w-2xl text-main/80">
            {t("fullListOfAvailable", "Full list of available")}{" "}
            {categoryName.toLowerCase()}{" "}
            {t(
              "productsWillBeDisplayedHereUseThisPageToBrowseAllItemsInThisCategory",
              "products will be displayed here. Use this page to browse all items in this category."
            )}
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : filteredProducts && filteredProducts?.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden flex flex-col rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-primary">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-main/75 line-clamp-2 whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-space font-semibold text-primary text-xl">
                      {product.price > 0 ? (
                        <>{formatNumber(product.price)}</>
                      ) : (
                        <span className="text-sm text-muted">Call for Price</span>
                      )}
                    </span>
                    <Link
                      to={`/categories/${categorySlug}/${product.id}`}
                      className="rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                    >
                      {t("viewDetails", "Details")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-line bg-secondary/30">
            <p className="text-lg font-medium text-primary">
              {t("noProductsFound", "No products found")}
            </p>
            <p className="mt-2 text-sm text-muted">
              {t(
                "weAreCurrentlyUpdatingOurInventory",
                "We are currently updating our inventory. Please check back later."
              )}
            </p>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
