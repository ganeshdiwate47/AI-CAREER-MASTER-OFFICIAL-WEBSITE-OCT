import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const RevealGroup = ({ children, className = "", stagger = 0.08 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.12 }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className = "", y = 24 }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
