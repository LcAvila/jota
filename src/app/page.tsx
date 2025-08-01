"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { products, categories } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { IconButton, Badge, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SidebarMenu from "@/components/SidebarMenu";



export default function Home() {
  // --- ESTADO DO CARRINHO ---
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  // Adiciona produto ao carrinho
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Remove uma unidade do produto
  const handleRemoveFromCart = (product: Product) => {
    setCartItems(prev => prev.map(item => item.product.id === product.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  };

  // Remove produto totalmente
  const handleDeleteFromCart = (product: Product) => {
    setCartItems(prev => prev.filter(item => item.product.id !== product.id));
  };

  // Quantidade total de itens
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const [showProducts, setShowProducts] = useState(false);
  const [showOffers, setShowOffers] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);





  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Filtrar produtos em oferta
  const offersProducts = products.filter(product => product.isOnSale);
  
  // Função para mostrar ofertas
  const handleShowOffers = () => {
    setShowOffers(true);
    setShowAllProducts(false);
    setShowProducts(false);
  };

  // Função para mostrar todos os produtos
  const handleShowAllProducts = () => {
    setShowOffers(false);
    setShowAllProducts(true);
    setShowProducts(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Professional Sidebar Menu */}
      <SidebarMenu 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onShowOffers={handleShowOffers}
      />
      
      {/* Botão flutuante do carrinho */}
      <Box sx={{ position: 'fixed', bottom: 120, right: 32, zIndex: 1200 }}>
        <IconButton onClick={() => setCartOpen(true)} sx={{ backgroundColor: '#00754A', color: '#fff', boxShadow: '0 4px 24px rgba(0,117,74,0.12)', '&:hover': { backgroundColor: '#005a3a' }, width: 64, height: 64 }}>
          <Badge badgeContent={cartCount} color="error" overlap="circular" sx={{ '& .MuiBadge-badge': { fontWeight: 900, fontSize: 18, minWidth: 28, height: 28 } }}>
            <ShoppingCart sx={{ fontSize: 36 }} />
          </Badge>
        </IconButton>
      </Box>
      {/* Drawer do carrinho */}
      <Cart 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems} 
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        onDelete={handleDeleteFromCart}
      />
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden" 
        style={{ backgroundColor: '#00754A' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-10 left-10 w-32 h-32 rounded-full" 
            style={{ backgroundColor: '#D4E9E2' }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-40 right-20 w-24 h-24 rounded-full" 
            style={{ backgroundColor: '#D4E9E2' }}
            animate={{ 
              y: [0, 15, 0],
              x: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full" 
            style={{ backgroundColor: '#D4E9E2' }}
            animate={{ 
              rotate: [0, -180, -360],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.h1 
              className="text-5xl lg:text-7xl font-black mb-6" 
              style={{ color: '#FFFFFF' }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Jota Distribuidora
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl mb-8 font-medium max-w-3xl mx-auto" 
              style={{ color: '#D4E9E2' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              🍻 Entregamos sua bebida onde você estiver! 🚚
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-3 px-6 py-4 rounded-full backdrop-blur-sm" 
                style={{ backgroundColor: 'rgba(212, 233, 226, 0.2)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: '#D4E9E2' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <span className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>Aberto agora</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 px-6 py-4 rounded-full backdrop-blur-sm" 
                style={{ backgroundColor: 'rgba(212, 233, 226, 0.2)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                <span className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>Entrega em 30min</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Special Offers Section - Always Visible */}
      {showOffers && (
        <motion.section 
          id="ofertas" 
          className="py-20" 
          style={{ backgroundColor: '#D4E9E2' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-3 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.span 
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🔥
                </motion.span>
                <motion.h2 
                  className="text-5xl font-black" 
                  style={{ color: '#000000' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Ofertas Especiais
                </motion.h2>
                <motion.span 
                  className="text-6xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  💰
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-xl font-semibold max-w-3xl mx-auto" 
                style={{ color: '#00754A' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Aproveite nossos preços promocionais! Produtos selecionados com descontos imperdíveis 🎯
              </motion.p>
              
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button
                  onClick={handleShowAllProducts}
                  className="px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: '#00754A',
                    color: '#FFFFFF',
                    border: '2px solid #00754A'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Todos os Produtos 📦
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Offers Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {offersProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl"
                style={{ backgroundColor: 'rgba(0, 117, 74, 0.1)' }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-3xl">⏰</span>
                <div>
                  <p className="text-lg font-bold" style={{ color: '#00754A' }}>
                    Ofertas por tempo limitado!
                  </p>
                  <p className="text-sm" style={{ color: '#666' }}>
                    Não perca essas oportunidades incríveis
                  </p>
                </div>
                <span className="text-3xl">🚀</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Produtos Minimalistas em Linha (Horizontal Scroll) */}
      <section id="produtos" className="py-16" style={{ backgroundColor: '#D4E9E2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#000000' }}>Nossos Produtos</h2>
            <p className="text-base md:text-lg font-medium max-w-2xl mx-auto" style={{ color: '#00754A' }}>
              Produtos frescos e de qualidade, selecionados especialmente para você
            </p>
          </div>

          {/* Filtro de categorias minimalista */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-[#D4E9E2] scrollbar-track-transparent">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap border transition-all duration-300 text-sm md:text-base ${
                  selectedCategory === category
                    ? "bg-[#00754A] text-white border-[#00754A] shadow"
                    : "bg-white text-[#00754A] border-[#00754A] hover:bg-[#D4E9E2]"
                }`}
                style={{ minWidth: 90 }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Carrossel horizontal de produtos */}
          <motion.div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                className="min-w-[260px] max-w-[280px] flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{ scale: 1.04, y: -4 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section 
        className="py-20" 
        style={{ backgroundColor: '#FFFFFF' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-black mb-4" 
              style={{ color: '#000000' }}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Por que escolher a Jota?
            </motion.h2>
            <motion.p 
              className="text-lg font-medium" 
              style={{ color: '#00754A' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Qualidade e conveniência em cada entrega
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Entrega Rápida",
                description: "Receba seus produtos em até 30 minutos",
                delay: 0.2
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Qualidade Garantida",
                description: "Produtos sempre frescos e de qualidade",
                delay: 0.4
              },
              {
                icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Pagamento Fácil",
                description: "Cartão, PIX ou dinheiro na entrega",
                delay: 0.6
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 rounded-2xl transition-all duration-300" 
                style={{ backgroundColor: '#D4E9E2' }}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: service.delay,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: '#00754A' }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: service.delay + 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.svg 
                    className="w-8 h-8" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    viewBox="0 0 24 24"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: service.delay + 0.4
                    }}
                    viewport={{ once: true }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </motion.svg>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-3" 
                  style={{ color: '#000000' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: service.delay + 0.3
                  }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="font-medium" 
                  style={{ color: '#00754A' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: service.delay + 0.4
                  }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
