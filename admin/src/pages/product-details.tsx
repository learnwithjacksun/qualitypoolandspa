import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../layouts";
import { useProduct } from "../hooks";
import { useMemo } from "react";
import { productCategories } from "../constant/data";
import { formatNumber } from "../helpers/formatNumber";
import { ArrowLeft, Pencil, Palette } from "lucide-react";

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

  const productImages = useMemo(() => {
    if (!product) return [];
    const productImageList = (product as IProduct & { images?: string[] }).images;
    if (Array.isArray(productImageList) && productImageList.length > 0) return productImageList;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  return (
    <MainLayout>
      <div className="main space-y-6">
        <Link
          to="/products"
          className="text-sm text-main/75 hover:text-primary transition-colors flex items-center gap-2 w-fit"
        >
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
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl border border-line">
                  {productImages.length > 0 ? (
                    <img
                      src={productImages[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm text-muted bg-background">
                      No image available
                    </div>
                  )}
                </div>
                {productImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {productImages.slice(1).map((imageUrl) => (
                      <div
                        key={imageUrl}
                        className="aspect-square overflow-hidden rounded-lg border border-line"
                      >
                        <img
                          src={imageUrl}
                          alt={`${product.name} preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {categoryNameBySlug[product.categoryId] ?? product.categoryId}
                  </p>
                  {product.tag?.trim() ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {product.tag.trim()}
                    </span>
                  ) : null}
                </div>
                <h3 className="text-2xl font-space font-semibold text-primary">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-main/80 whitespace-pre-wrap">
                  {product.description || "No description available."}
                </p>

                {product.colorSampleImage ? (
                  <div className="rounded-xl border border-line bg-secondary/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted flex items-center gap-2">
                      <Palette size={14} aria-hidden />
                      Color sample
                    </p>
                    <div className="border-y border-line mt-6 py-6 overflow-hidden">
                      <img src={product.colorSampleImage} alt="" />
                    </div>
                  </div>
                ) : null}

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
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="rounded-lg border border-line bg-background px-4 py-2 text-sm font-medium text-main transition-colors hover:bg-secondary flex items-center gap-2 w-fit"
                  >
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
