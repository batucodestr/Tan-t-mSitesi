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
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useIsScrolled();
  const menuRef = useRef<HTMLDialogElement>(null);

  // The homepage opens on a full-bleed photograph, so the header starts as dark glass.
  const overPhoto = pathname === "/" && !scrolled;
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <header
        data-solid={!overPhoto}
        className={cn(
          "site-header fixed inset-x-0 top-0 z-40 isolate transition-[padding,box-shadow,color] duration-500 ease-soft",
          overPhoto ? "py-4 text-white" : "py-2.5 text-ink shadow-[0_1px_0_var(--color-line)]",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1240px] items-center gap-6 px-4 sm:px-6">
          <Logo />

          <nav aria-label="Ana menü" className="ml-2 hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[0.94rem] font-semibold transition-colors duration-300",
                      overPhoto
                        ? "text-white/90 hover:bg-white/12 hover:text-white aria-[current=page]:bg-white/15 aria-[current=page]:text-white"
                        : "text-ink-soft hover:bg-ink/5 hover:text-ink aria-[current=page]:bg-clay-tint aria-[current=page]:text-clay-deep",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:block">
              <ButtonLink href={ownerCta.href} arrow={false} className="!min-h-11 !px-5 !py-2 !text-[0.92rem]">
                {ownerCta.label}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => menuRef.current?.showModal()}
              aria-label="Menüyü aç"
              className="-mr-2 flex size-11 items-center justify-center rounded-full lg:hidden"
            >
              <Menu aria-hidden size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Menü"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-paper text-ink backdrop:bg-transparent lg:hidden"
      >
        <div className="flex h-full flex-col px-4 sm:px-6">
          <div className="flex h-19 shrink-0 items-center justify-between">
            <Logo onClick={closeMenu} />
            <button type="button" onClick={closeMenu} aria-label="Menüyü kapat" className="-mr-2 flex size-11 items-center justify-center rounded-full">
              <X aria-hidden size={24} strokeWidth={2} />
            </button>
          </div>

          <nav aria-label="Mobil menü" className="mt-6 grow">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-2xl px-4 py-3.5 font-display text-3xl font-semibold transition-colors hover:bg-paper-deep aria-[current=page]:bg-clay-tint aria-[current=page]:text-clay-deep"
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
            <p className="mt-5 text-center text-sm font-semibold text-ink-soft">
              <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
