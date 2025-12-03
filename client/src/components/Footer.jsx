const Footer = () => {
  return (
    <footer className="border-t border-secondary-dark/20 bg-transparent py-4">
      <div className="mx-auto max-w-5xl px-4 text-center text-xs text-text-light">
        &copy; {new Date().getFullYear()} Software Subscription. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
