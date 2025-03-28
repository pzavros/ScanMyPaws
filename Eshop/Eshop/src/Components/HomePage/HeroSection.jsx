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
        <Box
          component="img"
          src="/HomePage/dogGraphic.png"
          alt="Hero Image"
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '600px' }, 
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '16px',
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
            filter: 'brightness(0.8)', 
          }}
        />

        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: '40px' },
            left: { md: '40px' },
            textAlign: 'left',
            width: { xs: '100%', md: '45%' },
            padding: { xs: 2, md: 0 },
          }}
        >
          <Text
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              color: { xs: '#000', md: '#fff' },
            }}
          >
            {t('b.title')}
          </Text>
          <Text
            variant="body1"
            sx={{
              mb: 3,
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: { xs: '#000', md: '#fff' },
            }}
          >
            {t('b.description')}
          </Text>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgba(121, 85, 72, 0.8)',
              color: { xs: '#000', md: '#fff' },
              padding: '10px 24px',
              borderRadius: '8px', 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', 
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s', 
              '&:hover': {
                backgroundColor: 'rgba(121, 85, 72, 1)', 
                transform: 'translateY(-2px)', 
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)', 
              },
            }}
          >
            {t('b.button')}
          </Button>
        </Box>
      </Box>
    </Section>
  );
};

export default HeroSection;
