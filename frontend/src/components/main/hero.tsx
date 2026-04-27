import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <div className="relative overflow-hidden min-h-[500px] flex items-center">
      <img
        src="/background.png"
        alt={t('premiumPoolAndSpaSetup', 'Premium pool and spa setup')}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-slate-900/40" />
      <div className="main relative grid gap-6 text-white lg:grid-cols-[1.2fr_0.8fr] py-10 md:py-20">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            {t('westCoastSwedenPoolSpaShop', 'West Coast Sweden Pool & Spa Shop')}
          </span>

          <h1 className="max-w-2xl text-3xl font-space font-bold leading-tight md:text-5xl">
            {t('buildYourDreamPoolAndSpaSetupWithProgradeProducts', 'Build your dream pool and spa setup with pro-grade products.')}
          </h1>

          <p className="max-w-2xl text-sm text-white/85 md:text-base">
            {t('shopTrustedEquipmentAccessoriesAndMaintenanceEssentialsForHotTubsPoolsSaunasAndSpaSystemsCompareCategoriesAndOrderOnlineWithConfidence', 'Shop trusted equipment, accessories, and maintenance essentials for\r\n            hot tubs, pools, saunas, and spa systems. Compare categories and\r\n            order online with confidence.')}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/categories"
              className="inline-flex h-11 btn w-full md:w-auto items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              {t('shopNow', 'Shop Now')}
              <ShoppingBag size={16} />
            </Link>
            <Link
              to="/categories/hot-tubs"
              className="inline-flex h-11 btn w-full md:w-auto items-center gap-2 rounded-xl border border-white/30 px-5 text-sm font-semibold text-white transition-colors backdrop-blur bg-white/20 hover:bg-white/20"
            >
              {t('exploreHotTubs', 'Explore hot tubs')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
            <ShieldCheck size={18} className="mb-2" />
            <p className="text-sm font-semibold">Trusted Quality</p>
            <p className="mt-1 text-xs text-white/85">
              Durable products from reliable European suppliers.
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
            <Truck size={18} className="mb-2" />
            <p className="text-sm font-semibold">Fast Shipping</p>
            <p className="mt-1 text-xs text-white/85">
              Quick order processing and secure delivery options.
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
            <Headset size={18} className="mb-2" />
            <p className="text-sm font-semibold">Expert Guidance</p>
            <p className="mt-1 text-xs text-white/85">
              Need help choosing? Book a call with our team.
            </p>
          </div>
        </div> */}
        <div className="hidden md:block"/>
      </div>
    </div>
  );
}
