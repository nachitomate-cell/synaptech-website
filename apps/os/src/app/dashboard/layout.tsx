"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Layers,
  BarChart3,
  HeadphonesIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
} from "lucide-react";
import { StatusDot } from "@synaptech/ui";

const NAV = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Inicio" },
  { href: "/dashboard/servicios",icon: Layers,           label: "Mis Servicios" },
  { href: "/dashboard/metricas", icon: BarChart3,        label: "Métricas" },
  { href: "/dashboard/soporte",  icon: HeadphonesIcon,   label: "Soporte" },
  { href: "/dashboard/config",   icon: Settings,         label: "Configuración" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex-shrink-0 flex flex-col border-r border-white/[0.06] bg-[#0A0A0A] overflow-hidden z-20"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-syn-lime flex items-center justify-content-center flex-shrink-0 flex items-center justify-center">
            <Zap size={16} className="text-black" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-display font-bold text-white text-sm whitespace-nowrap"
              >
                SynapTech OS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  active
                    ? "bg-syn-lime/10 text-syn-lime"
                    : "text-neutral-500 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${active ? "text-syn-lime" : "group-hover:text-white"}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 w-0.5 h-6 bg-syn-lime rounded-r"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-white/[0.06] space-y-1">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.04] transition-all text-sm"
          >
            <LogOut size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  Cerrar sesión
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-neutral-600 hover:text-white hover:bg-white/[0.04] transition-all"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl flex-shrink-0">
          <div>
            <h1 className="font-display font-bold text-white text-sm">
              SynapTech OS
            </h1>
            <p className="text-neutral-500 text-xs">Centro de control</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusDot label="Sistemas operativos" />
            <div className="w-8 h-8 rounded-full bg-syn-lime/20 border border-syn-lime/30 flex items-center justify-center">
              <span className="text-syn-lime font-bold text-xs">IM</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="p-6 h-full"
          >
            {children}
          </motion.div>
        </main>

        {/* Powered by watermark */}
        <div className="px-6 py-3 border-t border-white/[0.04] flex justify-end">
          <span className="text-[10px] text-neutral-700 tracking-widest uppercase">
            Powered by SynapTech Neural Engine
          </span>
        </div>
      </div>
    </div>
  );
}
