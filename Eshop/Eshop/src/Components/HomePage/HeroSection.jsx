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
        }}
      >
        <Box
          component="img"
          src="/HomePage/dogGraphic.png"
          alt="Hero Image"
          sx={{
            width: '100%',
            borderRadius: '16px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Overlay content positioned at the top left */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '16px', md: '24px' },
            left: { xs: '16px', md: '24px' },
            textAlign: 'left',
            color: '#000',
            width: { xs: '90%', md: '50%' },
          }}
        >
          <Text variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'inherit' }}>
            {t('b.title')}
          </Text>
          <Text variant="body1" sx={{ mb: 3, color: 'inherit',mr:12 }}>
            {t('b.description')}
          </Text>
        </Box>
      </Box>
    </Section>
  );
};

export default HeroSection;
