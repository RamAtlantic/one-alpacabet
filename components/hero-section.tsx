"use client"

import { MapPin, Play, Clock, Gift, Users } from "lucide-react"
import { useUserTracking } from "../app/context/tracking-context"
import { sendMetaEvent } from "@/services/metaEventService"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export function HeroSection() {
  
  const { sendTrackingData } = useUserTracking()
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [localidad, setLocalidad] = useState<string | null>(null)
  const [loadingLocalidad, setLoadingLocalidad] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsVisible(true)
    const fetchLocalidad = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json")
        const ip = ipResponse.data.ip
        const geoRes = await axios.get(`https://ipinfo.io/${ip}/json`)
        setLocalidad(geoRes.data.city)
      } catch (e: any) {
        console.warn("No se pudo obtener la localidad:", e.message)
      } finally {
        setLoadingLocalidad(false)
      }
    }
    fetchLocalidad()
  }, [])

  const handleWhatsAppClick = async () => {
    setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: true }))
    try {
      const tempEmail = `user_${Date.now()}@example.com`
      const success = await sendMetaEvent(tempEmail, "10")
      if (success) {
        console.log("Evento de registro enviado exitosamente a Meta")
      } else {
        console.warn("No se pudo enviar el evento a Meta")
      }
      try {
        await sendTrackingData()
        console.log("Datos de tracking enviados exitosamente")
      } catch (error) {
        console.warn("Error enviando datos de tracking:", error)
      }
      const whatsappUrl = "https://wa.me/5493416633244?text=Buenas,%20Me%20gustaria%20crear%20un%20usuario%20en%20Alpaca"
      window.location.href = whatsappUrl
    } catch (error) {
      console.error("Error en el proceso:", error)
      const whatsappUrl = "https://wa.me/5493416633244?text=Buenas,%20Me%20gustaria%20crear%20un%20usuario%20en%20Alpaca"
      window.location.href = whatsappUrl
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: false }))
    }
  }

  const CircularLoader = () => (
    <motion.div
      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      } as const,
    },
  }

  return (
    <section className="min-h-screen bg-[#15202C] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-3 py-4 md:py-10">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 md:space-y-16"
              >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center py-4 md:py-16">
                  <div className="flex justify-center">
                    <img
                      src="https://whitewallets.s3.amazonaws.com/alpacabet/commons/logo-fondo-oscuro-horizontal1736361556.png"
                      alt=""
                      className={`w-full h-auto ${isMobile ? "max-w-[280px]" : "max-w-[400px]"}`}
                    />
                  </div>
                  <motion.div className="max-w-4xl mx-auto">
                    <motion.p
                      className={`text-[#F01A4A] font-bold mb-2 md:mb-4 ${isMobile ? "text-lg" : "text-2xl md:text-xl"}`}
                    >
                      Tu lugar de confianza
                    </motion.p>
                    <motion.div
                      className={`grid gap-3 md:gap-6 mt-4 md:mt-8 ${isMobile ? "grid-cols-2" : "grid-cols-3 md:grid-cols-3"}`}
                    >
                      <motion.div
                        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? "p-3" : "p-6"}`}
                      >
                        <Clock className={`text-[#23D366] mx-auto mb-2 md:mb-3 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                        <p className={`text-white font-semibold ${isMobile ? "text-sm" : "text-xl"}`}>Atención 24hs. Todos los dias</p>
                      </motion.div>
                      {/* Botón CTA centrado en la versión de escritorio */}
                      {!isMobile && (
                        <motion.button
                          onClick={handleWhatsAppClick}
                          disabled={loadingStates["register"]}
                          className="group relative bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-400 hover:to-yellow-400 disabled:from-green-600 disabled:to-yellow-600 text-black font-black py-3 px-6 text-lg rounded-xl shadow-2xl overflow-hidden min-w-[200px] min-h-[50px] flex items-center justify-center gap-2"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="relative flex items-center gap-2">
                            {loadingStates["register"] ? (
                              <>
                                <CircularLoader />
                                <span>CONECTANDO...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-5 h-5" />
                                <span>Comenzar YA!</span>
                              </>
                            )}
                          </div>
                        </motion.button>
                      )}
                      <motion.div
                        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? "p-3" : "p-6"}`}
                      >
                        <Gift className={`text-[#F01A4A] mx-auto mb-2 md:mb-3 ${isMobile ? "w-6 h-6" : "w-8 h-8"}`} />
                        <p className={`text-white font-semibold ${isMobile ? "text-sm" : "text-xl"}`}>Extra 30% de bienvenida</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* CTA Section - Moved up for mobile */}
                {isMobile && (
                  <motion.div variants={itemVariants} className="text-center space-y-4">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-3">
                        <motion.p
                          className="text-white/60 text-sm"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          ↓ Contactanos por WhatsApp
                        </motion.p>
                        <motion.button
                          onClick={handleWhatsAppClick}
                          disabled={loadingStates["whatsapp"]}
                          className="bg-transparent text-white font-bold p-2 rounded-full shadow-lg"
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {loadingStates["whatsapp"] ? (
                            <CircularLoader />
                          ) : (
                            <img
                              src="https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png"
                              alt="WhatsApp"
                              className="w-6 h-6"
                            />
                          )}
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={handleWhatsAppClick}
                        disabled={loadingStates["register"]}
                        className="group relative bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-400 hover:to-yellow-400 disabled:from-green-600 disabled:to-yellow-600 text-black font-black py-3 px-6 text-lg rounded-xl shadow-2xl overflow-hidden min-w-[200px] min-h-[50px] flex items-center justify-center gap-2"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="relative flex items-center gap-2">
                          {loadingStates["register"] ? (
                            <>
                              <CircularLoader />
                              <span>CONECTANDO...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-5 h-5" />
                              <span>Comenzar YA!</span>
                            </>
                          )}
                        </div>
                      </motion.button>
                      {/* Location with Argentina Flag */}
                      <motion.div
                        className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-full"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(34, 197, 94, 0.3)",
                        }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                        >
                          🇦🇷
                        </motion.div>
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {loadingLocalidad ? (
                          <div className="h-4 bg-white/20 rounded animate-pulse w-16" />
                        ) : (
                          <span className="text-white font-medium text-sm">{localidad || "Argentina"}</span>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Video and Benefits Section */}
                <motion.div
                  variants={itemVariants}
                  className={`grid gap-6 md:gap-12 items-center ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}
                >
                  {/* Video - More prominent on mobile */}
                  <motion.div className="flex justify-center">
                    <motion.div
                      initial={isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, x: -200 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 1,
                        delay: isMobile ? 0.3 : 0.5,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                      }}
                      className={`relative ${isMobile ? "max-w-[300px]" : "max-w-xs sm:max-w-sm lg:max-w-lg"}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="relative border-4 border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                        <video
                          src="/alpaca.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Community Benefits */}
                  <motion.div className="space-y-4 md:space-y-6">
                    <motion.div
                      className={`bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-400/30 rounded-3xl backdrop-blur-xl ${isMobile ? "p-4" : "p-8"}`}
                    >
                      <Users className={`text-purple-400 mx-auto mb-2 md:mb-4 ${isMobile ? "w-8 h-8" : "w-12 h-12"}`} />
                      <h3
                        className={`font-bold text-center mb-2 md:mb-4 text-white ${isMobile ? "text-lg" : "text-2xl"}`}
                      >
                        Beneficios diarios en nuestra comunidad
                      </h3>
                      <p className={`text-center text-white/80 ${isMobile ? "text-sm" : "text-lg"}`}>
                        Pedime tu usuario VIP y disfruta de los beneficios diarios de nuestra Comunidad
                      </p>
                    </motion.div>

                    {/* CTA Section for Desktop */}
                    {!isMobile && (
                      <motion.div variants={itemVariants} className="text-center space-y-8">
                        <div className="flex flex-col items-center gap-6">
                          <div className="flex items-center gap-4">
                            <motion.p
                              className="text-white/60 text-lg"
                              animate={{
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              ↓ Contactanos por WhatsApp
                            </motion.p>
                            <motion.button
                              onClick={handleWhatsAppClick}
                              disabled={loadingStates["whatsapp"]}
                              className="bg-transparent text-white font-bold p-3 rounded-full shadow-lg"
                              whileHover={{
                                scale: 1.1,
                              }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {loadingStates["whatsapp"] ? (
                                <CircularLoader />
                              ) : (
                                <img
                                  src="https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png"
                                  alt="WhatsApp"
                                  className="w-8 h-8"
                                />
                              )}
                            </motion.button>
                          </div>
                          <motion.button
                            onClick={() => (window.location.href = process.env.NEXT_PUBLIC_REGISTER_URL || "#")}
                            disabled={loadingStates["register"]}
                            className="group relative bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-400 hover:to-yellow-400 disabled:from-green-600 disabled:to-yellow-600 text-black font-black py-6 px-12 text-2xl lg:text-3xl rounded-2xl shadow-2xl overflow-hidden min-w-[280px] lg:min-w-[400px] min-h-[80px] lg:min-h-[100px] flex items-center justify-center gap-4"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.5)",
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="relative flex items-center gap-4">
                              {loadingStates["register"] ? (
                                <>
                                  <CircularLoader />
                                  <span>CONECTANDO...</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-8 h-8 lg:w-10 lg:h-10" />
                                  <span>Comenzar YA!</span>
                                </>
                              )}
                            </div>
                          </motion.button>
                          {/* Location with Argentina Flag */}
                          <motion.div
                            className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              borderColor: "rgba(34, 197, 94, 0.3)",
                            }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                            >
                              🇦🇷
                            </motion.div>
                            <MapPin className="w-5 h-5 text-blue-400" />
                            {loadingLocalidad ? (
                              <div className="h-5 bg-white/20 rounded animate-pulse w-24" />
                            ) : (
                              <span className="text-white font-medium text-lg">{localidad || "Argentina"}</span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
