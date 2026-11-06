/**
 * Brand and contact details live here so that replacing the placeholders
 * happens in one file. Everything below is placeholder content.
 */
export const siteConfig = {
  name: "Avlu",
  legalName: "Avlu Mülk Yönetimi",
  tagline: "Kısa Dönem Kiralama Yönetimi",
  description:
    "Airbnb ve Booking.com'daki kısa dönem kiralık mülkünüzü ilan hazırlığından misafir iletişimine, fiyatlandırmadan temizliğe kadar profesyonelce yönetiyoruz.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  ogImage: "/images/site/og.jpg",
  contact: {
    email: "merhaba@avlu.example",
    phoneDisplay: "+90 (212) 000 00 00",
    phoneHref: "tel:+902120000000",
    whatsappDisplay: "+90 (500) 000 00 00",
    whatsappHref: "https://wa.me/905000000000",
    address: "Örnek Mahallesi, Örnek Sokak No: 0, Beşiktaş / İstanbul",
    hours: "Hafta içi 09.00 – 18.00",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
} as const;

export const mainNav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Yönetim Planlarımız", href: "/management-plans" },
  { label: "Fiyatlandırma", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
] as const;

/** Linked from the footer only. */
export const secondaryNav = [{ label: "Hakkımızda", href: "/about" }] as const;

export const ownerCta = {
  label: "Mülkünüzü Listeleyin",
  href: "/list-your-property",
} as const;
