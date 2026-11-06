import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { ownerCta, siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description: "Mülk yönetimi, fiyatlandırma ve iş birlikleri için bize e-posta, telefon veya WhatsApp üzerinden ulaşın.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phoneDisplay, phoneHref, whatsappDisplay, whatsappHref, address, hours } = siteConfig.contact;

  const channels = [
    { icon: Mail, label: "E-posta", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Telefon", value: phoneDisplay, href: phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: whatsappDisplay, href: whatsappHref, external: true },
  ];

  return (
    <>
      <PageIntro eyebrow="İletişim" title="Size nasıl yardımcı olabiliriz?">
        <p>Bir sorunuz veya yönetilmesini istediğiniz bir mülkünüz varsa yazın. Mesajınızı doğrudan ekibimiz yanıtlar.</p>
      </PageIntro>

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <ul className="border-t border-ink/80">
                {channels.map(({ icon: Icon, label, value, href, external }) => (
                  <li key={label} className="border-b border-line">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-5 py-6"
                    >
                      <Icon aria-hidden size={24} strokeWidth={1.1} className="shrink-0 text-clay" />
                      <span>
                        <span className="block text-sm text-ink-soft">{label}</span>
                        <span className="font-display text-display-sm transition-colors duration-300 group-hover:text-clay">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-5 border-b border-line py-6">
                  <MapPin aria-hidden size={24} strokeWidth={1.1} className="shrink-0 text-clay" />
                  <span>
                    <span className="block text-sm text-ink-soft">Ofis</span>
                    {address}
                  </span>
                </li>
                <li className="flex items-start gap-5 border-b border-line py-6">
                  <Clock aria-hidden size={24} strokeWidth={1.1} className="shrink-0 text-clay" />
                  <span>
                    <span className="block text-sm text-ink-soft">Çalışma saatleri</span>
                    {hours}
                  </span>
                </li>
              </ul>

              <div className="mt-10 bg-paper-deep p-7">
                <h2 className="text-display-sm">Mülkünüzü mü yönetmemizi istiyorsunuz?</h2>
                <p className="mt-3 text-ink-soft">Başvuru formu, mülkünüzü değerlendirmemiz için gereken her şeyi soruyor.</p>
                <TextLink href={ownerCta.href} className="mt-5">{ownerCta.label}</TextLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="mb-8 text-display-md">Bize yazın</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
