'use client';
import { motion } from 'framer-motion';
import { Menu } from "@/components/Menu";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1 }}
        >
            <Menu/>
            {children}
        </motion.div>
    );
}