import { MainLayout } from "../layouts";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes } from "lucide-react";

const categoryStats = [
  { category: "Hot Tubs", totalItems: 18 },
  { category: "Spas", totalItems: 14 },
  { category: "Saunas", totalItems: 9 },
  { category: "Pools", totalItems: 11 },
  { category: "Pool Covers", totalItems: 7 },
  { category: "Heat Pumps", totalItems: 10 },
  { category: "Salt Chlorinators", totalItems: 8 },
  { category: "Filters", totalItems: 16 },
  { category: "Water Chemicals", totalItems: 21 },
] as const;

export default function Home() {
  const totalProducts = categoryStats.reduce(
    (sum, category) => sum + category.totalItems,
    0
  );

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
              <Boxes size={16} />
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
              Total items: <span className="font-semibold text-primary">{totalProducts}</span>
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categoryStats.map((item) => (
              <div
                key={item.category}
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
        </div>
      </section>
    </MainLayout>
  );
}
