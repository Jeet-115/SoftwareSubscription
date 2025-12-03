
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
            Your Ultimate Excel-to-Tally Integration Partner
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
              ImportEase is a powerful, accountant-friendly software built especially for CAs, tax practitioners, and finance teams — designed to simplify and automate the often tedious job of processing Excel-based accounting data.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              Why ImportEase Matters
            </h2>
            <p className="text-text-light mb-6 leading-relaxed">
              Accounting teams and CAs often spend hours every month manually entering Excel-based data into Tally. These repetitive tasks are error-prone and drain precious time. ImportEase changes that by automating the data transfer, minimizing manual effort and maximizing accuracy.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Save Time</h3>
                <p className="text-text-light">Reduce manual data entry significantly.</p>
              </div>
              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Reduce Risk</h3>
                <p className="text-text-light">Catch errors before import.</p>
              </div>
              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Improve Compliance</h3>
                <p className="text-text-light">Ensure your GSTR-2B and other GST data is reconciled properly.</p>
              </div>
              <div className="bg-neutral-dark/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary-light">Scale Efficiently</h3>
                <p className="text-text-light">Handle large volumes of data without multiplying your workload.</p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary-dark/50 pb-2 text-primary-light">
              Pricing & Subscription
            </h2>
            <div className="bg-neutral-dark/30 p-6 rounded-lg text-center">
              <p className="text-xl font-bold text-white">
                Yearly Plan: <span className="text-primary-light">₹ 1,250 / year</span>
              </p>
              <p className="text-md text-text-light mt-2">Renewal: ₹ 1,000 / year</p>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
};

export default Home;
