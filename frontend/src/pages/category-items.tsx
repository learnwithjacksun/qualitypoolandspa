import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MainLayout } from "@/layouts";
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const { categorySlug = "" } = useParams<{ categorySlug: string }>();
  const categoryName = categoryLabelBySlug[categorySlug] ?? "Category";

  return (
    <MainLayout>
      <section className="main py-10 md:py-16">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            {t('home', 'Home')}
          </Link>
          <ChevronRight size={14} />
          <Link to="/categories" className="hover:text-primary">{t('categories', 'Categories')}</Link>
          <ChevronRight size={14} />
          <span className="font-medium text-main">{categoryName}</span>
        </div>

        <h1 className="text-3xl font-space font-semibold text-primary md:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-3 max-w-2xl text-main/80">
          {t('fullListOfAvailable', 'Full list of available')} {categoryName.toLowerCase()} {t('productsWillBeDisplayedHereUseThisPageToBrowseAllItemsInThisCategory', 'products will be\r\n          displayed here. Use this page to browse all items in this category.')}
        </p>
      </section>
    </MainLayout>
  );
}
