"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Globe, Zap, BookOpen, Check, Star, Bot, Mic, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"

export default function Home() {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Immersion Vocale",
      description: "Technologie de reconnaissance vocale temps réel pour une pratique naturelle",
      color: "from-violet-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Traduction Neuronale",
      description: "Traductions contextuelles instantanées avec compréhension sémantique",
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "IA Adaptative",
      description: "Apprentissage personnalisé qui s'adapte à votre niveau et vos objectifs",
      color: "from-emerald-500 to-teal-500",
      image: "/images/ia.webp",
    },
  ]

  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Étudiante en Master",
      content:
        "LinguaAI a transformé mon apprentissage de l'anglais. En 3 mois, j'ai atteint un niveau que je n'aurais jamais cru possible.",
      avatar: "/images/sophie.jpg",
    },
    {
      name: "Thomas Dubois",
      role: "Développeur Web",
      content: "La reconnaissance vocale est bluffante. C'est comme avoir un professeur particulier disponible 24h/24.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Marie Leroy",
      role: "Responsable Marketing",
      content:
        "Enfin une application qui s'adapte à mon emploi du temps chargé. Je pratique 15 minutes par jour et mes progrès sont remarquables.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  const plans = [
    {
      name: "Débutant",
      price: "Gratuit",
      features: ["Accès limité au chatbot", "5 sessions de conversation par mois", "Fonctionnalités de base"],
      cta: "Commencer",
      popular: false,
    },
    {
      name: "Premium",
      price: "19,99€/mois",
      features: [
        "Conversations illimitées",
        "Reconnaissance vocale avancée",
        "Exercices personnalisés",
        "Suivi de progression",
      ],
      cta: "Essai 14 jours",
      popular: true,
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      features: [
        "Tout Premium inclus",
        "Formation pour équipes",
        "Vocabulaire spécifique métier",
        "Tableau de bord administrateur",
      ],
      cta: "Contacter",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Contenu Principal */}
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Badge className="px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 mb-6 rounded-full">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Nouvelle version disponible
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-300">
                    Maîtrisez l'Anglais
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-300">
                    avec l'IA
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Une révolution dans l'apprentissage des langues. Parlez, pratiquez et progressez avec un coach IA
                  personnel disponible 24h/24.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="px-8 py-6 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20 font-medium"
                  >
                    <Link href="/Chat" className="flex items-center">
                      Commencer maintenant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg font-medium">
                    <Link href="/demo">Voir la démo</Link>
                  </Button>
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[
                      "https://randomuser.me/api/portraits/women/79.jpg",
                      "https://randomuser.me/api/portraits/men/52.jpg",
                      "https://randomuser.me/api/portraits/women/67.jpg",
                      "https://randomuser.me/api/portraits/men/43.jpg",
                    ].map((avatar, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"
                      >
                        <Image
                          src={avatar || "/placeholder.svg"}
                          alt={`User ${i + 1}`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-xs font-medium text-violet-800 dark:text-violet-300">
                      +2k
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Rejoint par <span className="font-semibold text-slate-900 dark:text-white">2,000+</span> apprenants
                    cette semaine
                  </div>
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
                <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl -z-10" />
                <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl -z-10" />

                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm">
                  <div className="p-1 bg-gradient-to-r from-violet-500 to-indigo-500">
                    <div className="flex items-center gap-2 px-3 py-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div className="text-xs text-white ml-2 opacity-70">LinguaAI Chat</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700/50 rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 dark:text-slate-300">
                        <p>Bonjour Sarah ! Comment puis-je t'aider avec ton anglais aujourd'hui ?</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 justify-end">
                      <div className="bg-violet-100 dark:bg-violet-900/30 rounded-2xl rounded-tr-none p-4 text-sm text-slate-700 dark:text-slate-300">
                        <p>J'aimerais pratiquer mon vocabulaire professionnel pour une réunion demain.</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src="https://randomuser.me/api/portraits/women/33.jpg"
                          alt="User"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700/50 rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 dark:text-slate-300">
                        <p>
                          Parfait ! Commençons par simuler une réunion d'affaires. Je vais jouer le rôle de votre
                          collègue.
                        </p>
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600/50">
                          <p className="font-medium">
                            Let's discuss the quarterly results. What are your thoughts on our performance?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center px-4">
                        <input
                          type="text"
                          placeholder="Écrivez votre réponse..."
                          className="flex-1 bg-transparent outline-none text-sm text-slate-700 dark:text-slate-300"
                        />
                        <button className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white">
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2">
                        ou <span className="text-violet-500 dark:text-violet-400 font-medium">parlez</span> directement
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 -bottom-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Précision</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">98% correcte</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Logos */}
          <div className="mt-20">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
              UTILISÉ PAR DES MILLIERS D'APPRENANTS DANS CES ENTREPRISES
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/180px-Apple_logo_black.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/320px-Microsoft_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png",
              ].map((logo, i) => (
                <div
                  key={i}
                  className="h-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`Logo d'entreprise ${i + 1}`}
                    width={96}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 mb-4 rounded-full">
                Fonctionnalités
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-300">
                  Pourquoi choisir
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-300">
                  LinguaAI ?
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Une expérience d'apprentissage révolutionnaire combinant les dernières avancées en IA et en
                neurosciences.
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
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div
                    className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{feature.description}</p>

                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      width={400}
                      height={225}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="px-4 py-1.5 text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 mb-4 rounded-full">
                  Apprentissage intelligent
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                  Progressez plus rapidement avec notre technologie adaptative
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Notre IA analyse votre niveau, vos erreurs fréquentes et votre style d'apprentissage pour créer un
                  parcours personnalisé qui maximise vos progrès.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: <BookOpen className="h-5 w-5" />,
                      title: "Contenu personnalisé",
                      desc: "Exercices et leçons adaptés à votre niveau",
                    },
                    {
                      icon: <Zap className="h-5 w-5" />,
                      title: "Correction en temps réel",
                      desc: "Feedback instantané sur votre prononciation et grammaire",
                    },
                    {
                      icon: <Globe className="h-5 w-5" />,
                      title: "Immersion culturelle",
                      desc: "Apprenez l'anglais dans des contextes réels et variés",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20"
                >
                  <Link href="/features">
                    Découvrir toutes les fonctionnalités
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-3xl blur-xl -z-10" />
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                  <div className="aspect-[4/3] flex items-center justify-center">
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                      alt="LinguaAI Dashboard"
                      width={600}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Progression</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">+27% cette semaine</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 mb-4 rounded-full">
                Témoignages
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Ce que nos utilisateurs disent
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Découvrez comment LinguaAI transforme l'apprentissage de l'anglais pour des milliers d'apprenants.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 italic">"{testimonial.content}"</p>
                  <div className="mt-6 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-amber-400" fill="currentColor" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 mb-4 rounded-full">
                Tarifs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Des forfaits adaptés à vos besoins
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Choisissez le plan qui correspond à vos objectifs d'apprentissage et à votre budget.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-slate-800 p-8 rounded-2xl border ${
                    plan.popular
                      ? "border-violet-200 dark:border-violet-800 shadow-xl shadow-violet-500/10"
                      : "border-slate-200 dark:border-slate-700 shadow-lg"
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="px-4 py-1 text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full">
                        Le plus populaire
                      </Badge>
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/20"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 mx-6 my-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="px-4 py-1.5 text-sm font-medium bg-white/20 text-white mb-6 backdrop-blur-sm rounded-full">
                Commencez dès aujourd'hui
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à révolutionner votre anglais ?</h2>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
                Commencez votre essai gratuit dès aujourd'hui et découvrez la puissance de l'IA pour l'apprentissage des
                langues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-6 text-lg bg-white text-violet-600 hover:bg-white/90 shadow-lg shadow-indigo-900/20"
                >
                  <Link href="/signup" className="flex items-center">
                    Essai gratuit de 14 jours
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg text-white border-white hover:bg-white/10"
                >
                  <Link href="/demo">Voir la démo</Link>
                </Button>
              </div>

              <p className="mt-6 text-indigo-200 text-sm">Aucune carte de crédit requise. Annulez à tout moment.</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">
                  Lingua<span className="text-violet-600 dark:text-violet-400">AI</span>
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                La plateforme d'apprentissage de l'anglais la plus avancée, propulsée par l'IA.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 rounded-full bg-current" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Produit</h3>
              <ul className="space-y-3">
                {["Fonctionnalités", "Tarifs", "Nouveautés"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Ressources</h3>
              <ul className="space-y-3">
                {["Blog", "Documentation", "FAQ", "Communauté"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Entreprise</h3>
              <ul className="space-y-3">
                {["À propos", "Contact", "Carrières", "Presse"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 dark:text-slate-500 mb-4 md:mb-0">© 2023 LinguaAI. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="#"
                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Conditions
              </Link>
              <Link
                href="#"
                className="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
