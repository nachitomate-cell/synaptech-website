"use client";
import { motion } from "framer-motion";

type HeadingTag = "h1" | "h2" | "h3";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: HeadingTag;
}

export default function RevealHeading({ children, className = "", delay = 0, as: Tag = "h2" }: Props) {
  return (
    <div className="overflow-hidden pb-1">
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
