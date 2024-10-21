// src/Pages/HomePage.jsx
import React from 'react';
import Section from '../Components/ReusableComponents/Section';
import Container from '../Components/ReusableComponents/Container';
import Row from '../Components/ReusableComponents/Row';
import Column from '../Components/ReusableComponents/Column';
import Card from '../Components/ReusableComponents/Card';
import Button from '../Components/ReusableComponents/Button';
import InputField from '../Components/ReusableComponents/InputField';
import Page from '../Components/ReusableComponents/Page';
import Text from '../Components/ReusableComponents/Text';

const HomePage = () => {
  return (
    <Page>
      <Section backgroundColor="#f0f0f0">
        <Text variant="h4" gutterBottom>
          Welcome to the Home Page!
        </Text>
        <Text>
          Explore our range of products and enjoy a seamless shopping experience.
        </Text>
      </Section>

      <Section>
        <Row gap={2}>
          <Card>
            <Text variant="h6">Product 1</Text>
            <Text>Description of Product 1</Text>
            <Button>Add to Cart</Button>
          </Card>
          <Card>
            <Text variant="h6">Product 2</Text>
            <Text>Description of Product 2</Text>
            <Button>Add to Cart</Button>
          </Card>
          <Card>
            <Text variant="h6">Product 3</Text>
            <Text>Description of Product 3</Text>
            <Button>Add to Cart</Button>
          </Card>
        </Row>
      </Section>

      <Section backgroundColor="#e0e0e0">
        <Text variant="h5" gutterBottom>
          Subscribe to our newsletter
        </Text>
        <Column gap={2}>
          <InputField label="Email Address" />
          <Button>Subscribe</Button>
        </Column>
      </Section>
    </Page>
  );
};

export default HomePage;
