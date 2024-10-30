// src/Components/HomePage/WhyScanMyPawsSection.jsx
import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Section from '../ReusableComponents/Section';
import Text from '../ReusableComponents/Text';
import Row from '../ReusableComponents/Row';
import Column from '../ReusableComponents/Column';
import Card from '../ReusableComponents/Card';
import Translate from '../ReusableComponents/Translate';

const WhyScanMyPawsSection = () => {
  const { t } = Translate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Title and Description */}
      <Box mb={6}>
        <Text variant="h4" sx={{ textAlign: "left", fontWeight: 'bold', color: 'var(--text-color)' }}>
          {t('b.whyScanMyPawsTitle')}
        </Text>
        <Text variant="body1" sx={{ color: 'var(--text-color)', textAlign: 'left' }}>
          {t('b.instantAccessDescription')}
        </Text>
      </Box>

      {/* Feature Cards */}
      <Row
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          maxWidth: '100%',
          gap: 3,
          justifyContent: 'center',
        }}
      >

        {/* Card 1 */}
        <Column md={3} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 4 : 0 }}>
          <Card
            sx={{
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '280px',
              textAlign: 'center',
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >

            <Box component="img" src="/HomePage/dogGraphic.png" alt="Instant Access" sx={{ width: '100%', borderRadius: '8px', mb: 3 }} />
            <Text variant="h6" sx={{ fontWeight: 'bold', color: 'var(--text-color)', mb: 1 }}>
              {t('b.instantAccessTitle')}
            </Text>
            <Text variant="body2" sx={{ color: 'var(--text-color)' }}>
              {t('b.instantAccessDescription')}
            </Text>
          </Card>
        </Column>

        {/* Card 2 */}
        <Column md={3} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 4 : 0 }}>
        <Card
            sx={{
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '280px',
              textAlign: 'center',
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box component="img" src="/HomePage/dogGraphic.png" alt="Easy Updates" sx={{ width: '100%', borderRadius: '8px', mb: 3 }} />
            <Text variant="h6" sx={{ fontWeight: 'bold', color: 'var(--text-color)', mb: 1 }}>
              {t('b.easyUpdatesTitle')}
            </Text>
            <Text variant="body2" sx={{ color: 'var(--text-color)' }}>
              {t('b.easyUpdatesDescription')}
            </Text>
          </Card>
        </Column>

        {/* Card 3 */}
        <Column md={3} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 4 : 0 }}>
        <Card
            sx={{
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '280px',
              textAlign: 'center',
              backgroundColor: 'white',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box component="img" src="/HomePage/dogGraphic.png" alt="Share Profile" sx={{ width: '100%', borderRadius: '8px', mb: 3 }} />
            <Text variant="h6" sx={{ fontWeight: 'bold', color: 'var(--text-color)', mb: 1 }}>
              {t('b.shareProfileTitle')}
            </Text>
            <Text variant="body2" sx={{ color: 'var(--text-color)' }}>
              {t('b.shareProfileDescription')}
            </Text>
          </Card>
        </Column>

        {/* Card 4 */}
        <Column md={3} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 4 : 0 }}>
          <Card sx={{ padding: '24px', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '280px', textAlign: 'center' }}>
            <Box component="img" src="/HomePage/dogGraphic.png" alt="Donation" sx={{ width: '100%', borderRadius: '8px', mb: 3 }} />
            <Text variant="h6" sx={{ fontWeight: 'bold', color: 'var(--text-color)', mb: 1 }}>
              {t('b.donationTitle')}
            </Text>
            <Text variant="body2" sx={{ color: 'var(--text-color)' }}>
              {t('b.donationDescription')}
            </Text>
          </Card>
        </Column>
      </Row>
    </Box>
  );
};

export default WhyScanMyPawsSection;
