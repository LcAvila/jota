"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LocationOn,
  Phone,
  Email,
  WhatsApp,
  Schedule,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Início', href: '#', primary: true },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ backgroundColor: '#00754A', py: 1.5 }}>
          <Container maxWidth="xl">
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: 2
            }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: '#FFFFFF' }} />
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    Mesquita - RJ
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: '#FFFFFF' }} />
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    (21) 99801-4824
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: '#FFFFFF' }} />
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                    jotacomerciorio@gmail.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  icon={<CheckCircle sx={{ fontSize: 16 }} />}
                  label="Aceitamos Cartão e PIX"
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(212, 233, 226, 0.2)',
                    color: '#D4E9E2',
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      color: '#D4E9E2'
                    }
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
                >
                  <Button
                    href="https://wa.me/5521970255214"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<WhatsApp />}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#D4E9E2',
                      color: '#00754A',
                      fontWeight: 900,
                      borderRadius: '20px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 4px 12px rgba(212, 233, 226, 0.4)'
                      }
                    }}
                  >
                    WhatsApp
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Main Navbar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: '#FFFFFF',
          borderBottom: '3px solid #D4E9E2',
          boxShadow: '0 4px 20px rgba(0, 117, 74, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ height: 80, justifyContent: 'space-between' }}>
            {/* Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 1, sm: 4 } }}>
  <Image
    src="/assets/logo/logo.png"
    width={170}
    height={85}
    alt="Jota Distribuidora Logo"
    priority
    style={{ maxWidth: '170px', height: 'auto', minWidth: 100 }}
  />
</Box>
            </motion.div>



            {/* Desktop Navigation */}
            {!isMobile && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
                    >
                      <Button
                        href={item.href}
                        sx={{
                          color: item.primary ? '#000000' : '#00754A',
                          fontWeight: 900,
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          px: 3,
                          py: 1.5,
                          borderRadius: '12px',
                          '&:hover': {
                            backgroundColor: '#D4E9E2',
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            )}

            {/* Status Indicators */}
            {!isMobile && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          backgroundColor: '#00754A' 
                        }} />
                      </motion.div>
                    }
                    label="Aberto agora"
                    sx={{
                      backgroundColor: '#D4E9E2',
                      color: '#00754A',
                      fontWeight: 900,
                      '& .MuiChip-label': {
                        px: 2
                      }
                    }}
                  />
                  <Chip
                    icon={<Schedule sx={{ fontSize: 18 }} />}
                    label="Entrega em 30min"
                    sx={{
                      backgroundColor: '#D4E9E2',
                      color: '#00754A',
                      fontWeight: 900,
                      '& .MuiChip-icon': {
                        color: '#00754A'
                      },
                      '& .MuiChip-label': {
                        px: 2
                      }
                    }}
                  />
                </Box>
              </motion.div>
            )}



            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                sx={{
                  color: '#00754A',
                  backgroundColor: '#D4E9E2',
                  '&:hover': {
                    backgroundColor: '#00754A',
                    color: '#FFFFFF'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen && isMobile}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#D4E9E2',
            borderLeft: '3px solid #00754A'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#000000', 
              fontWeight: 900, 
              mb: 3,
              textAlign: 'center'
            }}
          >
            Menu
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem 
                  component="a"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  sx={{
                    borderRadius: '12px',
                    mb: 1,
                    backgroundColor: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#00754A',
                      '& .MuiListItemText-primary': {
                        color: '#FFFFFF'
                      }
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: item.primary ? '#000000' : '#00754A'
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
