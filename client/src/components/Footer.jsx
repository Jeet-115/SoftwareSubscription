const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-4">
      <div className="mx-auto max-w-5xl px-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Software Subscription. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;


