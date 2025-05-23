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
import { db, auth } from '@/lib/firebase/config'; // <-- Importez 'auth' ici
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAIResponse } from '@/lib/ai/openrouter';
import { Auth, onAuthStateChanged, User, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword } from 'firebase/auth'; // <-- Importez onAuthStateChanged, User et signInWithEmailAndPassword

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

// Type des messages
type Message = {
  id: number;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
  corrections: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
};

// Type des messages Gemini (nécessaire pour conversationHistory)
type AIConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

// Fonction pour appliquer les corrections de texte (référencée dans le JSX)
const applyCorrectionsToText = (text: string, corrections: Message['corrections']) => {
  let result = text;
  corrections.forEach(correction => {
    result = result.replace(
      correction.original,
      `<span class="relative group">
        <span class="underline decoration-wavy decoration-blue-300 dark:decoration-blue-500">${correction.original}</span>
        <span class="absolute bottom-full left-0 bg-blue-100 dark:bg-blue-900 text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          ${correction.corrected}
        </span>
      </span>`
    );
  });
  return result;
};

export default function ChatPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<AIConversationMessage[]>([]);
  const [user, setUser] = useState<User | null>(null); 

  // Effet pour le montage du composant (pour le thème)
  useEffect(() => {
    setMounted(true);

    // <-- Nouveau: Gérer l'état de l'authentification Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Utilisateur connecté
        setUser(currentUser);
        console.log("Utilisateur connecté:", currentUser.uid);
        // Ici, vous pourriez charger l'historique du chat de cet utilisateur si vous en avez un.
      } else {
        // Aucun utilisateur connecté
        setUser(null);
        console.log("Aucun utilisateur n'est connecté.");
        // Pour les tests, si vous n'avez pas de page de connexion, vous pouvez rediriger
        // ou afficher un message demandant à l'utilisateur de se connecter.
        // Ou, comme mentionné précédemment, si vous voulez juste que ça fonctionne pour le test
        // et n'avez pas de système de connexion actif, vous pouvez essayer de connecter
        // un utilisateur de test ici (attention, pas pour la production) :
         signInWithEmailAndPassword(auth, 'jeanbenissea@gmail.com', 'ben2004')
           .then((userCredential) => {
             setUser(userCredential.user);
             console.log("Utilisateur de test connecté pour le débug:", userCredential.user.uid);
           })
          .catch((error) => {
             console.error("Erreur de connexion de l'utilisateur de test:", error);
          });
      }
    });

    // Nettoyage de l'observateur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    // <-- Modification: Vérifier que l'utilisateur est connecté
    if (!inputValue.trim() || !user) {
      if (!user) {
        console.warn("Opération bloquée: Aucun utilisateur Firebase n'est connecté.");
        alert("Veuillez vous connecter pour envoyer des messages."); // Ou affichez un message plus élégant
      }
      return;
    }

    // Création du message utilisateur
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      corrections: []
    };

    // Mise à jour optimiste
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { text: aiText, corrections } = await getAIResponse([
        ...conversationHistory,
        { role: "user", content: inputValue }
      ]);

      // Message IA
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
        corrections: []
      };

      setConversationHistory(prev => [
        ...prev,
        { role: "user", content: inputValue },
        { role: "assistant", content: aiText }
      ]);

      // Affichage des corrections sur le message utilisateur si nécessaire
      if (corrections.length > 0) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { ...userMessage, corrections },
          aiMessage
        ]);
      } else {
        setMessages(prev => [...prev, aiMessage]);
      }

      // Sauvegarde Firestore
      await addDoc(collection(db, "chats"), {
        userId: user.uid, // <-- Nouveau: Ajoutez l'UID de l'utilisateur ici
        userInput: inputValue,
        aiResponse: aiText,
        corrections,
        createdAt: serverTimestamp(),
        theme: theme // Pour analyse future
      });

    } catch (error) {
      console.error("Erreur:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Désolé, une erreur est survenue. Veuillez réessayer.",
        sender: "ai",
        timestamp: new Date(),
        corrections: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

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
                {user ? `Connecté: ${user.email || 'N/A'}` : 'Non connecté'} {/* Affiche l'état de connexion */}
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
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  En train de répondre...
                </motion.span>
              ) : (
                "En ligne"
              )}
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
                  {/* Contenu du message avec corrections */}
                  <div
                    className={message.sender === 'ai' ?
                      'text-gray-800 dark:text-gray-200' :
                      'text-white'
                    }
                    dangerouslySetInnerHTML={{
                      __html: message.sender === 'user'
                        ? applyCorrectionsToText(message.text, message.corrections)
                        : message.text
                    }}
                  />

                  {/* Affichage des explications */}
                  {message.corrections.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
                    >
                      {/* Contenu des explications serait ici */}
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
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              size="icon"
              className={`rounded-full transition-all ${
                inputValue.trim().length > 0 && user // <-- Modification: Activez seulement si l'utilisateur est connecté
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
              disabled={inputValue.trim().length === 0 || isLoading || !user} // <-- Modification: Désactivé si pas d'utilisateur
              onClick={handleSend}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

// Implémentation réelle utilisant Firebase Auth
function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}
