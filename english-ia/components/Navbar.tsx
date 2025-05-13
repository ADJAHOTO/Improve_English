'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sun,
  Moon,
  Menu,
  X,
  MessageSquare,
  Mic,
  Languages,
  ChevronDown
} from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Produit',
      submenu: [
        { name: 'Fonctionnalités', href: '/features', icon: <MessageSquare className="w-4 h-4" /> },
        { name: 'Reconnaissance Vocale', href: '/voice', icon: <Mic className="w-4 h-4" /> },
        { name: 'Traduction', href: '/translation', icon: <Languages className="w-4 h-4" /> }
      ]
    },
    { name: 'Tarifs', href: '/pricing' },
    { name: 'Ressources', href: '/resources' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo avec effet de gradient animé */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M12 2v4" />
                <path d="m16.24 7.76 2.83-2.83" />
                <path d="M18 12h4" />
                <path d="m16.24 16.24 2.83 2.83" />
                <path d="M12 18v4" />
                <path d="m7.76 16.24-2.83 2.83" />
                <path d="M6 12H2" />
                <path d="m7.76 7.76-2.83-2.83" />
              </svg>
            </motion.div>
            <motion.span 
              className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${scrolled ? 'dark:from-blue-400 dark:to-indigo-300' : 'dark:from-blue-300 dark:to-indigo-200'}`}
              whileHover={{ scale: 1.05 }}
            >
              LinguaAI
            </motion.span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div
                    onMouseEnter={() => setOpenSubmenu(item.name)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                    className="relative"
                  >
                    <button className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg">
                      {item.name}
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Boutons côté droit */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher Moderne */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <motion.div
                  animate={{
                    opacity: theme === 'dark' ? 0 : 1,
                    y: theme === 'dark' ? 20 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="absolute inset-0 flex items-center justify-center text-gray-700"
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: theme === 'dark' ? 1 : 0,
                    y: theme === 'dark' ? 0 : -20,
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                  className="absolute inset-0 flex items-center justify-center text-yellow-400"
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" className="px-4">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild className="px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link href="/signup">Essai gratuit</Link>
              </Button>
            </div>

            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <div key={item.name} className="mb-2">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg"
                      >
                        {item.name}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>

                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-6 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
                              onClick={() => setMobileOpen(false)}
                            >
                              {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    Essai gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}