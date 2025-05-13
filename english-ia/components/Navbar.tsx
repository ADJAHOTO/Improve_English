"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Sun, Moon, Menu, X, MessageSquare, Mic, Languages, ChevronDown, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "Produit",
      submenu: [
        { name: "Fonctionnalités", href: "/features", icon: <MessageSquare className="w-4 h-4" /> },
        { name: "Reconnaissance Vocale", href: "/voice", icon: <Mic className="w-4 h-4" /> },
        { name: "Traduction", href: "/translation", icon: <Languages className="w-4 h-4" /> },
      ],
    },
    { name: "Tarifs", href: "/pricing" },
    { name: "Ressources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white mr-2 shadow-lg shadow-violet-500/20"
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300"
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
                    <button className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium rounded-lg">
                      {item.name}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                              {subItem.icon && (
                                <span className="mr-2 text-violet-500 dark:text-violet-400">{subItem.icon}</span>
                              )}
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
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium rounded-lg"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Boutons côté droit */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 p-1 transition-all duration-300 group"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-5 h-5 rounded-full shadow-lg flex items-center justify-center ${
                  theme === "dark" ? "bg-violet-500 shadow-violet-500/30" : "bg-amber-400 shadow-amber-400/30"
                }`}
                initial={false}
                animate={{
                  x: theme === "dark" ? 28 : 0,
                  transition: { type: "spring", stiffness: 500, damping: 30 },
                }}
              >
                {theme === "dark" ? (
                  <Moon className="h-3 w-3 text-white" />
                ) : (
                  <Sun className="h-3 w-3 text-amber-900" />
                )}
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  boxShadow:
                    theme === "dark" ? "0 0 10px 3px rgba(139, 92, 246, 0.3)" : "0 0 10px 3px rgba(251, 191, 36, 0.3)",
                }}
              />
            </motion.button>

            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" className="px-4 font-medium">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button
                asChild
                className="px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20 font-medium"
              >
                <Link href="/signup">Essai gratuit</Link>
              </Button>
            </div>

            {/* Bouton Menu Mobile */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <div key={item.name} className="mb-2">
                  {item.submenu ? (
                    <div className="relative">
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium rounded-lg"
                      >
                        {item.name}
                        <ChevronDown
                          className={`ml-1 w-4 h-4 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                        />
                      </button>

                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-6 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.icon && (
                                <span className="mr-2 text-violet-500 dark:text-violet-400">{subItem.icon}</span>
                              )}
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Connexion
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20"
                >
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
  )
}