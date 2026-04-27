import { BadgeCheck, Mail, PhoneCall, Truck } from "lucide-react";
import { MainLayout } from "@/layouts";
import { Hero, Collection } from "@/components/main";
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <MainLayout>
      <Hero />
      <Collection />
      <div className="main rounded-2xl border border-line bg-secondary/50 p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 pb-4">
          <p className="text-sm font-semibold font-space text-primary md:text-base">
            {t('whyCustomersShopWithQualityPoolSpa', 'Why customers shop with Quality Pool & Spa')}
          </p>
          <span className="hidden md:block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t('trustedEcommerceExperience', 'Trusted ecommerce experience')}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-line bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="center h-9 w-9 rounded-full bg-green-500/10 text-green-500">
                <BadgeCheck size={18} />
              </span>
              <span className="text-xs font-semibold text-green-600">
                {t('verified', 'Verified')}
              </span>
            </div>
            <p className="text-sm font-semibold text-main">
              {t('curatedEquipmentCatalog', 'Curated equipment catalog')}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              {t('carefullySelectedProductsForPerformanceDurabilityAndEasyMaintenance', 'Carefully selected products for performance, durability, and easy\r\n              maintenance.')}
            </p>
          </div>

          {/* <div className="rounded-xl border border-line bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="center h-9 w-9 rounded-full bg-blue-500/10 text-blue-500">
                <CreditCard size={18} />
              </span>
              <span className="text-xs font-semibold text-green-600">
                Secure
              </span>
            </div>
            <p className="text-sm font-semibold text-main">
              Secure online checkout
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Safe payment flow with transparent pricing and no hidden surprises
              at checkout.
            </p>
          </div> */}

          <div className="rounded-xl border border-line bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="center h-9 w-9 rounded-full bg-yellow-500/10 text-yellow-500">
                <Truck size={18} />
              </span>
              <span className="text-xs font-semibold text-green-600">
                {t('reliable', 'Reliable')}
              </span>
            </div>
            <p className="text-sm font-semibold text-main">
              {t('deliveryAcrossServiceAreas', 'Delivery across service areas')}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              {t('fastDispatchForEssentialItemsAndSmoothLogisticsForLargerEquipmentOrders', 'Fast dispatch for essential items and smooth logistics for larger\r\n              equipment orders.')}
            </p>
          </div>
        </div>
      </div>

      <div className="main rounded-2xl border border-line bg-secondary/70 px-5 py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-primary">
              {t('needHelpSelectingTheRightSetup', 'Need help selecting the right setup?')}
            </p>
            <p className="mt-1 text-sm text-main/80">
              {t('speakWithOurTeamOrSendUsYourRequirementsAndWeWillGuideYouToTheRightPoolAndSpaProducts', 'Speak with our team or send us your requirements and we will guide\r\n              you to the right pool and spa products.')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+34951172808"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              <PhoneCall size={16} />
              {t('bookACall', 'Book a Call')}
            </a>
            <a
              href="mailto:info@qualitypoolspa.es"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-background px-5 text-sm font-semibold text-main transition-colors hover:bg-secondary"
            >
              <Mail size={16} />
              {t('emailUs', 'Email Us')}
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
