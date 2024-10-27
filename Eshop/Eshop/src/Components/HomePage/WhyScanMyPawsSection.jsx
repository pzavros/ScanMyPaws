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
    <Section backgroundColor="#ffffff" padding="64px 16px">
      {/* Title and Description */}
      <Box textAlign="center" mb={6}>
        <Text variant="h4" sx={{ fontWeight: 'bold', color: 'var(--text-color)' }}>
          {t('b.whyScanMyPawsTitle')}
        </Text>
        <Text variant="body1" sx={{ color: 'var(--text-color)', maxWidth: '600px', mx: 'auto', mt: 2 }}>
          {t('b.whyScanMyPawsDescription')}
        </Text>
      </Box>

      {/* Feature Cards */}
      <Row gap={3} justifyContent="center" sx={{ flexWrap: isMobile ? 'wrap' : 'nowrap', maxWidth: '1200px', mx: 'auto' }}>
        {/* Card 1 */}
        <Column md={3} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: isMobile ? 4 : 0 }}>
          <Card sx={{ padding: '24px', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '280px', textAlign: 'center' }}>
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
          <Card sx={{ padding: '24px', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '280px', textAlign: 'center' }}>
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
          <Card sx={{ padding: '24px', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '280px', textAlign: 'center' }}>
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
    </Section>
  );
};

export default WhyScanMyPawsSection;
