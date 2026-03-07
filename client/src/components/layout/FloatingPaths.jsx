import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingPaths({ position = 1 }) {
    const pos = position || 1;
    
    const allPaths = useMemo(() => {
        // Reduced structured paths count to 15 for better performance
        const structuredPaths = Array.from({ length: 15 }, (_, i) => ({
            id: `struct-${i}`,
            d: `M-${380 - i * 5 * pos} -${189 + i * 6}C-${
                380 - i * 5 * pos
            } -${189 + i * 6} -${312 - i * 5 * pos} ${216 - i * 6} ${
                152 - i * 5 * pos
            } ${343 - i * 6}C${616 - i * 5 * pos} ${470 - i * 6} ${
                684 - i * 5 * pos
            } ${875 - i * 6} ${684 - i * 5 * pos} ${875 - i * 6}`,
            width: 0.5 + i * 0.03,
            opacity: 0.25 + i * 0.03,
            duration: 20 + Math.random() * 10
        }));

        // Reduced random paths count to 5
        const randomPaths = Array.from({ length: 5 }, (_, i) => {
            const startX = Math.random() * 1000 - 200;
            const startY = Math.random() * 1000 - 200;
            const control1X = startX + (Math.random() * 400 - 200);
            const control1Y = startY + (Math.random() * 400 - 200);
            const control2X = control1X + (Math.random() * 400 - 200);
            const control2Y = control1Y + (Math.random() * 400 - 200);
            const endX = control2X + (Math.random() * 400 - 200);
            const endY = control2Y + (Math.random() * 400 - 200);

            return {
                id: `random-${i}`,
                d: `M${startX} ${startY} C${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`,
                width: 0.2 + Math.random() * 0.5,
                opacity: 0.1 + Math.random() * 0.1,
                duration: 15 + Math.random() * 15
            };
        });

        return [...structuredPaths, ...randomPaths];
    }, [pos]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full text-ink-30 dark:text-white opacity-50"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Paths</title>
                {allPaths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={path.opacity}
                        initial={{ pathLength: 0.3, opacity: 0.4 }}
                        animate={{
                            pathLength: [0.3, 1, 0.3],
                            opacity: [path.opacity * 0.5, path.opacity, path.opacity * 0.5],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
