import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { legalDocuments } from "@/lib/data/legal";
import { mainNav, ownerCta, secondaryNav, siteConfig } from "@/lib/site-config";

const headingClass = "mb-4.5 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white";
const linkClass = "text-[0.92rem] text-white/68 transition-colors duration-300 hover:text-clay";

export function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="bg-ink text-white/68">
      <Container className="pb-8 pt-16 md:pt-18">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 rounded-card border border-white/10 bg-white/5 px-7 py-7 md:flex-row md:items-center md:px-9">
          <div>
            <p className="font-display text-[1.35rem] font-semibold text-white">Eviniz bizimle ne kadar kazanır?</p>
            <p className="mt-1 text-[0.92rem]">Ücretsiz değerlendirme için kısa formu doldurun, size dönelim.</p>
          </div>
          <ButtonLink href={ownerCta.href} className="shrink-0">
            Ücretsiz Teklif Al
          </ButtonLink>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed">
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
              <li className="max-w-60 text-[0.92rem]">{contact.address}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>Sosyal Medya</h2>
            <ul className="flex flex-wrap gap-2.5">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex h-10 items-center rounded-full bg-white/8 px-4 text-[0.86rem] font-semibold text-white transition-colors duration-300 hover:bg-clay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.84rem] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalDocuments.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/legal/${doc.slug}`} className="transition-colors duration-300 hover:text-clay">{doc.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
