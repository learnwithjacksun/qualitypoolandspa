import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { MainLayout } from "@/layouts";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

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
  const { categorySlug = "" } = useParams<{ categorySlug: string }>();
  const categoryName = categoryLabelBySlug[categorySlug] ?? "Category";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products?categorySlug=${categorySlug}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : products.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden flex flex-col rounded-2xl border border-line bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={product.image.startsWith("/") ? `${API_URL}${product.image}` : product.image}
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
                    <p className="text-sm leading-relaxed text-main/75 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-space font-semibold text-primary text-xl">
                      {parseFloat(product.price) > 0 ? (
                        <>€{Number(product.price).toLocaleString()}</>
                      ) : (
                        <span className="text-sm text-muted">Call for Price</span>
                      )}
                    </span>
                    <button className="rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">
                      {t("viewDetails", "Details")}
                    </button>
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
