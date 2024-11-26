import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stepper, Step, StepLabel, Box, Button, TextField } from '@mui/material';
import Section from '../ReusableComponents/Section';
import Text from '../ReusableComponents/Text';
import { createOrder } from './api';

const steps = ['User Details', 'Order Summary', 'Confirm Order'];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    mobile: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const { product } = state || {};

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setIsSubmitting(true);
  
      try {
        // Clean and validate product price
        const totalAmount = parseFloat(product?.price?.replace(/[^0-9.]/g, '') || 0);
        if (isNaN(totalAmount)) {
          alert('Invalid product price. Please go back and select a valid product.');
          return;
        }
  
        // Prepare order data
        const orderData = {
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          mobile: formData.mobile,
          totalAmount,
          orderStatusID: 1,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          orderDate: new Date().toISOString(),
          dateCreated: new Date().toISOString(),
          dateModified: null,
        };
  
        // Make the API call
        const response = await createOrder(orderData);
        alert(`Order created successfully!\nOrder ID: ${response.orderId}\nQR Code ID: ${response.qrCodeId}`);
        setActiveStep(0); // Reset the stepper
      } catch (error) {
        console.error('Failed to create order:', error.response?.data || error.message);
        alert('Failed to create order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  
  
  

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Section>
      <Text variant="h4" align="center" margin="16px 0">
        Checkout
      </Text>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box margin="32px 0">
        {activeStep === 0 && (
          <Box>
            <Text variant="h6">Enter your details:</Text>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Surname" name="surname" value={formData.surname} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Street" name="street" value={formData.street} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Country" name="country" value={formData.country} onChange={handleChange} fullWidth margin="normal" />
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <Text variant="h6">Order Summary:</Text>
            <Text>Name: {product.name}</Text>
            <Text>Price: {product.price}</Text>
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Text variant="h6">Confirm Your Order</Text>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0 || isSubmitting} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={isSubmitting}>
          {activeStep === steps.length - 1 ? 'Confirm Order' : 'Next'}
        </Button>
      </Box>
    </Section>
  );
};

export default CheckoutStepper;
