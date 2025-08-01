import Image from "next/image";
import { Product } from "@/types";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Chip, 
  Rating, 
  Box,
  IconButton,
  Fade
} from '@mui/material';
import { 
  AddShoppingCart, 
  Visibility, 

  FlashOn
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card 
        sx={{
          maxWidth: 320,
          minWidth: 260,
          height: 420,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          border: '2px solid #D4E9E2',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0, 117, 74, 0.15)',
            borderColor: '#00754A',
          },
          transition: 'all 0.3s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="div"
            sx={{
              height: 200,
              backgroundColor: '#D4E9E2',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                width: '100%'
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={true}
            />
          </CardMedia>
          
          {/* Sale Badge */}
          {product.isOnSale && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 10
              }}
            >
              <Chip
                icon={<FlashOn />}
                label={`-${product.discount}%`}
                size="small"
                sx={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  boxShadow: '0 4px 12px rgba(255, 68, 68, 0.4)',
                  '& .MuiChip-icon': {
                    color: 'white',
                    fontSize: '1rem'
                  }
                }}
              />
            </motion.div>
          )}
          
          {/* Category Chip */}
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: '#00754A',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              '& .MuiChip-label': {
                padding: '4px 8px'
              }
            }}
          />
          
          {/* Quick View Overlay */}
          <Fade in={isHovered}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: '#FFFFFF',
                  color: '#00754A',
                  '&:hover': {
                    backgroundColor: '#D4E9E2',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Visibility />
              </IconButton>
            </Box>
          </Fade>
        </Box>
        
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            padding: '20px',
            '&:last-child': {
              paddingBottom: '20px'
            }
          }}
        >
          <Typography 
            variant="h6" 
            component="h3"
            sx={{
              fontWeight: 900,
              color: '#000000',
              marginBottom: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{
              color: '#00754A',
              marginBottom: 2,
              fontWeight: 500,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1
            }}
          >
            {product.description}
          </Typography>
          
          {/* Rating and Price */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating 
                value={5} 
                readOnly 
                size="small"
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#FFD700'
                  }
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#00754A', 
                  fontWeight: 'bold',
                  marginLeft: 0.5
                }}
              >
                5.0
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              {/* Original Price (if on sale) */}
              {product.isOnSale && product.originalPrice && (
                <Typography 
                  variant="body2" 
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    lineHeight: 1
                  }}
                >
                  R$ {product.originalPrice.toFixed(2)}
                </Typography>
              )}
              
              {/* Current Price */}
              <Typography 
                variant="h5" 
                component="div"
                sx={{
                  fontWeight: 900,
                  color: product.isOnSale ? '#ff4444' : '#00754A',
                  lineHeight: 1,
                  fontSize: product.isOnSale ? '1.4rem' : '1.25rem'
                }}
              >
                R$ {product.price.toFixed(2)}
              </Typography>
              
              {/* Sale or Regular Label */}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: product.isOnSale ? '#ff4444' : '#000000',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              >
                {product.isOnSale ? 'PROMOÇÃO!' : 'À vista'}
              </Typography>
            </Box>
          </Box>
          {/* Botões de ação */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,117,74,0.10)',
                background: 'linear-gradient(90deg, #00754A 0%, #43C59E 100%)',
                color: '#fff',
                textTransform: 'none',
                transition: 'all 0.2s',
                '&:hover': { background: 'linear-gradient(90deg, #005a3a 0%, #43C59E 100%)', transform: 'scale(1.04)' }
              }}
              startIcon={<FlashOn />}
              href={`https://wa.me/5521970255214?text=Olá! Tenho interesse no produto: ${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: 3,
                borderWidth: 2,
                borderColor: '#00754A',
                color: '#00754A',
                textTransform: 'none',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#005a3a', background: '#D4E9E2', transform: 'scale(1.04)' }
              }}
              startIcon={<AddShoppingCart />}
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              Carrinho
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
