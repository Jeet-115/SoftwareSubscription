import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Contact Us", to: "/contact" },
    { label: "Shipping Policy", to: "/shipping-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Cancellations & Refunds", to: "/cancellations-and-refunds" },
    { label: "Privacy Policy", to: "/privacy-policy" },
  ];

  return (
    <footer className="border-t border-secondary-dark/20 bg-transparent py-6">
      <div className="mx-auto max-w-5xl px-4 text-center text-xs text-text-light">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-wide">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-text-light hover:text-primary-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p>&copy; {year} ImportEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
