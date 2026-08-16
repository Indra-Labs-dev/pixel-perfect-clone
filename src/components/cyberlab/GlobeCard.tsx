import { Lock, ShieldAlert, Wifi } from "lucide-react";
import globeImg from "@/assets/globe.jpg";

const MARKERS = [
  { top: "24%", left: "88%", tone: "emerald", Icon: Lock },
  { top: "30%", left: "8%", tone: "violet", Icon: Wifi },
  { top: "56%", left: "22%", tone: "violet", Icon: ShieldAlert },
];

export function GlobeCard() {
  return (
    <div className="animate-rise relative grid place-items-center overflow-hidden rounded-2xl" style={{ animationDelay: "180ms" }}>
      <div className="relative w-full max-w-[420px]">
        <img
          src={globeImg}
          alt="Globe holographique des menaces mondiales CyberLab"
          width={1024}
          height={1024}
          className="animate-float w-full mix-blend-screen"
        />
        <div
          className="animate-spin-slow pointer-events-none absolute inset-x-6 bottom-8 h-24 rounded-[50%] border"
          style={{ borderColor: "color-mix(in oklab, var(--cyan) 45%, transparent)" }}
        />
        {MARKERS.map((m, i) => (
          <span
            key={i}
            className="absolute grid h-7 w-7 place-items-center rounded-full border backdrop-blur-sm"
            style={{
              top: m.top,
              left: m.left,
              borderColor: `var(--${m.tone})`,
              background: `color-mix(in oklab, var(--${m.tone}) 22%, transparent)`,
              boxShadow: `0 0 16px var(--${m.tone})`,
            }}
          >
            <m.Icon className="h-3.5 w-3.5" style={{ color: `var(--${m.tone})` }} />
            <span
              className="animate-ping-slow absolute inset-0 rounded-full border"
              style={{ borderColor: `var(--${m.tone})` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
