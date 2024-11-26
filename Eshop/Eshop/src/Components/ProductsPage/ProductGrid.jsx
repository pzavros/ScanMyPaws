import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../ReusableComponents/Section';
import Row from '../ReusableComponents/Row';
import Column from '../ReusableComponents/Column';
import Card from '../ReusableComponents/Card';
import Text from '../ReusableComponents/Text';
import Button from '../ReusableComponents/Button';

const mockProducts = [
  { id: 1, name: 'Custom Pet Tag', price: '$9.99', description: 'Engraved tag for your pet.' },
  { id: 2, name: 'Pet Collar', price: '$14.99', description: 'Adjustable and durable collar.' },
  { id: 3, name: 'QR Code Sticker', price: '$4.99', description: 'Scanable sticker for pets.' },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate('/Checkout', { state: { product } });
  };

  return (
    <Section>
      <Text variant="h4" align="center" margin="16px 0">
        Our Products
      </Text>
      <Row style={{ justifyContent: 'center', gap: '24px', padding: '16px' }}>
        {mockProducts.map((product) => (
            <Card style={{ padding: '16px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Text variant="h6" margin="8px 0">
                {product.name}
              </Text>
              <Text>{product.description}</Text>
              <Text margin="8px 0" weight="bold">
                {product.price}
              </Text>
              <Button
                onClick={() => handleBuyNow(product)}
                style={{
                  marginTop: '16px',
                  backgroundColor: '#ff6f61',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                Buy Now
              </Button>
            </Card>
        ))}
      </Row>
    </Section>
  );
};

export default ProductGrid;
