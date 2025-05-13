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
  ChevronDown,
  Bot,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
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

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Immersion Vocale",
      description: "Technologie de reconnaissance vocale temps réel",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Traduction Neuronale",
      description: "Traductions contextuelles instantanées",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "IA Adaptative",
      description: "Apprentissage personnalisé à votre rythme",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navbar Intégrée */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mr-2"
              >
                <Bot className="h-5 w-5" />
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300"
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
            <div className="flex items-center gap-4">
              {/* Theme Switcher Ultra Moderne */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <motion.div
                  className={`w-5 h-5 rounded-full shadow-lg ${
                    theme === 'dark' 
                      ? 'bg-yellow-300 shadow-yellow-400/30' 
                      : 'bg-white shadow-gray-400/20'
                  }`}
                  initial={false}
                  animate={{
                    x: theme === 'dark' ? 28 : 0,
                    transition: { type: 'spring', stiffness: 500, damping: 30 }
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    boxShadow: theme === 'dark' 
                      ? '0 0 10px 3px rgba(234, 179, 8, 0.3)' 
                      : '0 0 10px 3px rgba(156, 163, 175, 0.2)'
                  }}
                />
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? (
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
          {mobileMenuOpen && (
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
                                onClick={() => setMobileMenuOpen(false)}
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
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Connexion
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Essai gratuit
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Contenu Principal */}
      <main className="pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>Nouveauté</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                    Maîtrisez l'Anglais
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-300">
                    avec l'IA
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Une révolution dans l'apprentissage des langues. Parlez, pratiquez et progressez avec un coach IA personnel disponible 24h/24.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="px-8 py-6 text-lg">
                    <Link href="/Chat">Commencer maintenant</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                    <Link href="/demo">Voir la démo</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl -z-10" />
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Bot className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interface LinguaAI</h3>
                      <p className="text-gray-500 dark:text-gray-400">Conversation fluide avec correction en temps réel</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                  Pourquoi choisir
                </span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-300">
                  LinguaAI ?
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Une expérience d'apprentissage révolutionnaire combinant les dernières avancées en IA et en neurosciences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à révolutionner votre anglais ?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Commencez votre essai gratuit dès aujourd'hui et découvrez la puissance de l'IA pour l'apprentissage des langues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/signup">Essai gratuit</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg text-white border-white hover:bg-white/10">
                  <Link href="/demo">Voir la démo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">
                  Lingua<span className="text-blue-600 dark:text-blue-400">AI</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                La plateforme d'apprentissage de l'anglais la plus avancée, propulsée par l'IA.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produit</h3>
              <ul className="space-y-2">
                {['Fonctionnalités', 'Tarifs', 'Nouveautés'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                {['Blog', 'Documentation', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                {['À propos', 'Contact', 'Carrières'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
              © 2023 LinguaAI. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                Confidentialité
              </Link>
              <Link href="#" className="text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}