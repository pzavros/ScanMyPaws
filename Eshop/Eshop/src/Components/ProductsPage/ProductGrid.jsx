import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../ReusableComponents/Section';
import Row from '../ReusableComponents/Row';
import Card from '../ReusableComponents/Card';
import Text from '../ReusableComponents/Text';
import Button from '../ReusableComponents/Button';
import { hashProductId } from './HashUtils';

const mockProducts = [
  {
    id: 1,
    name: 'Custom Pet Tag',
    price: '$9.99',
    description: 'Engraved tag for your pet.',
    image: './media/products/bytetag1.jpeg',
  },
  {
    id: 2,
    name: 'Pet Collar',
    price: '$14.99',
    description: 'Adjustable and durable collar.',
    image: './media/products/bytetag1.jpeg',
  },
  {
    id: 3,
    name: 'QR Code Sticker',
    price: '$4.99',
    description: 'Scannable sticker for pets.',
    image: './media/products/bytetag1.jpeg',
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleViewDetails = (product) => {
    const hashedId = hashProductId(product.id); // Hash the product ID
    navigate(`/product/${hashedId}`);
  };

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { product, quantity: 1 } }); // Navigate to checkout with product details
  };

  return (
    <Section>
      <Text variant="h4" align="center" margin="16px 0">
        Our Products
      </Text>
      <Row style={{ justifyContent: 'center', gap: '24px', padding: '16px', flexWrap: 'wrap' }}>
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            style={{
              padding: '16px',
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }}
            />
            <Text variant="h6" margin="8px 0">
              {product.name}
            </Text>
            <Text>{product.description}</Text>
            <Text margin="8px 0" weight="bold" color="#ff6f61">
              {product.price}
            </Text>
            <Row style={{ justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <Button
                style={{
                  backgroundColor: '#ff6f61',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#e55a50')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff6f61')}
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </Button>
              <Button
                style={{
                  backgroundColor: '#6a1b9a',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#54117a')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#6a1b9a')}
                onClick={() => handleBuyNow(product)} // Navigate to checkout directly
              >
                Buy Now
              </Button>
            </Row>
          </Card>
        ))}
      </Row>
    </Section>
  );
};

export default ProductGrid;
