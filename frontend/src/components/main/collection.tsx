import { productCategories } from "@/constants/data";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'


export default function Collection() {
  const { t } = useTranslation()
  return (
    <div className="main space-y-10">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
          {t('shopByCategory', 'Shop by category')}
        </h2>
        <p className="max-w-2xl text-sm mx-auto text-main/75 md:text-base">
          {t('browseOurFullRangeOfPoolAndSpaCategoriesToFindTheRightEquipmentAccessoriesAndTreatmentProducts2', 'Browse our full range of pool and spa categories to find the right\r\n          equipment, accessories, and treatment products.')}
        </p>
      </div>

      <div className="grid gap-5 grid-cols-2 xl:grid-cols-3">
        {productCategories.map((category, index) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
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
    </div>
  );
}
