// src/Components/HomePage/HeroSection.jsx
import React from 'react';
import { Box } from '@mui/material';
import Section from '../ReusableComponents/Section';
import Text from '../ReusableComponents/Text';
import Translate from '../ReusableComponents/Translate';
import Button from '../ReusableComponents/Button';

const HeroSection = () => {
  const { t } = Translate();

  return (
    <Section backgroundColor="#ffffff" padding="32px 0">
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: 'center',
        }}
      >
        {/* Image with controlled height and cropping */}
        <Box
          component="img"
          src="/HomePage/dogGraphic.png"
          alt="Hero Image"
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '600px' }, // Reduced height on larger screens
            objectFit: 'cover', // Crop the image to fit the box
            objectPosition: 'center', // Center the cropping
            borderRadius: '16px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            filter: 'brightness(0.8)', // Darken the image
          }}
        />

        {/* Overlay content positioned to the empty space on the left */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: '40px' },
            left: { md: '40px' },
            textAlign: 'left',
            color: '#fff', // White text for contrast
            width: { xs: '100%', md: '45%' },
            padding: { xs: 2, md: 0 },
          }}
        >
          <Text variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            {t('b.title')}
          </Text>
          <Text variant="body1" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {t('b.description')}
          </Text>
          <Button variant="contained" color="primary">
            {t('b.button')}
          </Button>
        </Box>
      </Box>
    </Section>
  );
};

export default HeroSection;
