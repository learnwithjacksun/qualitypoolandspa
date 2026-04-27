import { useMemo, useState } from "react";
import { MainLayout } from "@/layouts";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PhoneCall,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonWithLoader, InputWithoutIcon, SelectWithoutIcon } from "@/components/ui";
import { contactSchema, type ContactSchema } from "@/schemas/contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

interface OfficeLocation {
  name: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

const officeLocations: OfficeLocation[] = [
  {
    name: i18next.t('marbella', 'Marbella'),
    address:
      i18next.t('qualityPoolSpaComplejoLidlCBeamarDeCalahondaLocal529649CalahondaMalagaSpain', 'Quality Pool & Spa, Complejo Lidl, C. Beamar de Calahonda, local 5, 29649 Calahonda, Malaga, Spain'),
    email: "info@qualitypoolspa.es",
    phone: i18next.t('34951172808', '+34 951 17 28 08'),
    whatsapp: i18next.t('34648126377', '+34 648 12 63 77'),
    facebook: "qualitypoolspain",
    instagram: "@qualitypoolspa.es",
    youtube: "@qualitypoolspa.es",
  },
  {
    name: i18next.t('mallorca', 'Mallorca'),
    address:
      i18next.t('qualitypoolSpaMallorcaCarrerDanselmTurmeda9Nord07010PalmaIllesBalearsSpain', 'Qualitypool & Spa Mallorca, Carrer d\'Anselm Turmeda, 9, Nord, 07010 Palma, Illes Balears, Spain'),
    email: "estepona@qualitypoolspa.es",
    phone: i18next.t('34951172808', '+34 951 17 28 08'),
    whatsapp: "+34 648448875",
    facebook: "qualitypoolspain",
    instagram: "@qualitypoolspa.es",
    youtube: "@qualitypoolspa.es",
  },
  {
    name: i18next.t('qualityPoolsEstepona', 'Quality Pools Estepona'),
    address:
      i18next.t('qualitypoolSpaEsteponaAvPuertaDelMar5929680EsteponaMalagaSpain', 'Qualitypool & Spa Estepona, Av. Puerta del Mar, 59, 29680 Estepona, Malaga, Spain'),
    email: "estepona@qualitypoolspa.es",
    phone: i18next.t('34951172808', '+34 951 17 28 08'),
    whatsapp: i18next.t('34638959111', '+34 638 959 111'),
    facebook: "qualitypoolspain",
    instagram: "@qualitypoolspa.es",
    youtube: "@qualitypoolspa.es",
  },
];

export default function Contact() {
  const { t } = useTranslation()
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const selectedLocation = officeLocations[selectedLocationIndex];

  const selectedMapUrl = useMemo(() => {
    const encodedAddress = encodeURIComponent(selectedLocation.address);
    return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  }, [selectedLocation.address]);

 const {register, handleSubmit, formState: {errors}} = useForm<ContactSchema>({
  resolver: zodResolver(contactSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
  },
 });

  const onSubmit = (data: ContactSchema) => {
    console.log(data);
  }

  return (
    <MainLayout>
      <div className="main mt-10 space-y-8">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-primary">
            {t('home', 'Home')}
          </Link>
          <ChevronRight size={14} />
          <span className="font-medium text-main">{t('contact', 'Contact')}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-space font-semibold text-primary md:text-3xl">
            {t('getInTouch', 'Get in touch')}
          </h2>
          <p className="max-w-2xl text-sm text-main/75 md:text-base">
            {t('wereHereToHelpYouWithAnyQuestionsOrConcernsYouMayHave', 'We\'re here to help you with any questions or concerns you may have.')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-background p-5 md:p-6 h-fit">
            <h3 className="text-lg font-medium font-space">{t('sendUsAMessage', 'Send us a message')}</h3>
            <p className="mt-1 text-sm text-muted">
              {t('fillOutTheFormAndWeWillGetBackToYouShortly', 'Fill out the form and we will get back to you shortly.')}
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 sm:grid-cols-2">
                <InputWithoutIcon
                  type="text"
                  label={t('firstName', 'First Name')}
                  placeholder={t('egJohn', 'e.g John')}
                  className="h-11 w-full rounded-xl border border-line bg-background px-3 text-sm placeholder:text-muted focus:border-primary/50"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <InputWithoutIcon
                  type="text"
                  label={t('lastName', 'Last Name')}
                  placeholder={t('egDoe', 'e.g Doe')}
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  className="h-11 w-full rounded-xl border border-line bg-background px-3 text-sm placeholder:text-muted focus:border-primary/50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputWithoutIcon
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  {...register("email")}
                  error={errors.email?.message}
                  className="h-11 w-full rounded-xl border border-line bg-background px-3 text-sm placeholder:text-muted focus:border-primary/50"
                />
                <InputWithoutIcon
                  type="tel"
                  label="Phone"
                  placeholder={t('34600000000', '+34 600 00 00 00')}
                  {...register("phone")}
                  error={errors.phone?.message}
                  className="h-11 w-full rounded-xl border border-line bg-background px-3 text-sm placeholder:text-muted focus:border-primary/50"
                />
              </div>

              <SelectWithoutIcon
                label={t('preferredBranch', 'Preferred Branch')}
                defaultValue={selectedLocation.name}
                {...register("branch")}
                error={errors.branch?.message}
                className="h-11 w-full rounded-xl border border-line bg-background px-3 text-sm placeholder:text-muted focus:border-primary/50"
                options={officeLocations.map((location) => ({
                  label: location.name,
                  value: location.name,
                }))}
              />

              <label className="space-y-1.5">
                <span className="text-sm font-medium text-muted">{t('message', 'Message')}</span>
                <textarea
                  placeholder={t('tellUsWhatProductsOrServicesYouNeed', 'Tell us what products or services you need...')}
                  rows={5}
                  {...register("message")}
                  
                  className="w-full mt-1 rounded-xl border border-line bg-background px-3 py-2.5 text-sm placeholder:text-muted focus:border-primary/50"
                />
                {errors.message?.message && <p className="text-red-500 text-xs font-medium">{errors.message?.message}</p>}
              </label>

              <ButtonWithLoader
                initialText="Send Message"
                loadingText="Sending..."
                className="h-11 w-full rounded-xl btn-primary text-sm font-medium mt-4"
              />
              
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-background p-5 shadow-sm md:p-6">
              <h3 className="text-lg font-medium font-space">
                {t('ourOffices', 'Our Offices')}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {t('chooseALocationToViewFullContactDetailsAndMap', 'Choose a location to view full contact details and map.')}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {officeLocations.map((location, index) => {
                  const isActive = selectedLocationIndex === index;
                  return (
                    <button
                      key={location.name}
                      type="button"
                      onClick={() => setSelectedLocationIndex(index)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-background"
                          : "border border-line bg-secondary text-main hover:bg-secondary/80"
                      }`}
                    >
                      {location.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 space-y-3 text-sm text-main/80">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  <p>{selectedLocation.address}</p>
                </div>
                <a
                  href={`mailto:${selectedLocation.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <Mail size={16} className="shrink-0 text-primary" />
                  {selectedLocation.email}
                </a>
                <a
                  href={`tel:${selectedLocation.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <PhoneCall size={16} className="shrink-0 text-primary" />
                  {selectedLocation.phone}
                </a>
                <a
                  href={`https://wa.me/${selectedLocation.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-primary"
                >
                  <PhoneCall size={16} className="shrink-0 text-primary" />{t('whatsappWhatsapp', 'WhatsApp: {{whatsapp}}', { whatsapp: selectedLocation.whatsapp })}</a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-main/80">
                <a
                  href="https://facebook.com/qualitypoolspain"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 hover:bg-secondary/80"
                >
                  <Facebook size={14} />
                  {selectedLocation.facebook}
                </a>
                <a
                  href="https://instagram.com/qualitypoolspa.es"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 hover:bg-secondary/80"
                >
                  <Instagram size={14} />
                  {selectedLocation.instagram}
                </a>
                <a
                  href="https://youtube.com/@qualitypoolspa.es"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-secondary px-3 py-1.5 hover:bg-secondary/80"
                >
                  <Youtube size={14} />
                  {selectedLocation.youtube}
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-line bg-background shadow-sm">
              <iframe
                title={t('googleMapForName', 'Google map for {{name}}', { name: selectedLocation.name })}
                src={selectedMapUrl}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[320px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
