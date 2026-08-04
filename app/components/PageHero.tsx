import Link from "next/link";
import { Icon } from "./Icon";

export function PageHero({ eyebrow, title, intro, trail }: { eyebrow: string; title: string; intro: string; trail?: string }) {
  return <section className="page-hero">
    <div className="page-hero-photo" /><div className="page-hero-grid" />
    <div className="container page-hero-inner">
      <div className="breadcrumb"><Link href="/">Inicio</Link><span>/</span><span>{trail ?? eyebrow}</span></div>
      <p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{intro}</p>
      <div className="page-hero-accent"><i /><span>LEXFLEX · CRITERIO Y ESTRATEGIA</span><Icon name="arrow" size={17} /></div>
    </div>
  </section>;
}
