import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img
              src={logoAsset}
              alt="Ottawa Full Spectrum Home Inspection logo"
              className="h-[52px] w-auto"
            />
            <span className="font-display text-base sm:text-lg font-semibold text-primary-foreground leading-snug tracking-tight max-w-[260px] sm:max-w-[360px]">
              Ottawa Full Spectrum Home Inspection
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/75 leading-relaxed">
            Detail-driven home inspections across the National Capital Region.
            Honest reporting, clear photos, and answers you can actually use.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Visit
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2 text-primary-foreground/85">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>29 Cremona Crest<br />Ottawa, ON, Canada</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="flex items-center gap-2 text-primary-foreground/85 hover:text-primary-foreground" href="tel:+17538863515">
                <Phone className="h-4 w-4" /> (753) 886-3515
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-primary-foreground/85 hover:text-primary-foreground break-all" href="mailto:khoipham@ottawafullspectrumhomeinspection.com">
                <Mail className="h-4 w-4 shrink-0" /> khoipham@ottawafullspectrumhomeinspection.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-prose flex flex-col gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ottawa Full Spectrum Home Inspection. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/agreement" className="hover:text-primary-foreground">Inspection Agreement</Link>
            <Link to="/contact" className="hover:text-primary-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
