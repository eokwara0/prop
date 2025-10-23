'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const AnimatedHeader = () => {
  const t = useTranslations('Property');

  return (
    <motion.h1
      className=" text-wrap flex-wrap text-[150%] font-extrabold tracking-tighter flex gap-1"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
        hidden: {},
      }}
    >
      {t('title')
        .split('')
        .map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: -20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
    </motion.h1>
  );
};

export { AnimatedHeader };
