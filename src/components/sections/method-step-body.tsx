import type { MethodStep } from "@/content/method-steps";

const DT = "text-[15px] font-semibold text-blue-300";
const DD = "text-[16px] leading-[1.55] text-text-body";

/** Contenido de un paso del método: nombre, promesa, qué hacemos, te llevas y tiempo. Común a las dos variantes. */
export function MethodStepBody({ step }: { step: MethodStep }) {
  return (
    <>
      <h3 className="text-[clamp(26px,2.4vw,30px)] leading-[1.2]">{step.name}</h3>
      <p className="mt-2 text-[18px] leading-[1.45] font-semibold text-text-strong">{step.promise}</p>

      <dl className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <dt className={DT}>Qué hacemos</dt>
          <dd className={DD}>{step.what}</dd>
        </div>
        <div className="flex flex-col gap-1 rounded-md border border-border-blue bg-surface-blue-tint p-4">
          <dt className={DT}>Te llevas</dt>
          <dd className="text-[16px] leading-[1.55] text-text-strong">{step.gets}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className={DT}>Tiempo</dt>
          <dd className={DD}>{step.time}</dd>
        </div>
      </dl>
    </>
  );
}
