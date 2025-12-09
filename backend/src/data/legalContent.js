const legalContent = {
  contact: {
    title: "Contact Us",
    subtitle:
      "We are here to help with billing, subscription access, security incidents, or integration questions.",
    details: [
      { label: "Support Email", value: "jeetmistry115@gmail.com" },
      { label: "Billing Email", value: "importease@protonmail.com" },
      { label: "Phone", value: "+91 97370 46657" },
      {
        label: "Hours",
        value: "Monday to Friday, 10:00 AM – 7:00 PM IST (excluding public holidays)",
      },
      {
        label: "Registered Address",
        value: "Vadodara, Gujarat, India",
      },
    ],
    sections: [
      {
        heading: "Customer Support",
        body:
          "For technical issues, subscription activations, account changes, or security concerns, email importease@protonmail.com. We aim to acknowledge critical incidents within 4 business hours and non-critical requests within 1 business day.",
      },
      {
        heading: "Partnerships",
        body:
          "To collaborate with ImportEase or explore white-label opportunities, write to importease@protonmail.com.",
      },
      {
        heading: "Escalations",
        body:
          "If a request remains unresolved for more than 3 business days, escalate by emailing importease@protonmail.com with your ticket ID. For security incidents that require immediate escalation, call the phone number above.",
      },
    ],
    updatedAt: "2025-12-09",
  },

  shipping: {
    title: "Delivery & Activation",
    subtitle:
      "ImportEase is delivered as digital software. Activation and subscription management are handled online.",
    sections: [
      {
        heading: "Digital Delivery",
        body:
          "After successful payment, access credentials, activation tokens and download links are delivered to the registered email and the dashboard. There is no physical shipment.",
      },
      {
        heading: "Processing Time",
        body:
          "Subscription activation is normally immediate. Where manual review is required, activation may take up to 12 hours. We notify the buyer by email if additional verification is needed.",
      },
      {
        heading: "Failed Delivery",
        body:
          "If you do not receive activation instructions within 1 hour of payment (or within 12 hours in case of manual review), contact importease@protonmail.com with your order ID and payment reference.",
      },
      {
        heading: "Geographic Availability",
        body:
          "ImportEase is sold to and supported for customers in India. For cross-border purchases or enterprise deployments, contact importease@protonmail.com before purchasing.",
      },
    ],
    updatedAt: "2025-12-09",
  },

  terms: {
    title: "Terms and Conditions",
    subtitle:
      "By installing, accessing, or using ImportEase you accept these Terms. Read carefully before purchase or installation.",
    sections: [
      {
        heading: "Account Responsibility",
        body:
          "You are solely responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must notify ImportEase immediately of any unauthorized use or security breach. ImportEase is not liable for losses resulting from compromised credentials where reasonable care was not taken.",
      },
      {
        heading: "License & Use Restrictions",
        body:
          "Subject to full payment of fees, ImportEase grants you a limited, non-exclusive, non-transferable, revocable license to use the software for the subscription term and only in accordance with these Terms. Each license is bound to the registered account and may be device-limited. Redistribution, resale, sublicensing, modification, copying, reverse engineering, decompilation, disassembly, circumvention of licensing controls, or creation of derivative works is expressly prohibited unless you have separate written authorization from ImportEase.",
      },
      {
        heading: "License Enforcement & Revocation",
        body:
          "ImportEase may enforce license compliance using activation tokens, device binding, usage telemetry, and a license server. In cases of suspected misuse, piracy, or breach of these Terms, ImportEase may suspend or terminate access, revoke activation tokens, and remotely disable functionality where technically feasible. ImportEase will notify the account email and provide a reasonable opportunity to cure non-fraudulent breaches where practicable. For repeated or fraudulent misuse, ImportEase reserves the right to permanently terminate service without refund.",
      },
      {
        heading: "Payment, Auto-Renewal & Collections",
        body:
          "All fees are payable in advance. Subscriptions auto-renew unless cancelled prior to renewal. Failure of payment allows ImportEase to suspend access until payment is made. Fees, taxes, and gateway charges are your responsibility. ImportEase may engage collection agencies or use legal remedies for overdue balances.",
      },
      {
        heading: "Support & Updates",
        body:
          "Supported versions and update policies are published on the dashboard. Security updates and patches may be applied automatically; update packages are digitally signed. Continued use of the software after updates implies acceptance of changes.",
      },
      {
        heading: "Data & Privacy",
        body:
          "ImportEase will process personal data per the Privacy Policy. ImportEase collects account, billing, and limited usage data to enforce licenses, detect abuse, and improve service. We do not sell personal data. For enterprise customers, a Data Processing Agreement is available on request.",
      },
      {
        heading: "Security & Incident Response",
        body:
          "ImportEase implements industry-standard security controls. In the event of a security incident involving personal data, ImportEase will notify affected accounts and regulators as required by applicable law and will provide remediation actions within a reasonable timeframe.",
      },
      {
        heading: "Audit Rights",
        body:
          "ImportEase reserves the right to audit license usage and account activity (via automated telemetry or review) to verify compliance. ImportEase may request records and cooperation; failure to cooperate may be treated as breach permitting remedial action including termination.",
      },
      {
        heading: "Limitation of Liability & Indemnity",
        body:
          "To the fullest extent permitted by law: (a) ImportEase's aggregate monetary liability for any claim arising out of or relating to these Terms shall not exceed the total fees paid by you in the 12 months preceding the claim; (b) ImportEase is not liable for indirect, incidental, special, punitive, or consequential damages, including lost profits or business interruption; (c) You agree to indemnify and hold ImportEase and its officers harmless from third-party claims arising from your misuse of the software, violation of law, or breach of these Terms.",
      },
      {
        heading: "Termination",
        body:
          "ImportEase may suspend or terminate access for violation of these Terms or suspected fraud. Upon termination for cause, ImportEase is not obligated to refund any fees. If ImportEase terminates without cause, pro-rated refunds may be issued at ImportEase's discretion.",
      },
      {
        heading: "Governing Law & Dispute Resolution",
        body:
          "These Terms are governed by the laws of India. Exclusive jurisdiction for disputes is with the courts in Mumbai, Maharashtra. Parties may agree to mediation or arbitration before court action; any arbitration will take place in Mumbai and be conducted in English.",
      },
      {
        heading: "Severability & Changes",
        body:
          "If any provision is held unenforceable, the remainder remains in effect. ImportEase may update these Terms; material changes will be notified via email and dashboard notice. Continued use after notice constitutes acceptance.",
      },
    ],
    updatedAt: "2025-12-09",
  },

  cancellations: {
    title: "Cancellations and Refunds",
    subtitle:
      "Transparent refund rules and a formal process to request refunds for qualifying issues.",
    sections: [
      {
        heading: "Subscription Cancellation",
        body:
          "You may cancel subscriptions anytime from the dashboard. Cancelling disables auto-renewal; access remains until the end of the paid term. Cancellation does not automatically entitle you to a refund.",
      },
      {
        heading: "Refund Eligibility",
        body:
          "Pro-rated refunds are available only within 7 days of purchase for verified, unresolved technical defects that effectively prevent use of the core features of ImportEase and that ImportEase support cannot reasonably resolve. Refunds are not available for change-of-mind, user error, misuse, or breaches of these Terms.",
      },
      {
        heading: "Refund Procedure",
        body:
          "To request a refund, email importease@protonmail.com with order ID, registered email, and detailed evidence of the defect. ImportEase will investigate and respond within 5 business days. Approved refunds will be processed within 7 business days to the original payment method.",
      },
      {
        heading: "Fraud & Abuse",
        body:
          "If an account is suspended or terminated due to fraud, abuse, or repeated violation of these Terms, refund requests will be denied.",
      },
    ],
    updatedAt: "2025-12-09",
  },

  privacy: {
    title: "Privacy Policy (summary)",
    subtitle:
      "How we collect, use, store and protect your personal and telemetry data.",
    sections: [
      {
        heading: "What We Collect",
        body:
          "We collect account information (name, email), billing details for payment processing, device identifiers (for license binding), error and usage telemetry (to detect abuse and improve product), and minimal logs required for fraud detection and support.",
      },
      {
        heading: "Purpose & Legal Basis",
        body:
          "Data is processed to provide subscriptions, enforce licensing, detect fraud, comply with legal obligations, and deliver support. Processing is necessary for contract performance, fraud prevention, and legitimate interests (product improvement and security).",
      },
      {
        heading: "Retention & Deletion",
        body:
          "We retain account and billing records as required by law and for legitimate business purposes. Users may request data access, correction or deletion by contacting importease@protonmail.com; deletion requests may be limited where retention is required for legal or fraud-prevention reasons.",
      },
      {
        heading: "Security Controls",
        body:
          "We use transport encryption (TLS), data encryption at rest, role-based access, secure secret management, password hashing (bcrypt or equivalent) and logging/monitoring to protect data. Access to production systems is restricted and logged.",
      },
      {
        heading: "Third Parties & Processors",
        body:
          "We share data only with vetted processors (payment gateways, email providers, analytics) under contracts that require similar data protections. Cross-border transfers will comply with applicable law.",
      },
      {
        heading: "Breach Notification",
        body:
          "In the event of a personal data breach, ImportEase will notify affected users and regulators as required by applicable law and will publish incident details and remediation steps on the dashboard where appropriate.",
      },
    ],
    updatedAt: "2025-12-09",
  },

  additionalPolicies: {
    ipProtection: {
      title: "Intellectual Property & Anti-Circumvention",
      body:
        "All intellectual property rights in ImportEase (including source code, binaries, logos, trademarks, and documentation) are owned by ImportEase or its licensors. Any attempt to remove, obscure or tamper with copyright notices, licensing checks, digital signatures, or to bypass anti-tamper or activation mechanisms is strictly prohibited and will be treated as infringement for which ImportEase may seek injunctive relief, statutory damages and criminal prosecution where applicable.",
    },

    dmca: {
      title: "DMCA & Copyright Claims",
      body:
        "If you believe your copyrighted material was used in ImportEase without permission, please follow the DMCA takedown process by contacting importease@protonmail.com with a compliant takedown notice. ImportEase will respond in accordance with applicable law.",
    },

    securityIncidentProcedure: {
      title: "Security Incident Response",
      body:
        "Report suspected vulnerabilities or incidents immediately to importease@protonmail.com. We maintain a coordinated vulnerability disclosure program. We will acknowledge reports within 72 hours and provide remediation timelines as appropriate. Unauthorized vulnerability disclosure that facilitates exploitation may lead to termination and legal action.",
    },

    telemetryNotice: {
      title: "Telemetry & Anti-Piracy Measures",
      body:
        "ImportEase may collect anonymized and account-linked telemetry to detect piracy, abuse, crashes, and to improve the product. Telemetry helps detect multiple activations from the same license, suspicious usage patterns, or reverse-engineered clients. You may opt-out of non-essential telemetry via the dashboard where permitted by law; essential telemetry required for license enforcement cannot be disabled.",
    },

    enterpriseDPA: {
      title: "Enterprise & Data Processing Agreement (DPA)",
      body:
        "For enterprise customers handling personal or sensitive data, ImportEase can enter into a DPA that sets out responsibilities, security measures, subprocessors, and data subject rights handling. Contact importease@protonmail.com to request a DPA.",
    },

    contactForLegal: {
      title: "Legal & Law Enforcement Requests",
      body:
        "Subpoenas, court orders, or law enforcement requests should be sent to importease@protonmail.com. We respond to lawful requests consistent with applicable laws and our privacy obligations.",
    },
  },

  // metadata
  publishedAt: "2025-12-09",
};

export default legalContent;
