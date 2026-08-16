import { createFileRoute } from "@tanstack/react-router";
import { ShieldHalf } from "lucide-react";
import { Sidebar } from "@/components/cyberlab/Sidebar";
import { TopBar } from "@/components/cyberlab/TopBar";
import { StatCards } from "@/components/cyberlab/StatCards";
import { ThreatMap } from "@/components/cyberlab/ThreatMap";
import { GlobeCard } from "@/components/cyberlab/GlobeCard";
import {
  Agents,
  AiInsights,
  AttackPaths,
  NewsFeed,
  SocLite,
  SystemState,
  Tools,
} from "@/components/cyberlab/panels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberLab – Dashboard SOC & Threat Intelligence" },
      {
        name: "description",
        content:
          "Tableau de bord CyberLab : détection des menaces en temps réel, attack paths, agents Kali, vulnérabilités et analyses IA.",
      },
      { property: "og:title", content: "CyberLab – Dashboard SOC & Threat Intelligence" },
      {
        property: "og:description",
        content:
          "Supervision cyber en temps réel : menaces, actifs, vulnérabilités critiques et insights IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 space-y-4 p-3 pb-24 lg:pl-0">
          <h1 className="sr-only">CyberLab – Dashboard de supervision cybersécurité</h1>
          <StatCards />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.05fr_0.75fr_0.85fr]">
            <ThreatMap />
            <GlobeCard />
            <AttackPaths />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SocLite />
            <Agents />
            <Tools />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <SystemState />
            <AiInsights />
            <NewsFeed />
          </div>
        </main>
      </div>

      <footer
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/80 py-2.5 text-center backdrop-blur-xl"
        style={{ boxShadow: "0 -12px 40px -24px var(--primary)" }}
      >
        <p className="flex flex-wrap items-center justify-center gap-2 font-display text-sm font-bold">
          <ShieldHalf className="h-4 w-4 text-cyan" />
          CyberLab –{" "}
          <span className="text-cyan neon-text">Une longueur d'avance sur les menaces</span>
        </p>
        <p className="text-xs text-muted-foreground">
          IA · Automation · Intelligence collective · Sécurité proactive
        </p>
      </footer>
    </div>
  );
}
