"use client";

import { useState } from "react";
import { Drawer, Box, Typography, IconButton, Divider, Button, Fade } from "@mui/material";
import { Close, Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function Cart({ open, onClose, items, onAdd, onRemove, onDelete }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 400, md: 420 }, borderTopLeftRadius: 24, borderBottomLeftRadius: 24, background: '#fff', boxShadow: '0 8px 40px rgba(0,117,74,0.16)' } }}>
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" fontWeight={900} color="#00754A">
            <ShoppingCart sx={{ mr: 1 }} /> Carrinho
          </Typography>
          <IconButton onClick={onClose} size="large" sx={{ color: '#00754A' }}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {items.length === 0 ? (
            <Fade in={true}>
              <Box sx={{ textAlign: 'center', mt: 8, color: '#999' }}>
                <ShoppingCart sx={{ fontSize: 60, mb: 2, color: '#D4E9E2' }} />
                <Typography variant="subtitle1">Seu carrinho está vazio</Typography>
              </Box>
            </Fade>
          ) : (
            items.map(({ product, quantity }) => (
              <motion.div key={product.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, border: '1px solid #D4E9E2', background: '#F8FAF9' }}>
                  <Image src={product.image} alt={product.name} width={56} height={56} style={{ borderRadius: 12, background: '#fff', objectFit: 'contain' }} />
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography fontWeight={700} fontSize={16} color="#00754A">{product.name}</Typography>
                    <Typography fontSize={14} color="#666">R$ {product.price.toFixed(2)}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton size="small" onClick={() => onRemove(product)} sx={{ color: '#00754A' }}><Remove /></IconButton>
                      <Typography mx={1} fontWeight={700}>{quantity}</Typography>
                      <IconButton size="small" onClick={() => onAdd(product)} sx={{ color: '#00754A' }}><Add /></IconButton>
                      <IconButton size="small" onClick={() => onDelete(product)} sx={{ color: '#ff4444', ml: 2 }}><Delete /></IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontWeight={700} fontSize={18} color="#00754A">Total</Typography>
          <Typography fontWeight={900} fontSize={22} color="#00754A">R$ {total.toFixed(2)}</Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(90deg, #00754A 0%, #43C59E 100%)',
            color: '#fff',
            fontWeight: 900,
            fontSize: 18,
            borderRadius: 8,
            py: 1.5,
            boxShadow: '0 4px 24px rgba(0,117,74,0.12)',
            mb: 1,
            '&:hover': { background: 'linear-gradient(90deg, #005a3a 0%, #43C59E 100%)' }
          }}
          disabled={items.length === 0}
          onClick={() => window.open('https://wa.me/5521970255214', '_blank')}
        >
          Finalizar Pedido no WhatsApp
        </Button>
      </Box>
    </Drawer>
  );
}
