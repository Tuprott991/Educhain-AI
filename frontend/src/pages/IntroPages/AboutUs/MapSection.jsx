import React, { Suspense, lazy } from 'react';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

// Lazy load the map components
const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

// Import CSS
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Loading component for the map
const MapLoading = () => (
    <Box 
        sx={{ 
            height: "500px", 
            width: "100%", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.100',
            borderRadius: 2
        }}
    >
        <CircularProgress />
    </Box>
);

const MapSection = () => {
    // VNU-HCMUS coordinates
    const location = {
        lat: 10.762622,
        lng: 106.682022
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <Box sx={{ py: 6 }}>
                    <motion.div variants={itemVariants}>
                        <Paper elevation={0} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 800,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    mb: 2,
                                    lineHeight: 1.2,
                                }}
                            >
                                Our Location
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                                <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                VNU-HCM University of Science
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    lineHeight: 1.6,
                                    fontWeight: 400,
                                }}
                            >
                                EduChain-AI is developed at the University of Science, Vietnam National University Ho Chi Minh City -
                                one of Vietnam's leading institutions in Information Technology education and research.
                            </Typography>
                        </Paper>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                overflow: 'hidden', 
                                borderRadius: 2,
                                transform: 'scale(0.98)',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1)',
                                }
                            }}
                        >
                            <Suspense fallback={<MapLoading />}>
                                <MapContainer
                                    center={[location.lat, location.lng]}
                                    zoom={15}
                                    style={{ height: "500px", width: "100%" }}
                                    zoomControl={false}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[location.lat, location.lng]}>
                                        <Popup>
                                            VNU-HCM University of Science <br />
                                            227 Nguyen Van Cu Street, District 5, Ho Chi Minh City
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Suspense>
                        </Paper>
                    </motion.div>
                </Box>
            </motion.div>
        </Container>
    );
};

export default MapSection;