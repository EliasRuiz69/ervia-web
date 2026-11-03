import { cn } from "@/lib/utils";
import { Anim } from "./anim";

/** Burbuja de chat de una mini-demo. `from="agent"` a la izquierda (gris); `"client"` a la derecha (azul). */
export function ChatBubble({
  from,
  at,
  className,
  children,
}: {
  from: "client" | "agent";
  at?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const agent = from === "agent";
  return (
    <Anim
      at={at}
      from="translateY(2cqw) scale(0.96)"
      className={cn(
        "max-w-[84%] rounded-[2.4cqw] px-[2.8cqw] py-[1.5cqw] text-[4.4cqw] leading-[1.25]",
        agent
          ? "self-start rounded-bl-[0.6cqw] bg-surface-raised text-text-strong"
          : "self-end rounded-br-[0.6cqw] bg-blue-600 text-text-on-blue",
        className,
      )}
    >
      {children}
    </Anim>
  );
}
