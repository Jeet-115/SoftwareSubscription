import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import api from "../../utils/axios";

const labelIconMap = {
  email: <FiMail className="mr-2" />,
  phone: <FiPhone className="mr-2" />,
  hours: <FiClock className="mr-2" />,
  address: <FiMapPin className="mr-2" />,
};

const LegalContentPage = ({ slug, title, subtitle, showContactForm = false }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/legal/${slug}`);
        setContent(res.data);
      } catch (err) {
        console.error("Failed to load legal content", err);
        setError(
          err.response?.data?.message ||
            "Unable to load this page. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "", message: "" });

    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    try {
      const res = await api.post("/legal/contact-message", formState);
      setFormStatus({ type: "success", message: res.data.message });
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error", err);
      setFormStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "We could not send your message right now. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-text-light">
        Loading {title}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 text-center text-text-light">
        <FiAlertTriangle className="mb-3 text-4xl text-red-400" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-5xl px-4 py-10"
    >
      <header className="mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-primary-light">
          Updated {content?.updatedAt || "recently"}
        </p>
        <h1 className="text-4xl font-bold text-[#6e6670] text-text-light">{title}</h1>
        <p className="mt-3 text-base text-text-light">
          {subtitle || content?.subtitle || ""}
        </p>
      </header>

      {content?.details && (
        <div className="mb-8 grid gap-4 rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-5 sm:grid-cols-2 shadow-xl backdrop-blur-lg">
          {content.details.map((detail) => {
            const normalizedLabel = detail.label.toLowerCase();
            const icon =
              labelIconMap[
                normalizedLabel.includes("email")
                  ? "email"
                  : normalizedLabel.includes("phone")
                  ? "phone"
                  : normalizedLabel.includes("hour")
                  ? "hours"
                  : normalizedLabel.includes("address")
                  ? "address"
                  : null
              ];

            return (
              <div key={detail.label} className="flex items-start rounded-lg bg-neutral-light/10 p-4">
                {icon && <span className="text-primary-light">{icon}</span>}
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-light">
                    {detail.label}
                  </p>
                  <p className="text-sm font-semibold text-text-light">
                    {detail.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="space-y-6">
        {content?.sections?.map((section) => (
          <div
            key={section.heading}
            className="rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg"
          >
            <h2 className="text-xl font-semibold text-text-light">
              {section.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-light">
              {section.body}
            </p>
          </div>
        ))}
      </section>

      {showContactForm && (
        <section className="mt-10 rounded-xl border border-primary-dark/40 bg-neutral-light/10 p-6 shadow-xl backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-text-light">
            Send us a message
          </h2>
          <p className="mb-4 text-sm text-text-light">
            Fill out the form and our support team will reach out within one business day.
          </p>
          {formStatus.message && (
            <div
              className={`mb-4 rounded-md px-4 py-2 text-sm ${
                formStatus.type === "success"
                  ? "bg-emerald-900/30 text-emerald-200 border border-emerald-500/60"
                  : "bg-red-900/30 text-red-200 border border-red-500/60"
              }`}
            >
              {formStatus.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-text-light">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-secondary-dark/40 bg-neutral-dark/30 px-3 py-2 text-sm text-text-light outline-none focus:border-primary-light"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-text-light">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  className="w-full rounded-md border border-secondary-dark/40 bg-neutral-dark/30 px-3 py-2 text-sm text-text-light outline-none focus:border-primary-light"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-text-light">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleFormChange}
                className="w-full rounded-md border border-secondary-dark/40 bg-neutral-dark/30 px-3 py-2 text-sm text-text-light outline-none focus:border-primary-light"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-text-light">
                Message*
              </label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleFormChange}
                rows="5"
                className="w-full rounded-md border border-secondary-dark/40 bg-neutral-dark/30 px-3 py-2 text-sm text-text-light outline-none focus:border-primary-light"
                placeholder="Share as many details as possible."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary-dark px-4 py-2 text-sm font-medium text-neutral-light hover:bg-primary-dark/80"
            >
              Send Message
            </button>
          </form>
        </section>
      )}
    </motion.div>
  );
};

export default LegalContentPage;
