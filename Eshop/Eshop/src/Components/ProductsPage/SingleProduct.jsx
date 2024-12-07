import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, Paper, IconButton } from '@mui/material';
import { hashProductId } from './HashUtils';
import Section from '../ReusableComponents/Section';

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
        warranty: 'Free Lifetime Warranty: ByteTag puts your pet\'s safety first, always. We offer free replacements for lost or broken tags.',
        reviews: { rating: 4.8, count: 17893 },
    },
];

const SingleProduct = () => {
    const { hashedId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1); // Quantity state

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

    // Increment Quantity
    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Decrement Quantity
    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    if (!product) return <Typography align="center">Loading...</Typography>;

    return (
        <Section>
            <Grid container spacing={4} alignItems="stretch">
                {/* Image Gallery */}
                <Grid item xs={1}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        height="100%"
                        gap={1}
                    >
                        {product.imageGallery.map((img, index) => (
                            <Paper
                                key={index}
                                elevation={selectedImage === img ? 4 : 1}
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        aspectRatio: '1/1',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Paper>
                        ))}
                    </Box>
                </Grid>

                {/* Main Image */}
                <Grid item xs={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                        }}
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt={product.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <Typography>No image selected</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Product Details */}
                <Grid item xs={5}>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                        {product.name}
                    </Typography>
                    <Typography variant="h5" color="error" sx={{ mb: 2 }}>
                        {product.price}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                        {product.description}
                    </Typography>

                    {/* Highlights */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            Highlights:
                        </Typography>
                        <ul style={{ paddingLeft: '20px', color: '#666', lineHeight: '1.6' }}>
                            {product.highlights.map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                            ))}
                        </ul>
                    </Box>

                    {/* Quantity and Actions */}
                    <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
                        <Typography>Quantity:</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            border="1px solid #ddd"
                            borderRadius={2}
                            overflow="hidden"
                        >
                            <IconButton size="small" onClick={handleDecrement} sx={{ padding: 1, backgroundColor: '#f9f9f9' }}>
                                -
                            </IconButton>
                            <Typography sx={{ px: 2 }}>{quantity}</Typography>
                            <IconButton size="small" onClick={handleIncrement} sx={{ padding: 1, backgroundColor: '#f9f9f9' }}>
                                +
                            </IconButton>
                        </Box>
                    </Box>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: '#ff6f61',
                            color: '#fff',
                            padding: 2,
                            borderRadius: 2,
                            mt: 2,
                            '&:hover': { backgroundColor: '#e55a50' },
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: '#6a1b9a',
                            color: '#fff',
                            padding: 2,
                            borderRadius: 2,
                            mt: 2,
                            '&:hover': { backgroundColor: '#54117a' },
                        }}
                    >
                        Buy with Shop Pay
                    </Button>
                </Grid>
            </Grid>

            {/* Warranty and Reviews */}
            <Box
                sx={{
                    marginTop: 4,
                    padding: 3,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                }}
            >
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {product.warranty}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" color="success.main">
                        ⭐ {product.reviews.rating}/5
                    </Typography>
                    <Typography color="text.secondary">
                        {product.reviews.count} reviews
                    </Typography>
                </Box>
            </Box>
        </Section>
    );
};

export default SingleProduct;
