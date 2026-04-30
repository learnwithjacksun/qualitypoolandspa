import { MainLayout } from "@/layouts";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Loader2, PhoneCall, Mail, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import useProduct from "@/hooks/useProduct";
import { useMemo } from "react";
import { productCategories } from "@/constants/data";
import { formatNumber } from "@/helpers/formatNumber";

export default function CategoryItemDetails() {
  const { t } = useTranslation();
  const { products, isLoadingProducts } = useProduct();
  const { categorySlug = "", productId = "" } = useParams<{
    categorySlug: string;
    productId: string;
  }>();

  const category = useMemo(() => {
    return productCategories.find((item) => item.slug === categorySlug) ?? null;
  }, [categorySlug]);

  const categoryName = category
    ? t(category.nameKey, category.nameFallback)
    : t("category", "Category");

  const product = useMemo(() => {
    return (
      products?.find(
        (item) => item.id === productId && item.categoryId === categorySlug
      ) ?? null
    );
  }, [categorySlug, productId, products]);

  const enquiryMailTo = useMemo(() => {
    if (!product) {
      return "mailto:info@qualitypoolspa.es";
    }

    const productPrice =
      product.price > 0 ? formatNumber(product.price) : t("callForPrice", "Call for Price");

    const subject = `Product enquiry: ${product.name}`;
    const body = [
      "Hello Quality Pool & Spa team,",
      "",
      "I am interested in this product:",
      `- Product: ${product.name}`,
      `- Category: ${categoryName}`,
      `- Price: ${productPrice}`,
      "",
      "Please share availability, lead time, and next steps to place an order.",
      "",
      "Thank you.",
    ].join("\n");

    return `mailto:info@qualitypoolspa.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [categoryName, product, t]);

  return (
    <MainLayout>
      <section className="main py-10 md:py-16">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted flex-wrap">
          <Link to="/" className="hover:text-primary text-nowrap">
            {t("home", "Home")}
          </Link>
          <ChevronRight size={14} />
          <Link to="/categories" className="hover:text-primary text-nowrap">
            {t("categories", "Categories")}
          </Link>
          <ChevronRight size={14} />
          <Link to={`/categories/${categorySlug}`} className="hover:text-primary text-nowrap">
            {categoryName}
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-main text-nowrap">{product?.name}</span>
        </div>

        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : !product ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-line bg-secondary/30">
            <p className="text-lg font-medium text-primary">
              {t("productNotFound", "Product not found")}
            </p>
            <p className="mt-2 text-sm text-muted">
              {t(
                "theProductMayHaveBeenRemovedOrTheLinkIsInvalid",
                "The product may have been removed or the link is invalid."
              )}
            </p>
            <Link
              to={`/categories/${categorySlug}`}
              className="mt-5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-background"
            >
              {t("backToCategory", "Back to category")}
            </Link>
          </div>
        ) : (
          <article className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-line bg-background">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl border border-line bg-background p-5 md:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {categoryName}
              </p>
              <h1 className="mt-2 text-2xl font-space font-semibold text-primary md:text-3xl">
                {product.name}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-main/80 whitespace-pre-wrap">
                {product.description || t("noDescriptionAvailable", "No description available.")}
              </p>

              <div className="mt-6 rounded-xl border border-line bg-secondary px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {t("price", "Price")}
                </p>
                <p className="mt-1 text-xl font-space font-semibold text-primary">
                  {product.price > 0
                    ? formatNumber(product.price)
                    : t("callForPrice", "Call for Price")}
                </p>
              </div>

               {categorySlug === "hot-tubs" ? (
          <div className="mb-8 flex flex-col gap-3 mt-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <FileText size={20} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">
                  {t("fullProductDetailsPdf", "Full product details")}
                </p>
                <p className="mt-1 text-sm text-main/75">
                  {t(
                    "viewWellisPdfForSpecifications",
                    "View our Wellis brochure (PDF) for complete specifications, options, and technical information."
                  )}
                </p>
              </div>
            </div>
            <a
              href="/pdf/wellis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              {t("openWellisPdf", "Open PDF")}
            </a>
          </div>
        ) : null}

              <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4 md:p-5">
                <h3 className="text-base font-semibold text-primary">
                  {t("placeAnOrder", "Place an order")}
                </h3>
                <p className="mt-1 text-sm text-main/75">
                  {t(
                    "contactUsForAvailabilityAndDelivery",
                    "Contact us for availability, delivery details, and checkout support."
                  )}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    href={enquiryMailTo}
                    className="btn h-11 rounded-full bg-primary text-background font-semibold transition-transform hover:-translate-y-0.5"
                  >
                    <Mail size={16} className="shrink-0" />
                    {t("enquireNow", "Enquire Now")}
                  </a>
                  <a
                    href="tel:+34951172808"
                    className="btn h-11 rounded-full bg-green-600 text-white font-semibold transition-transform hover:-translate-y-0.5"
                  >
                    <PhoneCall size={16} className="shrink-0" />
                    {t("callNow", "Call Now")}
                  </a>
                </div>
              </div>
            </div>
          </article>
        )}
      </section>
    </MainLayout>
  );
}
