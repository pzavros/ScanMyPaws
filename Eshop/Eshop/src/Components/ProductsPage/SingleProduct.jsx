import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, Paper, IconButton, Divider } from '@mui/material';
import { hashProductId } from './HashUtils';
import Section from '../ReusableComponents/Section';
import { useNavigate } from 'react-router-dom';

const mockProducts = [
  {
    id: 1,
    name: 'Explorer Silicone',
    price: '€9.95',
    description: 'Engraved tag for your pet. Durable and stylish.',
    highlights: [
      'Durable silicone material',
      'Waterproof and lightweight',
      'Available in multiple colors',
      'Compatible with all types of collars',
    ],
    imageGallery: [
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
    ],
    warranty: "Free Lifetime Warranty: Scan My Paws puts your pet's safety first, always. We offer free replacements for lost or broken tags.",
    reviews: { rating: 4.8, count: 123456 },
  },
  {
    id: 2,
    name: 'Explorer Silicone',
    price: '€9.95',
    description: 'Engraved tag for your pet. Durable and stylish.',
    highlights: [
      'Durable silicone material',
      'Waterproof and lightweight',
      'Available in multiple colors',
      'Compatible with all types of collars',
    ],
    imageGallery: [
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
    ],
    warranty: "Free Lifetime Warranty: Scan My Paws puts your pet's safety first, always. We offer free replacements for lost or broken tags.",
    reviews: { rating: 4.8, count: 123456 },
  },
  {
    id: 3,
    name: 'Explorer Silicone',
    price: '€9.95',
    description: 'Engraved tag for your pet. Durable and stylish.',
    highlights: [
      'Durable silicone material',
      'Waterproof and lightweight',
      'Available in multiple colors',
      'Compatible with all types of collars',
    ],
    imageGallery: [
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
      '/media/products/bytetag1.jpeg',
    ],
    warranty: "Free Lifetime Warranty: Scan My Paws puts your pet's safety first, always. We offer free replacements for lost or broken tags.",
    reviews: { rating: 4.8, count: 123456 },
  },
];

const SingleProduct = () => {
  const { hashedId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

   // Hash the product ID
  const handleViewDetails = (product) => {
    const hashedId = hashProductId(product.id);
    navigate(`/product/${hashedId}`);
  };

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { product, quantity: 1 } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = mockProducts.find(
        (item) => hashProductId(item.id) === hashedId
      );
      setProduct(response);
      setSelectedImage(response?.imageGallery[0]);
    };

    fetchProduct();
  }, [hashedId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <Typography align="center">Loading...</Typography>;

  return (
    <Section>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} sm={2} md={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Box display="flex" flexDirection="column" gap={1}>
            {product.imageGallery.map((img, index) => (
              <Paper
                key={index}
                elevation={selectedImage === img ? 4 : 1}
                sx={{ cursor: 'pointer', borderRadius: 2, overflow: 'hidden' }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: '100%', height: '70px', objectFit: 'cover' }}
                />
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Main Image */}
        <Grid item xs={12} sm={5} md={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: { xs: '300px', sm: '100%' },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Paper>

          {/* Thumbnails on mobile */}
          <Box
            display={{ xs: 'flex', sm: 'none' }}
            justifyContent="center"
            gap={1}
            mt={2}
          >
            {product.imageGallery.map((img, index) => (
              <Paper
                key={index}
                elevation={selectedImage === img ? 4 : 1}
                sx={{ cursor: 'pointer', borderRadius: 2, overflow: 'hidden', width: '70px', height: '70px' }}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} sm={5} md={5}>
          <Typography variant="h4" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            {product.price}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          {/* Highlights */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Highlights:
            </Typography>
            <ul style={{ paddingLeft: '20px' }}>
              {product.highlights.map((highlight, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#666' }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </Box>

          {/* Quantity */}
          <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
            <Typography>Quantity:</Typography>
            <Box display="flex" alignItems="center" border="1px solid #ddd" borderRadius={2}>
              <IconButton size="small" onClick={handleDecrement}>
                -
              </IconButton>
              <Typography sx={{ px: 2 }}>{quantity}</Typography>
              <IconButton size="small" onClick={handleIncrement}>
                +
              </IconButton>
            </Box>
          </Box>

          {/* Buttons */}
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: '#ff6f61', color: '#fff', borderRadius: 4, padding: 2 }}
          >
            Add to Cart
          </Button>
          <Button
            fullWidth
            sx={{ mt: 2, backgroundColor: '#6a1b9a', color: '#fff', borderRadius: 4, padding: 2 }}
            onClick={() => handleBuyNow(product)}
          >
            Buy
          </Button>
        </Grid>
      </Grid>

      {/* Warranty and Reviews */}
      <Box sx={{ marginTop: 4, padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {product.warranty}
        </Typography>
        <Divider />
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Typography variant="h6" color="success.main">
            ⭐ {product.reviews.rating}/5
          </Typography>
          <Typography color="text.secondary">{product.reviews.count} reviews</Typography>
        </Box>
      </Box>
    </Section>
  );
};

export default SingleProduct;
