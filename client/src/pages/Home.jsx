
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl rounded-xl border border-secondary-dark/50 bg-neutral-light/10 p-8 shadow-xl backdrop-blur-lg"
      >
        <header className="text-center mb-10">
          <motion.h1 variants={itemVariants} className="text-5xl font-extrabold mb-3 text-primary-light">
            ImportEase
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-text-light">
            Automated GSTR-2B, GSTR-2A & Tally Reconciliation Platform for CAs and Finance Teams
          </motion.p>
        </header>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <Link
            to="/register"
            className="inline-flex items-center bg-primary-DEFAULT hover:bg-primary-dark text-[#6e6670] font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiUserPlus className="mr-2" />
            Sign Up Now
          </Link>
          <Link
            to="/login"
            className="ml-4 inline-flex items-center border border-primary-light hover:bg-primary-light text-primary-light hover:text-text-DEFAULT font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FiLogIn className="mr-2" />
            Login
          </Link>
        </motion.div>

        <main>
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              About ImportEase
            </h2>
            <p className="text-text-light leading-relaxed">
              ImportEase is a GST automation and reconciliation platform designed for Chartered Accountants,
              tax consultants and finance teams. It converts raw GSTR-2B and GSTR-2A files from the GST portal
              into fully reconciled, ITC-verified and Tally-ready accounting data — eliminating manual entry,
              missed credits and compliance risk.
            </p>

          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              Why ImportEase Matters
            </h2>
            <p className="text-text-light mb-6 leading-relaxed">
              Every month, CAs and finance teams struggle to reconcile GSTR-2B, GSTR-2A and Purchase Registers
              manually. This leads to lost ITC, duplicate entries and audit exposure. ImportEase creates a
              controlled GST workflow where every invoice is verified, classified, tracked and safely
              transferred into Tally with full audit trail.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">ITC Protection</h3>
                <p className="text-text-light">
                  Never miss eligible credit. Pending invoices are tracked and carried forward until claimed.
                </p>
              </div>

              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Auto Reconciliation</h3>
                <p className="text-text-light">
                  Automatically matches GSTR-2B with GSTR-2A and Purchase Register to detect missing and duplicate bills.
                </p>
              </div>

              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Tally-Ready Output</h3>
                <p className="text-text-light">
                  Generates clean, ledger-mapped Excel files that import directly into Tally without rework.
                </p>
              </div>

              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Audit-Grade History</h3>
                <p className="text-text-light">
                  Every company, month and supplier is tracked with full GST compliance history.
                </p>
              </div>
            </div>

          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              What ImportEase Actually Does
            </h2>

            <ul className="text-text-light space-y-3 list-disc pl-6">
              <li>Processes raw GSTR-2B Excel and GSTR-2A CSV files from GST Portal</li>
              <li>Separates ITC eligible, RCM, mismatched and blocked invoices</li>
              <li>Allows CA to Accept, Reject or Hold invoices as Pending</li>
              <li>Tracks pending ITC across months and prevents duplicate claims</li>
              <li>Matches GST data with Tally Purchase Register</li>
              <li>Produces audit-ready Excel directly importable into Tally</li>
            </ul>
          </motion.section>


          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              Pricing & Subscription
            </h2>
            <div className="bg-neutral-dark/30 p-6 rounded-lg text-center">
              <p className="text-xl font-bold text-white">
                Yearly Plan: <span className="text-primary-light">₹ 3,000 / year</span>
              </p>
              <p className="text-md text-text-light mt-2">Renewal: ₹ 1,250 / year</p>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
};

export default Home;
