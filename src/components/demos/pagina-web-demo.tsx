import { MessageCircle } from "lucide-react";

import { Anim, DemoFrame, Notification } from "./kit";

/**
 * Página web a medida (prioridad B).
 * Los bloques de una página caen y se acomodan; al final aparece "Nuevo cliente desde tu web".
 */
export function PaginaWebDemo({ alt }: { alt: string }) {
  return (
    <DemoFrame alt={alt}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2cqw] border border-border-default bg-surface-card">
        <div className="flex items-center gap-[1.4cqw] border-b border-border-subtle px-[3cqw] py-[2cqw]">
          {[0, 1, 2].map((n) => (
            <span key={n} className="size-[2cqw] rounded-full bg-navy-600" />
          ))}
          <span className="ml-[2cqw] rounded-pill bg-surface-deep px-[3cqw] py-[0.8cqw] text-[4.4cqw] leading-none text-text-muted">
            tallerjuan.mx
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[2.4cqw] p-[3.4cqw]">
          <Anim at={0} from="translateY(-4cqw)" className="h-[4.4cqw] w-[58%] rounded-[1cqw] bg-navy-600" />
          <Anim at={1} from="translateY(-4cqw)" className="h-[2.4cqw] w-[86%] rounded-pill bg-navy-700" />
          <Anim at={2} from="translateY(-4cqw)" className="h-[2.4cqw] w-[70%] rounded-pill bg-navy-700" />
          <Anim
            at={3}
            from="translateY(-4cqw)"
            className="mt-[1cqw] self-start rounded-pill bg-blue-500 px-[3.4cqw] py-[1.6cqw] text-[4.4cqw] leading-none font-semibold text-text-on-blue"
          >
            Escríbenos
          </Anim>
        </div>
      </div>

      <Notification
        icon={MessageCircle}
        at={6}
        className="absolute right-[4cqw] bottom-[4cqw]"
      >
        Nuevo cliente desde tu web
      </Notification>
    </DemoFrame>
  );
}
