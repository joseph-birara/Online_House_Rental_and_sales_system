import { Link } from "react-router-dom";
import logo from "../../homiee_logo.png";
import heroImg from "../../pages/images/hp4.webp";

export default function AuthLayout({ title, subtitle, children, wide = false }) {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 sm:py-12">
      <div
        className={`mx-auto grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(9,18,64,0.12)] ${
          wide ? "max-w-5xl lg:grid-cols-[0.85fr_1.15fr]" : "max-w-4xl lg:grid-cols-2"
        }`}
      >
        <div className="relative hidden min-h-[320px] lg:block">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-blueBlack via-blueBlack/75 to-blueBlack/25" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <Link to="/" className="mb-8 inline-flex w-fit">
              <img src={logo} alt="Homiee" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-lightBlue">
              Homiee
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              Find, rent, or sell homes across Ethiopia
            </h2>
            <p className="mt-3 max-w-sm text-slate-200">
              A calm, trusted marketplace for homeowners, tenants, and buyers.
            </p>
          </div>
        </div>

        <div className="px-5 py-8 sm:px-10 sm:py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-blueBlack">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-slate-500">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
