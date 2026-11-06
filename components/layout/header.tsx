"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, ownerCta, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useIsScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 40,
    () => false,
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useIsScrolled();
  const menuRef = useRef<HTMLDialogElement>(null);

  // The homepage opens on a full-bleed photograph, so the header starts clear.
  const overPhoto = pathname === "/" && !scrolled;
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-soft",
          overPhoto ? "bg-transparent text-paper" : "border-b border-line bg-paper text-ink",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10 lg:px-16">
          <Logo />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "py-2 text-base font-medium transition-colors duration-300",
                      overPhoto
                        ? "text-paper/85 hover:text-paper aria-[current=page]:text-paper"
                        : "text-ink-soft hover:text-ink aria-[current=page]:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ButtonLink href={ownerCta.href} variant={overPhoto ? "paper" : "primary"} arrow={false} className="!min-h-11 !px-5 !py-2">
                {ownerCta.label}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => menuRef.current?.showModal()}
              aria-label="Menüyü aç"
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            >
              <Menu aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Menü"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-paper text-ink backdrop:bg-transparent lg:hidden"
      >
        <div className="flex h-full flex-col px-5 md:px-10">
          <div className="flex h-20 shrink-0 items-center justify-between">
            <Logo onClick={closeMenu} />
            <button type="button" onClick={closeMenu} aria-label="Menüyü kapat" className="-mr-2 flex size-11 items-center justify-center">
              <X aria-hidden size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Mobil menü" className="mt-8 grow">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block py-4 font-display text-4xl aria-[current=page]:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pb-8 pt-6">
            <ButtonLink href={ownerCta.href} onClick={closeMenu} className="w-full">
              {ownerCta.label}
            </ButtonLink>
            <p className="mt-5 text-center text-sm text-ink-soft">
              <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
