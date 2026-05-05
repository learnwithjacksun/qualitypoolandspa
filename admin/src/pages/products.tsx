import { MainLayout } from "../layouts";
import { useMemo, useState } from "react";
import { productCategories } from "../constant/data";
import { Loader2, Search, Trash2 } from "lucide-react";
import { useProduct } from "../hooks";
import { formatNumber } from "../helpers/formatNumber";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { products = [], isLoadingProducts, deleteProduct, isLoading } = useProduct();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const categoryNameBySlug = useMemo(() => {
    return productCategories.reduce<Record<string, string>>((acc, category) => {
      acc[category.slug] = category.name;
      return acc;
    }, {});
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return products.filter((product) => {
      const productCategorySlug = product.categoryId;
      const productCategoryName = (
        categoryNameBySlug[productCategorySlug] ?? productCategorySlug
      ).toLowerCase();

      const matchesFilter =
        activeFilter === "all" || productCategorySlug === activeFilter;

      const tagLower = (product.tag ?? "").toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        productCategoryName.includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        tagLower.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, categoryNameBySlug, products, searchValue]);

  const handleDeleteProduct = async (
    event: React.MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) => {
    event.stopPropagation();

    const shouldDelete = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`
    );
    if (!shouldDelete) return;

    setDeletingProductId(product.id);
    try {
      await deleteProduct(product.id);
    } finally {
      setDeletingProductId(null);
    }
  };

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
              placeholder="Search products or categories"
              className="h-11 w-full rounded-xl border border-line bg-background pl-10 pr-4 text-sm text-main placeholder:text-muted focus:border-primary/40"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {productCategories.map((filter) => {
              const isActive = activeFilter === filter.slug;

              return (
                <button
                  key={filter.slug}
                  type="button"
                  onClick={() => setActiveFilter(filter.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-background"
                      : "border border-line bg-background text-main hover:bg-secondary"
                  }`}
                >
                  {filter.name}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="rounded-2xl border border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">
              Loading products...
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              (() => {
                const imageUrl = product.images?.[0] ?? product.image ?? "";
                return (
              <article
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/products/${product.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/products/${product.id}`);
                  }
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-xl">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-muted bg-background">
                      No image available
                    </div>
                  )}
                  {product.tag?.trim() ? (
                    <span className="pointer-events-none absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-background shadow-sm">
                      {product.tag.trim()}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3 px-2 md:px-4 pb-4 relative">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {categoryNameBySlug[product.categoryId] ?? product.categoryId}
                    </p>
                    <h3 className="text-base font-semibold text-primary md:text-lg">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-main/75 line-clamp-2 whitespace-pre-wrap">
                      {product.description || "No description available."}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Delete ${product.name}`}
                    onClick={(event) => handleDeleteProduct(event, product)}
                    disabled={isLoading && deletingProductId === product.id}
                    className="rounded-full border border-red-200 bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                   {isLoading && deletingProductId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between bg-secondary text-sm text-primary font-medium font-space gap-2 px-3 md:px-4 py-4 mt-auto">
                  <p className="truncate">Price</p>
                  <p>
                    {typeof product.price === "number"
                      ? formatNumber(product.price)
                      : "-"}
                  </p>
                </div>
              </article>
                );
              })()
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-background px-6 py-10 text-center center flex-col">
            <p className="text-base font-semibold text-primary">
              No products match your filters
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
