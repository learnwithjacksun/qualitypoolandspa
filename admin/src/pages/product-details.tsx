import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../layouts";
import { useProduct } from "../hooks";
import { useMemo } from "react";
import { productCategories } from "../constant/data";
import { formatNumber } from "../helpers/formatNumber";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { products = [], isLoadingProducts } = useProduct();

  const categoryNameBySlug = useMemo(() => {
    return productCategories.reduce<Record<string, string>>((acc, category) => {
      acc[category.slug] = category.name;
      return acc;
    }, {});
  }, []);

  const product = useMemo(() => {
    return products.find((item) => item.id === id) ?? null;
  }, [id, products]);

  return (
    <MainLayout>
      <div className="main space-y-6">
        <Link to="/products" className="text-sm text-main/75 hover:text-primary transition-colors flex items-center gap-2 w-fit">
          <ArrowLeft size={16} /> Back to products
        </Link>
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-space font-semibold text-primary">
            Product Details
          </h2>
          <p className="text-sm text-main/75">
            View the details of {product?.name ?? "Product"}.
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="rounded-2xl border border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">
              Loading product...
            </p>
          </div>
        ) : !product ? (
          <div className="rounded-2xl border border-dashed border-line bg-background px-6 py-10 text-center">
            <p className="text-base font-semibold text-primary">
              Product not found
            </p>
            <p className="mt-1 text-sm text-muted">
              The product may have been deleted or the link is invalid.
            </p>
          </div>
        ) : (
          <article className="">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="aspect-square overflow-hidden rounded-xl border border-line">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {categoryNameBySlug[product.categoryId] ?? product.categoryId}
                </p>
                <h3 className="text-2xl font-space font-semibold text-primary">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-main/80 whitespace-pre-wrap">
                  {product.description || "No description available."}
                </p>

                <div className="rounded-xl bg-secondary px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Price
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    {typeof product.price === "number"
                      ? formatNumber(product.price)
                      : "-"}
                  </p>
                    </div>
                    
                    <div>
                      <Link to={`/products/${product.id}/edit`} className="rounded-lg border border-line bg-background px-4 py-2 text-sm font-medium text-main transition-colors hover:bg-secondary flex items-center gap-2 w-fit">
                        <Pencil size={16} /> Edit Product
                      </Link>
                    </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </MainLayout>
  );
}
