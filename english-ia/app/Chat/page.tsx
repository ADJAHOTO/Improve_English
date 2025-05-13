'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Volume2, Languages, ChevronLeft, Moon, Sun, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

const messages = [
  {
    id: 1,
    text: "Welcome to your personalized English coaching session! I'm here to help you achieve fluency through natural conversation.",
    sender: "ai",
    timestamp: new Date(Date.now() - 3600000),
    corrections: []
  },
  {
    id: 2,
    text: "Je veux améliorer mon anglais pour mon travail dans la tech.",
    sender: "user",
    timestamp: new Date(Date.now() - 1800000),
    corrections: [
      { original: "pour mon travail", corrected: "for my job", explanation: "More natural in professional context" }
    ]
  },
  {
    id: 3,
    text: "Excellent focus! Let's practice technical vocabulary and business communication. What specific tech domain are you working in?",
    sender: "ai",
    timestamp: new Date(),
    corrections: []
  }
];

export default function ChatPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar élégante */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-80 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200 dark:border-gray-700 hidden lg:block backdrop-blur-lg"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/ai-avatar.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                AI
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className={cn("font-semibold", playfair.className)}>
                LinguaAI Coach
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Premium AI Tutor
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Today
          </h3>
          <div className="space-y-1">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>New Session</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <span className="text-sm font-medium">YO</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white dark:border-gray-800" />
            </div>
            <div>
              <h4 className="font-medium">Your Account</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Free Plan
              </p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Zone de chat principale */}
      <div className="flex-1 flex flex-col relative">
        {/* En-tête flottant */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white/80 dark:bg-gray-800/80 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 backdrop-blur-lg sticky top-0 z-10 shadow-sm"
        >
          <Link href="/" className="lg:hidden">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Avatar>
            <AvatarImage src="/ai-avatar.png" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className={cn("font-semibold", playfair.className)}>
              LinguaAI Coach
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <motion.span 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                En train de répondre...
              </motion.span>
            </p>
          </div>
          
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-auto rounded-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </Button>
          )}
        </motion.header>

        {/* Messages avec effet de profondeur */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.sender === 'ai' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative max-w-xs md:max-w-md rounded-3xl p-5 overflow-hidden ${
                    message.sender === 'ai' 
                      ? 'bg-white dark:bg-gray-700 shadow-md' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                  }`}
                >
                  {/* Effet de lumière */}
                  {message.sender === 'user' && (
                    <motion.div 
                      className="absolute inset-0 bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <p className={message.sender === 'ai' ? 'text-gray-800 dark:text-gray-200' : 'text-white'}>
                    {message.text}
                  </p>

                  <p className={`text-xs mt-2 ${
                    message.sender === 'ai' 
                      ? 'text-gray-500 dark:text-gray-400' 
                      : 'text-blue-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>

                  {/* Corrections */}
                  {message.corrections.length > 0 && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Suggestions d'amélioration:
                          </p>
                          {message.corrections.map((correction, i) => (
                            <div key={i} className="text-xs text-gray-600 dark:text-gray-400 mb-1 last:mb-0">
                              <span className="line-through mr-2">{correction.original}</span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">→ {correction.corrected}</span>
                              <span className="block text-gray-500 dark:text-gray-500 mt-0.5">
                                ({correction.explanation})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Champ de saisie futuriste */}
        <motion.footer 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white/80 dark:bg-gray-800/80 p-4 border-t border-gray-200 dark:border-gray-700 backdrop-blur-lg sticky bottom-0 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className={`rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                isSpeaking ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400' : ''
              }`}
              onClick={() => setIsSpeaking(!isSpeaking)}
            >
              <Mic className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <Languages className="h-5 w-5" />
            </Button>
            
            <Input 
              placeholder="Type your message in English..." 
              className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-full py-5 px-5 shadow-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            
            <Button 
              size="icon"
              className={`rounded-full transition-all ${
                inputValue.trim().length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
              disabled={inputValue.trim().length === 0}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}