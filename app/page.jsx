"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Globe,
  MessageSquare,
  Smartphone,
  Zap,
  Facebook,
  Twitter,
  Github,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"

// Wallet connection state and error handling
const useWalletConnection = () => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletError, setWalletError] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Safe wallet connection function that handles errors properly
  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true)
      // Check if we're in a browser environment
      if (typeof window === "undefined") return

      // Check if wallet extensions exist before trying to connect
      if (!window.ethereum) {
        console.log("No wallet detected. Please install a wallet extension.")
        setWalletError("No wallet detected. Please install a wallet extension.")
        return
      }

      // Request accounts using the existing ethereum provider
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0])
        setWalletConnected(true)
        setWalletError(null)
        console.log("Wallet connected:", accounts[0])
      } else {
        throw new Error("No accounts found")
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
      if (error.code === 4001) {
        // User rejected the connection request
        setWalletError("Connection rejected. Please approve the connection request.")
      } else {
        setWalletError("Failed to connect wallet. Please try again later.")
      }
      setWalletConnected(false)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          // User has disconnected their wallet
          setWalletConnected(false)
          setWalletAddress("")
        } else if (accounts[0] !== walletAddress) {
          // User has switched accounts
          setWalletAddress(accounts[0])
          setWalletConnected(true)
        }
      }

      // Subscribe to accounts change
      window.ethereum.on("accountsChanged", handleAccountsChanged)

      // Cleanup listener on component unmount
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [walletAddress])

  return { walletConnected, walletError, isConnecting, walletAddress, connectWallet }
}

// Componente para las preguntas frecuentes
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
        <button
          className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-semibold text-slate-900">{question}</h3>
          <svg
            className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="p-6 pt-0 border-t border-slate-100">
            <p className="text-slate-600">{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Navbar component
const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center backdrop-blur-sm bg-white/80 border-b border-slate-200 sticky top-0 z-50">
      <Link className="flex items-center justify-center" href="/">
        <div className="relative h-10 w-32">
          <Image src="/images/logo.webp" alt="Kiipay Logo" fill style={{ objectFit: "contain" }} priority />
        </div>
      </Link>
      <nav className="ml-auto flex gap-6">
        <Link className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors" href="#features">
          Características
        </Link>
        <Link
          className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
          href="#how-it-works"
        >
          Cómo Funciona
        </Link>
        <Link className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors" href="#pricing">
          Precios
        </Link>
        <Link
          className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
          href="#testimonials"
        >
          Testimonios
        </Link>
      </nav>
      <div className="ml-6 flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-slate-700 hover:text-indigo-600">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/register">
          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0"
          >
            Registrarse
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default function Home() {
  // Use our custom hook but don't auto-connect
  const { walletConnected, walletError, isConnecting, walletAddress, connectWallet } = useWalletConnection()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block px-3 py-1 text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg">
                  Revolucionando los pagos con blockchain
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none lg:text-7xl/none text-slate-900">
                    Acepta pagos en{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500">
                      crypto
                    </span>{" "}
                    en cualquier lugar
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    La primera plataforma no-code que te permite aceptar pagos en criptomonedas vía SMS y códigos web.
                    Comienza a recibir pagos en minutos, no en días.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="px-8 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/20">
                      Comenzar ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100">
                      Ver demo
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Sin código
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Configuración en 5 minutos
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    Pagos instantáneos
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px]">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-75 blur-lg"></div>
                  <div className="relative bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 text-sm text-slate-500">Dashboard de Pagos</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
                          <div>
                            <div className="text-sm text-slate-500">Balance Total</div>
                            <div className="text-xl font-bold text-slate-900">4.28 ETH</div>
                          </div>
                          <div className="text-green-500 flex items-center">
                            <span>+12%</span>
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="text-sm text-slate-500">Transacciones</div>
                            <div className="text-xl font-bold text-slate-900">128</div>
                          </div>
                          <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="text-sm text-slate-500">Productos</div>
                            <div className="text-xl font-bold text-slate-900">12</div>
                          </div>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm text-slate-500">Últimas Transacciones</div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b border-slate-200">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                                  <CreditCard className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-sm text-slate-900">Pago Premium</div>
                                  <div className="text-xs text-slate-500">Hace 2h</div>
                                </div>
                              </div>
                              <div className="text-green-500">+0.25 ETH</div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                  <MessageSquare className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-sm text-slate-900">SMS Payment</div>
                                  <div className="text-xs text-slate-500">Hace 5h</div>
                                </div>
                              </div>
                              <div className="text-green-500">+0.15 ETH</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SMS Payments Highlight Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              {/* Columna izquierda - Texto descriptivo */}
              <div className="flex flex-col space-y-4">
                <div className="inline-block px-3 py-1 text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg">
                  Funciona sin internet
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Pagos por SMS: Disponible siempre, en cualquier lugar
                </h2>
                <p className="text-slate-600 md:text-lg">
                  Kiipay permite enviar y recibir pagos en criptomonedas usando solo mensajes de texto. Sin necesidad de
                  smartphone, sin internet, sin aplicaciones.
                </p>

                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Funciona en cualquier teléfono móvil, incluso en modelos básicos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Ideal para áreas con conectividad limitada o inestable</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Transacciones seguras respaldadas por blockchain</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Disponible 24/7, incluso cuando los servicios de internet fallan
                    </span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link href="/register">
                    <Button className="px-8 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/20">
                      Comenzar ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Columna derecha - Demostración visual */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30 blur-lg"></div>
                <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Pagos por SMS</h3>
                      <p className="text-sm text-slate-500">Sin necesidad de internet</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <span className="text-green-600 text-xs font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">Envía un SMS</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Envía un mensaje de texto con la palabra clave y el monto al número de Kiipay
                          </p>
                          <div className="mt-2 bg-white p-2 rounded border border-slate-200 text-xs font-mono">
                            KIIPAY PAGAR 50 a @usuario
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-blue-600 text-xs font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">Confirma la transacción</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            Recibirás un SMS de confirmación con los detalles de la transacción
                          </p>
                          <div className="mt-2 bg-white p-2 rounded border border-slate-200 text-xs font-mono">
                            Confirma pago de 50 USD a @usuario. Responde SI para confirmar.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-indigo-600 text-xs font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">¡Pago completado!</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            La transacción se procesa en la blockchain y ambas partes reciben confirmación
                          </p>
                          <div className="mt-2 bg-white p-2 rounded border border-slate-200 text-xs font-mono">
                            Pago de 50 USD completado. ID: KP12345. Gracias por usar Kiipay.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDV Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-block px-3 py-1 text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg">
                  Novedad: Sistema PDV completo
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Tu negocio completo en una sola plataforma
                </h2>
                <p className="mt-4 text-slate-600 md:text-lg">
                  Kiipay ahora ofrece mucho más que pagos en crypto. Nuestro sistema de Punto de Venta (PDV) integrado
                  te permite administrar todo tu negocio desde un solo lugar, sin importar si tienes una tienda física,
                  un e-commerce o ambos.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Gestión de inventario en tiempo real</h3>
                      <p className="mt-1 text-slate-600">
                        Controla tu stock, recibe alertas de productos agotados y genera órdenes de compra automáticas.
                        Sincroniza inventario entre tu tienda física y online.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Contabilidad simplificada</h3>
                      <p className="mt-1 text-slate-600">
                        Genera informes financieros, controla gastos e ingresos, y prepara tus declaraciones fiscales
                        sin necesidad de software adicional. Todo cumple con las normativas contables.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Gestión de clientes y fidelización</h3>
                      <p className="mt-1 text-slate-600">
                        Crea perfiles de clientes, analiza su comportamiento de compra y diseña programas de
                        fidelización personalizados para aumentar las ventas recurrentes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-2">
                  <Link href="/register">
                    <Button className="px-8 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-indigo-500/20">
                      Probar el PDV gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30 blur-lg"></div>
                <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-sm text-slate-500">Panel de Control PDV</div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-100 p-4 rounded-lg">
                          <div className="text-sm text-slate-500">Ventas Hoy</div>
                          <div className="text-xl font-bold text-slate-900">$1,284.50</div>
                          <div className="text-xs text-green-500 flex items-center mt-1">
                            <span>+18% vs ayer</span>
                          </div>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-lg">
                          <div className="text-sm text-slate-500">Productos Top</div>
                          <div className="text-xl font-bold text-slate-900">Camiseta Pro</div>
                          <div className="text-xs text-slate-500 mt-1">32 unidades</div>
                        </div>
                      </div>

                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-slate-900">Inventario Crítico</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b border-slate-200">
                            <div className="text-sm text-slate-900">Sudadera Negra M</div>
                            <div className="text-red-500 text-sm font-medium">2 unidades</div>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <div className="text-sm text-slate-900">Zapatillas Runner 42</div>
                            <div className="text-amber-500 text-sm font-medium">5 unidades</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-sm font-medium mb-2 text-slate-900">Próximas Entregas</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b border-slate-200">
                            <div>
                              <div className="text-sm text-slate-900">Pedido #8294</div>
                              <div className="text-xs text-slate-500">Juan Pérez - 3 productos</div>
                            </div>
                            <div className="text-indigo-500 text-sm">Hoy, 15:30</div>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <div>
                              <div className="text-sm text-slate-900">Pedido #8295</div>
                              <div className="text-xs text-slate-500">María López - 1 producto</div>
                            </div>
                            <div className="text-indigo-500 text-sm">Mañana, 10:00</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                          Nueva Venta
                        </Button>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                          Gestionar Inventario
                        </Button>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Informes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Increase Banner */}
        <section className="w-full py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  <span className="animate-pulse mr-2">●</span> ¡Dato importante!
                </div>
                <h3 className="mt-2 text-xl md:text-2xl font-bold text-slate-900">
                  Los negocios que aceptan pagos en crypto aumentan sus ventas un{" "}
                  <span className="text-amber-600">37%</span>
                </h3>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p className="text-slate-700 mb-3">No pierdas más ventas por limitaciones en métodos de pago</p>
                <div className="inline-block">
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                      Comienza ahora - ¡Oferta por tiempo limitado!
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full py-12 border-y border-slate-200 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-slate-700">Utilizado por empresas innovadoras</h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20 mt-6">
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/logo-kiichain.png"
                    alt="KiiChain Logo"
                    width={180}
                    height={60}
                    className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/logo-kiiex.png"
                    alt="KIIEX Logo"
                    width={180}
                    height={60}
                    className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/logo-kii.png"
                    alt="KII Logo"
                    width={120}
                    height={60}
                    className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-sm text-white shadow-lg">
                  Características
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Tecnología Revolucionaria
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma proporciona todas las herramientas que necesitas para aceptar pagos blockchain sin
                  necesidad de código.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              {/* Tarjeta 1 */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col items-center space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 p-3 text-white shadow-lg">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Pagos por SMS</h3>
                  <p className="text-center text-slate-600 flex-1">
                    Acepta pagos vía SMS - una primicia en el espacio blockchain. Funciona sin internet y sin
                    smartphone.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2 */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col items-center space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 p-3 text-white shadow-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Integración Web</h3>
                  <p className="text-center text-slate-600 flex-1">
                    Genera códigos de integración para añadir botones de pago a cualquier sitio web en segundos.
                  </p>
                </div>
              </div>

              {/* Tarjeta 3 - PDV */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col items-center space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 p-3 text-white shadow-lg">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Punto de Venta Integrado</h3>
                  <p className="text-center text-slate-600 flex-1">
                    Administra tu negocio completo con nuestro sistema PDV. Gestiona inventario, ventas y contabilidad
                    en la misma plataforma que procesa tus pagos.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 p-1 text-indigo-600">
                  <Zap className="h-5 w-5" />
                  <span className="ml-2 text-sm font-medium">Rápido y Eficiente</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Acepta pagos en segundos, no en días</h3>
                <p className="text-slate-600">
                  Olvídate de los largos procesos de integración y las complicadas APIs. Con Kiipay, puedes empezar a
                  aceptar pagos en criptomonedas en minutos, sin conocimientos técnicos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Configuración en menos de 5 minutos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Sin necesidad de conocimientos de programación</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Integración con un solo clic en tu sitio web</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30 blur-lg"></div>
                <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Crea tu cuenta</h4>
                        <p className="text-sm text-slate-500">Regístrate en menos de 1 minuto</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Configura tus productos</h4>
                        <p className="text-sm text-slate-500">Define qué quieres vender y a qué precio</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                        <span className="text-sky-600 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Integra en tu web o activa SMS</h4>
                        <p className="text-sm text-slate-500">Copia el código o configura el número SMS</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">¡Comienza a recibir pagos!</h4>
                        <p className="text-sm text-slate-500">Los fondos llegan directamente a tu wallet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-slate-200 bg-white" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-sm text-white shadow-lg">
                  Cómo Funciona
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Simplificamos los pagos blockchain
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mira cómo Kiipay transforma la forma en que aceptas pagos en criptomonedas.
                </p>
              </div>

              <div className="mt-16 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-blue-500 hidden md:block"></div>

                <div className="space-y-16">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="md:text-right mb-8 md:mb-0 relative">
                      <div className="absolute top-0 right-0 md:-right-12 w-8 h-8 rounded-full bg-indigo-500 z-10 hidden md:flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Crea tus productos de pago</h3>
                      <p className="text-slate-600 mt-2">
                        Define tus productos, servicios o suscripciones en el panel de control. Establece precios,
                        descripciones y opciones de pago.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30 blur-lg"></div>
                      <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <div className="text-sm font-medium text-slate-900">Nuevo Producto</div>
                              <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white border-0">
                                Guardar
                              </Button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="text-xs text-slate-500">Nombre del Producto</label>
                                <div className="bg-white p-2 rounded mt-1 border border-slate-200 text-slate-900">
                                  Suscripción Premium
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Precio (USD)</label>
                                <div className="bg-white p-2 rounded mt-1 border border-slate-200 text-slate-900">
                                  $49.99
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Tipo de Pago</label>
                                <div className="bg-white p-2 rounded mt-1 border border-slate-200 text-slate-900">
                                  Recurrente (Mensual)
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="order-2 md:order-1 relative">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-500 opacity-30 blur-lg"></div>
                      <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="text-sm font-medium mb-2 text-slate-900">Código de Integración</div>
                            <div className="bg-white p-3 rounded text-xs font-mono text-slate-700 overflow-x-auto border border-slate-200">
                              &lt;script src="https://kiipay.co/embed/product-123"&gt;&lt;/script&gt;
                              <br />
                              &lt;button class="kiipay-button" data-product="premium"&gt;Pagar Ahora&lt;/button&gt;
                            </div>
                            <Button size="sm" className="mt-3 bg-blue-500 hover:bg-blue-600 text-white border-0">
                              Copiar Código
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 mb-8 md:mb-0 relative">
                      <div className="absolute top-0 left-0 md:-left-12 w-8 h-8 rounded-full bg-blue-500 z-10 hidden md:flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-bold md:text-left text-slate-900">Integra en tu sitio web</h3>
                      <p className="text-slate-600 mt-2 md:text-left">
                        Copia y pega el código generado en tu sitio web. No se requieren conocimientos de programación.
                        Funciona con cualquier plataforma.
                      </p>
                    </div>
                  </div>

                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="md:text-right mb-8 md:mb-0 relative">
                      <div className="absolute top-0 right-0 md:-right-12 w-8 h-8 rounded-full bg-sky-500 z-10 hidden md:flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Configura pagos por SMS</h3>
                      <p className="text-slate-600 mt-2">
                        Activa la función única de pagos por SMS. Tus clientes pueden pagar enviando un simple mensaje
                        de texto, sin necesidad de smartphone.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 blur-lg"></div>
                      <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="text-sm font-medium mb-2 text-slate-900">Configuración SMS</div>
                            <div className="flex items-center justify-between bg-white p-3 rounded mb-3 border border-slate-200">
                              <div className="text-sm text-slate-900">Activar Pagos SMS</div>
                              <div className="w-10 h-5 bg-sky-500 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <label className="text-xs text-slate-500">Número SMS</label>
                                <div className="bg-white p-2 rounded mt-1 border border-slate-200 text-slate-900">
                                  +1 (555) 123-4567
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Palabra Clave</label>
                                <div className="bg-white p-2 rounded mt-1 border border-slate-200 text-slate-900">
                                  KIIPAY
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-sm text-white shadow-lg">
                  Testimonios
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Lo que dicen nuestros clientes
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubre cómo Kiipay está transformando negocios en todo el mundo.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Testimonio 1 */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 flex-1">
                    "Kiipay ha revolucionado la forma en que aceptamos pagos. La integración fue increíblemente sencilla
                    y los pagos por SMS han abierto un nuevo mercado para nosotros.{" "}
                    <span className="font-semibold text-indigo-600">
                      Nuestras ventas aumentaron un 42% en el primer trimestre
                    </span>{" "}
                    después de implementar Kiipay."
                  </p>
                  <div className="flex items-center space-x-4 mt-auto">
                    <div className="rounded-full bg-indigo-500 h-10 w-10 flex items-center justify-center">
                      <span className="text-white font-bold">MR</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">María Rodríguez</h4>
                      <p className="text-sm text-slate-500">CEO, TechStart</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonio 2 */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 flex-1">
                    "Como desarrollador, estaba escéptico sobre una solución 'no-code', pero Kiipay me sorprendió. La
                    API es robusta y la integración web es perfecta.{" "}
                    <span className="font-semibold text-blue-600">
                      Ahorramos semanas de desarrollo y aumentamos nuestras conversiones en un 28%
                    </span>{" "}
                    gracias a la facilidad de pago."
                  </p>
                  <div className="flex items-center space-x-4 mt-auto">
                    <div className="rounded-full bg-blue-500 h-10 w-10 flex items-center justify-center">
                      <span className="text-white font-bold">JL</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Javier López</h4>
                      <p className="text-sm text-slate-500">CTO, DevForge</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonio 3 - PDV */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col space-y-4 rounded-xl bg-white p-8 border border-slate-200 shadow-lg h-full">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 flex-1">
                    "El sistema PDV de Kiipay transformó mi tienda. Antes usaba tres programas diferentes para gestionar
                    ventas, inventario y contabilidad.{" "}
                    <span className="font-semibold text-sky-600">
                      Ahora todo está en un solo lugar y he reducido mis costos operativos en un 35%
                    </span>{" "}
                    mientras que mis ventas han aumentado gracias a la aceptación de pagos en crypto."
                  </p>
                  <div className="flex items-center space-x-4 mt-auto">
                    <div className="rounded-full bg-sky-500 h-10 w-10 flex items-center justify-center">
                      <span className="text-white font-bold">CR</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Carlos Ramírez</h4>
                      <p className="text-sm text-slate-500">Propietario, Boutique Moderna</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-slate-200 bg-white" id="pricing">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-sm text-white shadow-lg">
                  Precios
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Precios Simples y Transparentes
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Elige el plan que mejor se adapte a tu negocio. Sin sorpresas ni costos ocultos.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              {/* Plan Starter */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col rounded-xl bg-white border border-slate-200 shadow-xl h-full">
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
                    <div className="mt-4 text-3xl font-bold text-slate-900">
                      $29<span className="text-sm font-normal text-slate-500">/mes</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Perfecto para pequeños negocios que están comenzando con pagos en criptomonedas.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Hasta 100 transacciones/mes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Analíticas básicas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Integración web</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Soporte por email</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">PDV básico (1 usuario)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 mt-auto">
                    <Link href="/register?plan=starter">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white border-0">
                        Comenzar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Plan Pro */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex flex-col rounded-xl bg-white border border-slate-200 shadow-xl h-full">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Popular
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">Pro</h3>
                    <div className="mt-4 text-3xl font-bold text-slate-900">
                      $79<span className="text-sm font-normal text-slate-500">/mes</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Para negocios en crecimiento que necesitan más capacidad y funcionalidades.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Hasta 1,000 transacciones/mes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Analíticas avanzadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Integración web + Pagos SMS</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Soporte prioritario</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Personalización de marca</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">PDV completo (5 usuarios)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Gestión de inventario avanzada</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 mt-auto">
                    <Link href="/register?plan=pro">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white border-0 shadow-lg shadow-blue-500/20">
                        Comenzar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Plan Enterprise */}
              <div className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative flex flex-col rounded-xl bg-white border border-slate-200 shadow-xl h-full">
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">Enterprise</h3>
                    <div className="mt-4 text-3xl font-bold text-slate-900">Personalizado</div>
                    <p className="mt-2 text-sm text-slate-600">
                      Soluciones a medida para grandes empresas con necesidades específicas.
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Transacciones ilimitadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Integraciones personalizadas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Todos los métodos de pago</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Gestor de cuenta dedicado</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">SLA personalizado</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">PDV empresarial (usuarios ilimitados)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span className="text-slate-700">Integración con ERP y sistemas existentes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 mt-auto">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100">
                        Contactar Ventas
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600">¿Tienes preguntas sobre nuestros planes?</p>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center mt-2"
              >
                Habla con nuestro equipo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* AI Security Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-slate-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-block px-3 py-1 text-sm text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-lg">
                  Tecnología de vanguardia
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
                  Protección avanzada con Inteligencia Artificial
                </h2>
                <p className="mt-4 text-slate-600 md:text-lg">
                  Nuestros agentes de IA monitorean y protegen cada transacción, proporcionando un nivel de seguridad
                  sin precedentes en el mundo de los pagos blockchain.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Detección de fraudes en tiempo real</h3>
                      <p className="mt-1 text-slate-600">
                        Nuestros algoritmos de IA analizan cada transacción al instante, identificando y bloqueando
                        actividades sospechosas antes de que ocurran.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Aprendizaje continuo</h3>
                      <p className="mt-1 text-slate-600">
                        Nuestra IA aprende de millones de transacciones, mejorando constantemente su capacidad para
                        detectar nuevos tipos de fraudes y amenazas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Verificación inteligente</h3>
                      <p className="mt-1 text-slate-600">
                        Validación automática de transacciones con múltiples capas de seguridad, sin añadir fricción a
                        la experiencia del usuario.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30 blur-lg"></div>
                <div className="relative bg-white rounded-xl border border-slate-200 shadow-xl p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Protección IA de Kiipay</h3>
                      <p className="text-sm text-slate-500">Monitoreo en tiempo real</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-slate-900">Estado del sistema</div>
                        <div className="text-sm text-green-600 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-600 mr-1"></span>
                          Activo
                        </div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "98%" }}></div>
                      </div>
                      <div className="mt-1 text-xs text-slate-500 text-right">Protección: 98% efectiva</div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="text-sm font-medium mb-2 text-slate-900">Actividad reciente</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center py-1 border-b border-slate-100">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <svg
                                className="w-4 h-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-700">Transacción verificada</div>
                          </div>
                          <div className="text-xs text-slate-500">Hace 2 min</div>
                        </div>

                        <div className="flex justify-between items-center py-1 border-b border-slate-100">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                              <svg
                                className="w-4 h-4 text-amber-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-700">Análisis adicional</div>
                          </div>
                          <div className="text-xs text-slate-500">Hace 15 min</div>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                              <svg
                                className="w-4 h-4 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-700">Intento de fraude bloqueado</div>
                          </div>
                          <div className="text-xs text-slate-500">Hace 1h</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-indigo-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="text-sm font-medium text-indigo-900">
                          Nuestros agentes de IA han prevenido más de 10,000 intentos de fraude este mes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-500 to-blue-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Comienza a aceptar pagos en crypto hoy
                </h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed">
                  Únete a miles de negocios que ya están utilizando Kiipay para revolucionar sus pagos.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100">
                    Cuenta Gratis
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-white text-white hover:bg-white/10 bg-indigo-600/30"
                  onClick={(e) => {
                    e.preventDefault()
                    connectWallet()
                  }}
                >
                  {isConnecting ? "Conectando..." : "Conectar Wallet"}
                </Button>
              </div>
              {walletError && <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">{walletError}</div>}
              {walletConnected && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
                  ¡Wallet conectada exitosamente! Dirección: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-t border-slate-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 text-sm text-white shadow-lg">
                  Preguntas Frecuentes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Respuestas a tus dudas
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Todo lo que necesitas saber sobre Kiipay y cómo puede ayudar a tu negocio.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12 space-y-6">
              <FaqItem
                question="¿Cómo funciona el pago por SMS sin internet?"
                answer="Kiipay utiliza la red de telefonía móvil para procesar pagos a través de mensajes de texto. Cuando un usuario envía un SMS con la información de pago, nuestros servidores procesan la solicitud y ejecutan la transacción en la blockchain. Esto permite realizar pagos incluso en áreas sin cobertura de internet o desde teléfonos básicos."
              />

              <FaqItem
                question="¿Qué criptomonedas puedo aceptar con Kiipay?"
                answer="Kiipay soporta las principales criptomonedas como Bitcoin, Ethereum, Solana, y stablecoins como USDC y USDT. Además, estamos constantemente añadiendo soporte para nuevas criptomonedas según la demanda del mercado."
              />

              <FaqItem
                question="¿Es seguro utilizar Kiipay para mis transacciones?"
                answer="Absolutamente. Todas las transacciones están respaldadas por la seguridad de la blockchain y protegidas por nuestros agentes de IA que monitorean continuamente la actividad para detectar y prevenir fraudes. Utilizamos encriptación de extremo a extremo para los mensajes SMS y nuestros sistemas cumplen con los estándares más altos de seguridad en la industria. Además, nunca almacenamos las claves privadas de nuestros usuarios."
              />

              <FaqItem
                question="¿Necesito conocimientos técnicos para implementar Kiipay?"
                answer="No, Kiipay está diseñado para ser extremadamente fácil de usar. No se requieren conocimientos de programación. Para la integración web, simplemente copia y pega el código generado en tu sitio. Para los pagos por SMS, solo necesitas configurar el número y las palabras clave en tu panel de control."
              />

              <FaqItem
                question="¿Cómo me protege la IA de Kiipay contra fraudes?"
                answer="Nuestros agentes de IA analizan cada transacción en tiempo real, identificando patrones sospechosos y anomalías que podrían indicar actividad fraudulenta. La IA aprende continuamente de millones de transacciones para mejorar su precisión, proporcionando una capa adicional de seguridad que complementa la inherente seguridad de la blockchain. Esto resulta en tasas de fraude 98% menores que los sistemas de pago tradicionales."
              />

              <FaqItem
                question="¿Cómo se integra el sistema PDV con mi negocio existente?"
                answer="Nuestro sistema PDV está diseñado para integrarse fácilmente con tu negocio, ya sea una tienda física, un e-commerce o ambos. Puedes importar tu inventario existente, conectar con plataformas de e-commerce populares como Shopify o WooCommerce, y sincronizar tus ventas en todos los canales. Para negocios más complejos, ofrecemos servicios de integración personalizados para conectar con tu ERP, CRM u otros sistemas que ya utilices."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Improved Footer with more information */}
      <footer className="w-full py-12 bg-slate-50 border-t border-slate-200">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <Link className="flex items-center" href="/">
                <div className="relative h-10 w-32">
                  <Image src="/images/logo.webp" alt="Kiipay Logo" fill style={{ objectFit: "contain" }} />
                </div>
              </Link>
              <p className="mt-4 text-slate-600 text-sm">
                La plataforma de pagos blockchain más innovadora. Acepta pagos en criptomonedas de forma sencilla, sin
                código y con la tecnología más avanzada.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-indigo-500" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-500" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-500" aria-label="GitHub">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-500" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Producto</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#features" className="text-sm text-slate-600 hover:text-indigo-600">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-slate-600 hover:text-indigo-600">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Integraciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Documentación
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Soporte</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Guías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Tutoriales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Estado del Servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Términos de Servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Política de Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Cumplimiento GDPR
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                    Licencias
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Contacto</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-slate-400 mr-2 mt-0.5" />
                  <span className="text-sm text-slate-600">Calle Innovación 123, Ciudad Tecnológica, 28001</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-slate-400 mr-2" />
                  <a href="tel:+34911234567" className="text-sm text-slate-600 hover:text-indigo-600">
                    +34 911 234 567
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-slate-400 mr-2" />
                  <a href="mailto:info@kiipay.com" className="text-sm text-slate-600 hover:text-indigo-600">
                    info@kiipay.com
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-900">Suscríbete a nuestro newsletter</h4>
                <div className="mt-2 flex">
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full rounded-l-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button className="rounded-r-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Kiipay. Todos los derechos reservados.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">
                  Accesibilidad
                </a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">
                  Mapa del Sitio
                </a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">
                  Responsabilidad Social
                </a>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400 text-center">
              Las criptomonedas pueden ser volátiles. Invierte con responsabilidad. Kiipay no proporciona asesoramiento
              financiero.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

