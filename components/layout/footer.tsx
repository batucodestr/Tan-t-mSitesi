import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { legalDocuments } from "@/lib/data/legal";
import { mainNav, ownerCta, secondaryNav, siteConfig } from "@/lib/site-config";

const headingClass = "eyebrow mb-5 text-sand";
const linkClass = "text-paper/85 transition-colors duration-300 hover:text-clay-light";

export function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="bg-espresso text-paper">
      <Container className="pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-paper/70">
              Kısa dönem kiralık mülkleri ev sahipleri adına, otel titizliğiyle yönetiyoruz.
            </p>
          </div>

          <nav aria-label="Alt menü" className="lg:col-span-2">
            <h2 className={headingClass}>Menü</h2>
            <ul className="space-y-3">
              {[...mainNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link href={ownerCta.href} className={linkClass}>{ownerCta.label}</Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>İletişim</h2>
            <ul className="space-y-3">
              <li><a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a></li>
              <li><a href={contact.phoneHref} className={linkClass}>{contact.phoneDisplay}</a></li>
              <li><a href={contact.whatsappHref} className={linkClass} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li className="max-w-60 text-paper/70">{contact.address}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Sosyal Medya</h2>
            <ul className="space-y-3">
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass} target="_blank" rel="noopener noreferrer">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-espresso-line pt-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalDocuments.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/legal/${doc.slug}`} className="transition-colors duration-300 hover:text-paper">{doc.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
