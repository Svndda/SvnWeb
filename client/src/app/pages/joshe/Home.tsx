/**
 * Professional Profile for Joshebeth Carmona Sánchez
 * Language: Spanish (UI) / English (Code & Docs)
 * Improvements: Added refined Spanish copy and structured service descriptions.
 */

import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import { StyledCard } from '../../../components/Card';
import { HeroSection } from '../../../components/HeroSection';
import { SectionTitle } from '../../../components/SectionTitle';
import { BodyText } from '../../../components/BodyText';
import { Title } from '../../../components/Title';
import { InstagramFeed } from '../../../components/InstagramFeed';

// Update these with actual brand names later
const BRANDS = ['OPI', 'MIA SECRET', 'GELISH', 'KIARA SKY'];

export default function HomeJM() {
  return (
    <Box sx={{ bgcolor: 'var(--color-background)', minHeight: '100vh', width: '100%' }}>
      
      {/* 1. HERO SECTION */}
      <HeroSection component="header">
        <Container maxWidth={false}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: 'var(--white)' }}>
            Joshebeth Carmona Sánchez
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300, mt: 2, color: 'var(--white)' }}>
            Especialista en Estética y Nail Art Profesional
          </Typography>
        </Container>
      </HeroSection>

      {/* 2. ABOUT & CONTACT SECTION */}
      <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle variant="h3">Experiencia y Visión</SectionTitle>
            <BodyText sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Con más de 3 años de trayectoria en la industria de la belleza, Joshebeth se 
              especializa en el cuidado avanzado de uñas y diseño artístico. Su enfoque 
              profesional se define por un compromiso riguroso con la higiene, la integridad 
              estructural y las últimas tendencias estéticas. Formada en técnicas de vanguardia, 
              cada servicio es una pieza personalizada diseñada para resaltar el estilo propio 
              y la salud de tus manos.
            </BodyText>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <StyledCard sx={{ p: 4, bgcolor: 'var(--brand-deep-blue)', color: 'white' }}>
              <Title sx={{ color: 'white', mb: 3 }}>Reserva tu Cita</Title>
              <Stack spacing={2}>
                <Typography><strong>Teléfono:</strong> [TELÉFONO_AQUÍ]</Typography>
                <Typography><strong>Correo:</strong> [CORREO_AQUÍ]</Typography>
                <Typography><strong>Ubicación:</strong> [DIRECCIÓN_O_CIUDAD]</Typography>
                <Typography><strong>Horario:</strong> [HORARIO_DE_ATENCIÓN]</Typography>
              </Stack>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>

      {/* 3. INSTAGRAM MODULE */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.02)', py: 8, px: { xs: 2, md: 8 } }}>
        <Container maxWidth={false}>
          <SectionTitle textAlign="left">Galería de Trabajos</SectionTitle>
          <InstagramFeed username="joshemanicurista" />
        </Container>
      </Box>

      {/* 4. SERVICES SECTION */}
      <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, md: 8 } }}>
        <SectionTitle>Servicios Premium</SectionTitle>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StyledCard>
              <Title variant="h6">Manicura Pro</Title>
              <BodyText>Cuidado profundo de cutículas, limado de precisión y esmaltado de alta duración con acabado impecable.</BodyText>
            </StyledCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StyledCard>
              <Title variant="h6">Pedicura Estética</Title>
              <BodyText>Tratamiento integral para la salud y belleza de tus pies, garantizando suavidad y frescura.</BodyText>
            </StyledCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StyledCard>
              <Title variant="h6">Extensiones Polygel</Title>
              <BodyText>Uñas esculpidas con tecnología Polygel: máxima resistencia, ligereza y un aspecto totalmente natural.</BodyText>
            </StyledCard>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StyledCard>
              <Title variant="h6">Nail Art Artístico</Title>
              <BodyText>Diseños personalizados a mano alzada, desde minimalismo elegante hasta creaciones complejas.</BodyText>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>

      {/* 5. BRANDS USED */}
      <Box sx={{ py: 6, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="overline" 
            display="block" 
            textAlign="center" 
            sx={{ mb: 4, letterSpacing: 2, fontWeight: 700 }}
          >
            Marcas Profesionales de Confianza
          </Typography>
          <Stack 
            direction="row" 
            flexWrap="wrap" 
            justifyContent="center" 
            alignItems="center" 
            spacing={6}
            sx={{ opacity: 0.6, filter: 'grayscale(100%)' }}
          >
            {BRANDS.map((brand) => (
              <Typography key={brand} sx={{ fontWeight: 600 }}>{brand}</Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: '1px solid #eee' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Joshebeth Carmona Sánchez. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}