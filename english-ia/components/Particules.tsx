// components/Particules.tsx
'use client';

import { motion } from 'framer-motion';

const PARTICULES = [
  { id: 1, taille: 12, x: 100, y: 200, opacite: 0.2 },
  { id: 2, taille: 8, x: 400, y: 150, opacite: 0.15 },
  { id: 3, taille: 15, x: 700, y: 300, opacite: 0.25 },

];

export default function Particules() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {PARTICULES.map((particule) => (
        <motion.div
          key={particule.id}
          className="absolute rounded-full bg-blue-400/10 dark:bg-blue-200/10"
          initial={{
            x: particule.x,
            y: particule.y,
            width: particule.taille,
            height: particule.taille,
            opacity: particule.opacite
          }}
          animate={{
            x: particule.x + 50 * Math.sin(Date.now() / 2000),
            y: particule.y + 30 * Math.cos(Date.now() / 3000),
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      ))}
    </div>
  );
}