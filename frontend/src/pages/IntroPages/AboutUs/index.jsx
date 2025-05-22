// Importing React and necessary MUI components
import { Container, Box, CircularProgress } from '@mui/material';
import { Suspense, lazy } from 'react';

// Importing built-in components
import Page from '@components/Page';

// Lazy load components
const TeamIntroduction = lazy(() => import('./TeamIntroduction'));
const MapSection = lazy(() => import('./MapSection'));

// Loading component
const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
    </Box>
);

// Main content of the About Us page
const MainContent = () => (
    <Container maxWidth="xl">
        {/* Team introduction */}
        <Suspense fallback={<LoadingFallback />}>
            <TeamIntroduction />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
            <MapSection />
        </Suspense>
    </Container>
);

// About Us page
export default function AboutUs() {
    return (
        <Page title="About Us">
            <Box sx={{ background: 'transparent', minHeight: '100vh', pt: 10, pb: 8, mt: 8 }}>
                <MainContent />
            </Box>
        </Page>
    );
}
