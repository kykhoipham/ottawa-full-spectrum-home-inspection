import { createFileRoute } from "@tanstack/react-router";
import {
  Plug, Building2, Droplets, Droplet, Waves, Wind, PaintRoller, HardHat,
  Home, Layers, Flame, Fuel, Refrigerator, DoorOpen, ClipboardCheck, Hammer,
  BrickWall, GlassWater, ThermometerSun, Bug, Gauge, PanelsTopLeft,
  Phone, Mail, Globe,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/trade-referrals")({
  head: () => ({
    meta: [
      { title: "Trade Referrals — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "A vetted directory of Ottawa-area trades — electricians, plumbers, engineers, roofers, HVAC techs and more — we trust to fix inspection findings." },
      { property: "og:title", content: "Trade Referrals" },
      { property: "og:description", content: "Trusted local trades to handle your inspection findings." },
      { property: "og:url", content: "https://ottawa-full-spectrum-home-inspection.lovable.app/trade-referrals" },
    ],
    links: [{ rel: "canonical", href: "https://ottawa-full-spectrum-home-inspection.lovable.app/trade-referrals" }],
  }),
  component: TradeReferrals,
});

type Company = {
  name: string;
  detail?: string;
  contact?: string;
  phones?: { display: string; tel: string }[];
  email?: string;
  website?: string;
};

type Category = {
  icon: typeof Plug;
  name: string;
  companies: Company[];
};

const CATEGORIES: Category[] = [
  {
    icon: Plug,
    name: "Master Licensed Electricians",
    companies: [
      { name: "Scott Ross", detail: "Master Electrician", phones: [{ display: "613-591-5581", tel: "+16135915581" }], email: "sross@ardoch.ca", website: "http://www.ardoch.ca/" },
      { name: "Andrei Khvorostian", detail: "Master Electrician", phones: [{ display: "613-883-2239", tel: "+16138832239" }], email: "kanduan@gmail.com" },
      { name: "J.A.R. Electric Inc.", contact: "Justin Leblanc, Project Manager", phones: [{ display: "613-407-2856", tel: "+16134072856" }], website: "http://www.jarelectric.ca/" },
    ],
  },
  {
    icon: Building2,
    name: "Structural Engineers",
    companies: [
      { name: "Bridget Devitt, M.Eng., P.Eng.", detail: "Director, Green In-Tents Inc.", phones: [{ display: "(613) 978-5336", tel: "+16139785336" }], email: "bdevitt@storm.ca" },
      { name: "Art Engineering Inc.", contact: "Art Ivanchouk, Ph.D., P.Eng., BBS", phones: [{ display: "(613) 836-0632", tel: "+16138360632" }], email: "art@artengineering.ca" },
      { name: "Keller Engineering", contact: "Matt Michaluk, P.Eng., President", phones: [{ display: "613-224-1594", tel: "+16132241594" }], website: "http://www.kellerengineering.com/" },
    ],
  },
  {
    icon: Droplets,
    name: "Septic Inspection",
    companies: [
      { name: "BIOBITE Inc.", detail: "Septic Inspection and Design", contact: "Robin Charette", phones: [{ display: "(613) 227-4558", tel: "+16132274558" }], email: "robin@biobite.ca" },
      { name: "VEOLIA Environmental Services", detail: "Sewer inspections", phones: [{ display: "(613) 739-1150", tel: "+16137391150" }] },
      { name: "Manotick Pumping", contact: "Dan Wright", phones: [{ display: "(613) 258-4550", tel: "+16132584550" }], email: "info@manotickpumping.ca", website: "https://manotickpumping.ca/" },
    ],
  },
  {
    icon: Droplet,
    name: "Plumbing Contractors",
    companies: [
      { name: "Out of This World Plumbing", phones: [{ display: "613-801-6680", tel: "+16138016680" }], website: "http://www.outofthisworldhomeservices.com/" },
      { name: "LuKa Plumbing and Contracting Inc.", contact: "Luciano Pellecchia", phones: [{ display: "(613) 435-8521", tel: "+16134358521" }, { display: "(613) 790-8159 (cell)", tel: "+16137908159" }] },
      { name: "Dr. Pipe", phones: [{ display: "613-791-5777", tel: "+16137915777" }], website: "http://www.ottawaplumbernow.com/" },
    ],
  },
  {
    icon: Waves,
    name: "Sewer Inspection",
    companies: [
      { name: "Aqua Drain Sewer Service Inc.", phones: [{ display: "613-731-5500", tel: "+16137315500" }, { display: "1-866-809-1504", tel: "+18668091504" }], website: "http://www.aquadrain.ca/" },
      { name: "Dr. Pipe", phones: [{ display: "613-791-5777", tel: "+16137915777" }], website: "http://www.ottawaplumbernow.com/" },
    ],
  },
  {
    icon: Wind,
    name: "Environmental, Mold & Asbestos",
    companies: [
      { name: "Indoor Air Quality Ottawa", contact: "Shawn Rankin", phones: [{ display: "613-821-0035", tel: "+16138210035" }], website: "http://www.indoorairqualityottawa.ca/" },
      { name: "ASBEX", detail: "Asbestos Removal & Mould Abatement", phones: [{ display: "(613) 228-1080", tel: "+16132281080" }], website: "http://www.asbex.net/" },
      { name: "Healthy Home Center", contact: "Gabriel Zaragoza", phones: [{ display: "613-293-0744", tel: "+16132930744" }], website: "http://www.healthyhomecenter.ca/" },
    ],
  },
  {
    icon: PaintRoller,
    name: "Painting Contractors",
    companies: [
      { name: "Molnar Painting", contact: "Albert Molnar", phones: [{ display: "613-794-9707", tel: "+16137949707" }] },
    ],
  },
  {
    icon: HardHat,
    name: "General Contractors",
    companies: [
      { name: "Gala Style Home Renovation", contact: "Alexander & Galina Doulov", phones: [{ display: "(613) 692-1844", tel: "+16136921844" }, { display: "(613) 863-7470", tel: "+16138637470" }], website: "http://www.gala-style.com/" },
      { name: "Bruchhaeuser Carpentry", contact: "Ziggy", phones: [{ display: "(613) 225-8848", tel: "+16132258848" }] },
    ],
  },
  {
    icon: Home,
    name: "Roofing Contractors",
    companies: [
      { name: "RoofMaster Ottawa Inc.", contact: "J. Balsara, BASc., MHA, President", phones: [{ display: "(613) 521-0088", tel: "+16135210088" }, { display: "(613) 371-8271 (cell)", tel: "+16133718271" }], website: "http://www.roofmaster.net/" },
      { name: "Sanderson Roofing", phones: [{ display: "613-233-9369", tel: "+16132339369" }], website: "http://www.sandersonroofing.com/" },
    ],
  },
  {
    icon: Layers,
    name: "Foundation Contractors",
    companies: [
      { name: "Ardel Concrete Services", contact: "Chris De La Roche", phones: [{ display: "(613) 761-8919", tel: "+16137618919" }], website: "http://www.ardelconcrete.com/" },
      { name: "Ottawa Structural", contact: "Michael O'Neill", phones: [{ display: "613-226-1234", tel: "+16132261234" }], website: "http://www.ottawastructural.com/" },
      { name: "The Foundation Guys", contact: "Gerald Sirois", phones: [{ display: "(613) 680-7979", tel: "+16136807979" }], website: "http://www.ottawafoundationsupportworks.ca/" },
    ],
  },
  {
    icon: Flame,
    name: "HVAC Contractors",
    companies: [
      { name: "Glocon Inc.", contact: "Daniel Niedopytalski", phones: [{ display: "(613) 864-0211 (cell)", tel: "+16138640211" }] },
      { name: "Capital Heating and Cooling Inc.", website: "http://www.capitalcityheatingandcooling.com/" },
      { name: "Tim Suitter", phones: [{ display: "(613) 274-0220 (office)", tel: "+16132740220" }, { display: "(613) 223-1976 (cell)", tel: "+16132231976" }] },
      { name: "L.I.T. Plumbing", detail: "Heating & Plumbing", contact: "Egor Sinitsyn", phones: [{ display: "(343) 202-0303", tel: "+13432020303" }] },
    ],
  },
  {
    icon: Fuel,
    name: "Oil Technicians",
    companies: [
      { name: "Mannion Pump & Petroleum (East)", contact: "Sean Mannion", phones: [{ display: "(613) 256-4890", tel: "+16132564890" }, { display: "1-866-386-7867", tel: "+18663867867" }] },
    ],
  },
  {
    icon: Refrigerator,
    name: "Home Appliances",
    companies: [
      { name: "Home Appliance Care", phones: [{ display: "613-822-7630", tel: "+16138227630" }], website: "http://www.homeappliancecare.com/" },
    ],
  },
  {
    icon: DoorOpen,
    name: "Windows & Doors",
    companies: [
      { name: "Buildmart", detail: "Installation, Service, Warranty", phones: [{ display: "1-844-680-8414", tel: "+18446808414" }], website: "http://www.buildmart.ca/" },
      { name: "OakView Windows & Doors Services", contact: "Paul Lavigne", phones: [{ display: "(613) 274-7500", tel: "+16132747500" }] },
      { name: "PaneFullyClear Window Solutions", detail: "Thermal Pane Moisture Removal", contact: "Grant Minard, Manager", phones: [{ display: "(613) 821-0135", tel: "+16138210135" }, { display: "1-888-776-8883", tel: "+18887768883" }] },
    ],
  },
  {
    icon: ClipboardCheck,
    name: "Fire Code & Building Consultants",
    companies: [
      { name: "R. Viau Drafting & Design", contact: "Robert Viau", phones: [{ display: "(613) 748-6157", tel: "+16137486157" }], email: "rviaudrafting@on.aibn.com" },
      { name: "A One Systems", contact: "Pierre Castonguay", phones: [{ display: "(613) 833-3368", tel: "+16138333368" }, { display: "(613) 850-3361", tel: "+16138503361" }] },
    ],
  },
  {
    icon: Hammer,
    name: "Hardwood Flooring",
    companies: [
      { name: "Masterpiece Hardwood Flooring", contact: "Marcin Kozniewski, Owner", phones: [{ display: "(613) 260-1925", tel: "+16132601925" }, { display: "(613) 266-0168 (cell)", tel: "+16132660168" }] },
      { name: "European Hardwood Flooring Inc.", contact: "Franco Provenzano, Owner", phones: [{ display: "(613) 731-2929", tel: "+16137312929" }] },
      { name: "Mr. Hardwood", contact: "Denis Brazeau, Owner", phones: [{ display: "(613) 724-8863 (cell)", tel: "+16137248863" }, { display: "(613) 834-8888", tel: "+16138348888" }] },
    ],
  },
  {
    icon: BrickWall,
    name: "Masonry & Bricklayers",
    companies: [
      { name: "Gills Brosseau", phones: [{ display: "(613) 558-2676", tel: "+16135582676" }] },
      { name: "MH Stoneworks", contact: "David Watson", phones: [{ display: "(613) 282-1233", tel: "+16132821233" }] },
      { name: "RJW Stonemasons", contact: "Dan Brenna", phones: [{ display: "(613) 223-6784", tel: "+16132236784" }] },
    ],
  },
  {
    icon: GlassWater,
    name: "Well & Water Testing",
    companies: [
      { name: "Capital Water Supply Ltd.", detail: "Stittsville, ON", phones: [{ display: "613-836-1766", tel: "+16138361766" }] },
      { name: "Moe Rayyes", phones: [{ display: "613-878-1975 (cell)", tel: "+16138781975" }], website: "http://www.waterinspection.ca/" },
    ],
  },
  {
    icon: ThermometerSun,
    name: "WETT Inspections",
    companies: [
      { name: "Pierre Potvin", phones: [{ display: "819-827-3356", tel: "+18198273356" }] },
      { name: "Capital Chimney Sweep Inc.", phones: [{ display: "613-837-1645", tel: "+16138371645" }, { display: "613-860-1665", tel: "+16138601665" }], website: "http://www.capitalchimney.com/" },
    ],
  },
  {
    icon: Bug,
    name: "Pest Control",
    companies: [
      { name: "Abell Pest Control", contact: "Jeff Bow", phones: [{ display: "613-723-8114", tel: "+16137238114" }], website: "http://www.abellpestcontrol.com/" },
      { name: "Nature's Way Property Service", phones: [{ display: "(613) 220-4145", tel: "+16132204145" }] },
    ],
  },
  {
    icon: Gauge,
    name: "Energy Audit",
    companies: [
      { name: "EcoHomeInspectors", detail: "Energy Audit", contact: "Choun E", phones: [{ display: "(613) 218-6339", tel: "+16132186339" }] },
    ],
  },
  {
    icon: PanelsTopLeft,
    name: "Siding & Stucco Specialists",
    companies: [
      { name: "Waltex Wall Systems", contact: "Khaled Issa", phones: [{ display: "(613) 978-9757", tel: "+16139789757" }] },
    ],
  },
];

function TradeReferrals() {
  return (
    <>
      <PageHeader
        eyebrow="Trade Referrals"
        title="Local trades we trust with our own homes."
        description="Findings are only useful if you know who can fix them. Below is our network of Ottawa-area trades — vetted for quality, fair pricing, and follow-through."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="rounded-2xl bg-accent/30 ring-1 ring-border p-6 md:p-8 mb-16">
          <p className="text-sm text-foreground leading-relaxed">
            <strong className="font-semibold">How referrals work:</strong> We don't take
            kickbacks. These are trades we've worked alongside, watched on job sites, and
            had clients return positive feedback on. Feel free to contact them directly —
            mention Ottawa Full Spectrum Home Inspection when you call.
          </p>
        </div>

        <div className="space-y-16">
          {CATEGORIES.map((cat) => (
            <section key={cat.name}>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/40 text-primary">
                  <cat.icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold">{cat.name}</h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {cat.companies.map((c) => (
                  <article
                    key={c.name}
                    className="rounded-2xl bg-card p-6 ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-elegant"
                  >
                    <h3 className="font-display text-lg font-semibold leading-snug">{c.name}</h3>
                    {c.detail && <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>}
                    {c.contact && <p className="mt-1 text-sm text-muted-foreground">{c.contact}</p>}

                    <ul className="mt-4 space-y-2 text-sm">
                      {c.phones?.map((p) => (
                        <li key={p.tel}>
                          <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <Phone className="h-3.5 w-3.5 text-primary" /> {p.display}
                          </a>
                        </li>
                      ))}
                      {c.email && (
                        <li>
                          <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors break-all">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-primary" /> {c.email}
                          </a>
                        </li>
                      )}
                      {c.website && (
                        <li>
                          <a
                            href={c.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors break-all"
                          >
                            <Globe className="h-3.5 w-3.5 shrink-0 text-primary" />
                            {c.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </a>
                        </li>
                      )}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-forest p-8 md:p-12 text-primary-foreground shadow-elegant">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Need a referral right now?</h2>
          <p className="mt-3 text-cream/85 max-w-xl">
            Already had your inspection elsewhere or facing an urgent issue? Reach out
            and we'll connect you with the right trade in our network.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+16137203515" className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-primary hover:-translate-y-0.5 transition-transform">
              <Phone className="h-4 w-4" /> (613) 720-3515
            </a>
            <a href="mailto:info@OFShomeinspection.com" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream/20">
              <Mail className="h-4 w-4" /> Email Khoi
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
