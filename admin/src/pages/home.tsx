import { MainLayout } from "../layouts";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useProduct } from "../hooks";
import { productCategories } from "../constant/data";

export default function Home() {
  const { products = [], isLoadingProducts } = useProduct();

  const categoryStats = useMemo(() => {
    const countByCategorySlug = products.reduce<Record<string, number>>(
      (acc, product) => {
        const categorySlug = product.categoryId;
        acc[categorySlug] = (acc[categorySlug] ?? 0) + 1;
        return acc;
      },
      {}
    );

    const knownCategoryStats = productCategories.map((category) => ({
      category: category.name,
      slug: category.slug,
      totalItems: countByCategorySlug[category.slug] ?? 0,
    }));

    const unknownCategoryStats = Object.entries(countByCategorySlug)
      .filter(([slug]) => !productCategories.some((category) => category.slug === slug))
      .map(([slug, totalItems]) => ({
        category: slug,
        slug,
        totalItems,
      }));

    return [...knownCategoryStats, ...unknownCategoryStats];
  }, [products]);

  const totalProducts = products.length;

  return (
    <MainLayout>
      <section className="main space-y-6">
        <div className="flex flex-col gap-10 rounded-2xl bg-primary/2 p-5 border border-primary/5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Dashboard Overview
            </p>
            <h1 className="mt-1 text-2xl font-space tracking-tight font-semibold text-primary md:text-3xl">
              Product category stats
            </h1>
            <p className="mt-2 text-sm text-main/80">
              Monitor your catalog distribution and quickly add new products.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="btn h-11 w-fit rounded-full bg-primary/10 px-5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              Products
            </Link>
            <Link
              to="/add-product"
              className="btn h-11 w-fit rounded-full bg-primary px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Add Product
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="font-space text-lg font-semibold text-main">
                Category
              </p>
            </div>
            <p className="text-sm font-medium text-muted">
              Total items:{" "}
              <span className="font-semibold text-primary">
                {totalProducts}
              </span>
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="rounded-xl border border-line bg-secondary p-5 text-center">
              <p className="text-sm font-medium text-main">Loading product stats...</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categoryStats.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-xl border border-line bg-secondary p-4"
                >
                  <p className="text-sm font-medium text-main">{item.category}</p>
                  <p className="mt-2 text-3xl font-space font-semibold text-primary">
                    {item.totalItems}
                  </p>
                  <p className="text-xs text-muted">Items in this category</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
