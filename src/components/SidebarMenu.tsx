"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LocalOffer as OfferIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';

interface SidebarMenuProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onShowOffers: () => void;
}

export default function SidebarMenu({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  onShowOffers
}: SidebarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      label: 'Início', 
      icon: <HomeIcon />, 
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    { 
      label: 'Ofertas Especiais', 
      icon: <OfferIcon />, 
      action: () => {
        onShowOffers();
        setIsOpen(false);
      },
      special: true
    },
    { 
      label: 'Sobre Nós', 
      icon: <InfoIcon />, 
      action: () => {
        document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    },
    { 
      label: 'Contato', 
      icon: <PhoneIcon />, 
      action: () => {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Menu Button - Mobile Only */}
      <motion.div
        className="fixed top-4 left-4 z-50 md:hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: '#00754A',
            color: 'white',
            width: 56,
            height: 56,
            boxShadow: '0 4px 20px rgba(0, 117, 74, 0.3)',
            '&:hover': {
              backgroundColor: '#005a3a',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          <MenuIcon />
        </IconButton>
      </motion.div>



      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor: '#FFFFFF',
            backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #D4E9E2 100%)',
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box 
            sx={{ 
              p: 3, 
              backgroundColor: '#00754A',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                  Jota Distribuidora
                </Typography>
                <IconButton 
                  onClick={() => setIsOpen(false)}
                  sx={{ color: 'white' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                Entregamos sua bebida onde você estiver 🍻🚚
              </Typography>
            </motion.div>
            
            {/* Decorative circles */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </Box>

          {/* Menu Items */}
          <List sx={{ flex: 1, pt: 2 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem disablePadding sx={{ mb: 1, mx: 2 }}>
                  <ListItemButton
                    onClick={item.action}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: item.special ? '#00754A' : 'transparent',
                      color: item.special ? 'white' : '#000000',
                      '&:hover': {
                        backgroundColor: item.special ? '#005a3a' : '#D4E9E2',
                        transform: 'translateX(8px)',
                      },
                      transition: 'all 0.3s ease',
                      py: 1.5
                    }}
                  >
                    <ListItemIcon sx={{ color: item.special ? 'white' : '#00754A' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: item.special ? 'bold' : 'medium'
                      }}
                    />
                    {item.special && (
                      <Chip 
                        label="🔥" 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white'
                        }} 
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}

            <Divider sx={{ my: 2, mx: 2 }} />

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  px: 3, 
                  py: 1, 
                  color: '#00754A', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CategoryIcon fontSize="small" />
                Categorias
              </Typography>
              
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <ListItem disablePadding sx={{ mb: 0.5, mx: 2 }}>
                    <ListItemButton
                      onClick={() => {
                        onCategorySelect(category);
                        setIsOpen(false);
                      }}
                      selected={selectedCategory === category}
                      sx={{
                        borderRadius: 1.5,
                        '&:hover': {
                          backgroundColor: '#D4E9E2',
                          transform: 'translateX(4px)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#D4E9E2',
                          color: '#00754A',
                          fontWeight: 'bold',
                        },
                        transition: 'all 0.3s ease',
                        py: 1
                      }}
                    >
                      <ListItemText 
                        primary={category}
                        primaryTypographyProps={{
                          fontSize: '0.9rem'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </motion.div>
          </List>

          {/* Footer */}
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(0, 117, 74, 0.05)',
              textAlign: 'center'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              © 2024 Jota Distribuidora
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              Qualidade e sabor em cada entrega
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
