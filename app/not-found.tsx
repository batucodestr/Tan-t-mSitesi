import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pb-24 pt-36">
      <Container>
        <p className="eyebrow mb-6 text-clay">404</p>
        <h1 className="text-display-xl max-w-3xl">Aradığınız sayfayı bulamadık.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft">Sayfa taşınmış veya kaldırılmış olabilir.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Ana Sayfaya Dönün</ButtonLink>
          <ButtonLink href="/management-plans" variant="outline" arrow={false}>Yönetim Planlarımız</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
