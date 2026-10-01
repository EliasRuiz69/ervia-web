import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { LegalDoc } from "@/lib/legal";

/** Texto plano de los hijos de un nodo (para leer el número de sección de un h2). */
function toText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return toText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

const CHIP =
  "mx-0.5 inline-block rounded-pill border border-border-blue bg-surface-blue-tint px-3 py-0.5 align-baseline text-[13px] leading-normal font-semibold text-blue-300";

/** "[Necesarias]" (etiquetas del documento original) → chip azul. Los enlaces ya vienen resueltos por Markdown. */
function withChips(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return children
      .split(/(\[[^\]\n]{2,30}\])/g)
      .map((part, i) =>
        /^\[[^\]\n]{2,30}\]$/.test(part) ? (
          <span key={i} className={CHIP}>
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      );
  }
  if (Array.isArray(children)) {
    return children.map((c, i) => <span key={i} className="contents">{withChips(c)}</span>);
  }
  return children;
}

const linkClass =
  "text-blue-400 underline underline-offset-4 transition-colors duration-(--duration-fast) ease-out hover:text-blue-300";

const components: Components = {
  h2: ({ children }) => {
    const num = toText(children).match(/^(\d+)\./)?.[1];
    return (
      <h2
        id={num ? `s${num}` : undefined}
        className="mt-14 mb-5 scroll-mt-24 border-b border-border-default pb-3 text-[clamp(24px,3vw,30px)] leading-tight"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-[20px] leading-snug">{children}</h3>,
  p: ({ children }) => (
    <p className="mb-4 text-[17px] leading-[1.7] text-text-body md:text-[18px]">{withChips(children)}</p>
  ),
  ul: ({ children }) => <ul className="my-5 space-y-2.5">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal space-y-2.5 pl-6 marker:text-blue-400">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-6 text-[17px] leading-[1.65] text-text-body before:absolute before:left-0 before:text-blue-400 before:content-['–'] md:text-[18px] [ol>&]:pl-1 [ol>&]:before:content-none">
      {withChips(children)}
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-text-strong">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-[0.9em] text-text-strong">
      {children}
    </code>
  ),
  a: ({ href = "", children }) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      );
    }
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={linkClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-lg border border-border-blue bg-surface-blue-tint px-5 py-4 [&>p]:mb-0 [&>p+p]:mt-3 [&_a]:text-blue-300">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border-subtle" tabIndex={0} role="region" aria-label="Tabla desplazable">
      <table className="w-full min-w-[640px] border-collapse text-left text-[16px] leading-normal">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-surface-raised px-4 py-3 text-[13px] font-semibold tracking-overline text-text-muted uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-border-subtle px-4 py-3 align-top text-text-body">{withChips(children)}</td>
  ),
  hr: () => <hr className="my-10 border-border-subtle" />,
};

/**
 * Página legal con el sistema de diseño de la landing: fondo navy, DM Sans a 17–18 px y
 * ancho de lectura de ~70 caracteres. Los enlaces, guiones y chips van en azul (D-J).
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article id="top" className="border-b border-border-subtle">
      <Container narrow className="py-16 md:py-24">
        <div className="mx-auto max-w-[70ch]">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-[clamp(34px,5vw,52px)] leading-[1.1] tracking-tight">{doc.title}</h1>
          <p className="mt-4 text-[16px] text-text-muted">{doc.updated}</p>

          <div className="mt-8 rounded-lg border border-border-blue bg-surface-blue-tint px-5 py-4 text-[17px] leading-[1.7] text-text-body md:text-[18px] [&_p]:m-0 [&_a]:text-blue-300">
            <Markdown remarkPlugins={[remarkGfm]} components={components}>
              {doc.intro}
            </Markdown>
          </div>

          <nav
            aria-label="Índice de contenido"
            className="mt-10 rounded-lg border border-border-subtle bg-surface-card p-6 shadow-card"
          >
            <Eyebrow>Contenido</Eyebrow>
            <ol className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {doc.toc.map(({ num, label, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex min-h-11 items-baseline gap-3 py-2 text-[16px] text-text-body transition-colors duration-(--duration-fast) ease-out hover:text-text-strong"
                  >
                    <span className="min-w-6 text-[13px] font-semibold text-blue-400">{num}</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-6">
            <Markdown remarkPlugins={[remarkGfm]} components={components}>
              {doc.body}
            </Markdown>
          </div>
        </div>
      </Container>
    </article>
  );
}
