import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/agreement", label: "Agreement" },
  { to: "/report-sample", label: "Sample Report" },
  { to: "/pricing", label: "Price List" },
  { to: "/trade-referrals", label: "Trade Referrals" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-prose flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <img
            src={logoAsset.url}
            alt="Ottawa Full Spectrum Home Inspection logo"
            className="h-9 w-auto"
          />
          <span className="font-display text-sm sm:text-base font-semibold text-foreground leading-tight max-w-[220px] sm:max-w-[320px]">
            Ottawa Full Spectrum Home Inspection
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-muted data-[status=active]:text-primary data-[status=active]:bg-accent/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+17538863515"
            className="hidden xl:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" /> (753) 886-3515
          </a>
          <Link
            to="/book"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-glow hover:shadow-elegant"
          >
            Book Inspection
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border/60 transition-[max-height,opacity] duration-300",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-prose flex flex-col gap-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted data-[status=active]:text-primary data-[status=active]:bg-accent/40"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Book Inspection
          </Link>
        </div>
      </div>
    </header>
  );
}
