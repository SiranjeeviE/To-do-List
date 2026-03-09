import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    const particles = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 -z-10 bg-[#0d1117] overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-teal-500/20 rounded-full blur-xl"
                    initial={{
                        width: Math.random() * 200 + 100,
                        height: Math.random() * 200 + 100,
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0.1,
                    }}
                    animate={{
                        x: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
                        y: [Math.random() * 100 + '%', Math.random() * 100 + '%', Math.random() * 100 + '%'],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,178,172,0.1),transparent)]" />
        </div>
    );
};

export default AnimatedBackground;
