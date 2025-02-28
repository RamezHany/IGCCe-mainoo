import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FooterNavigation, FooterSocialLinks } from '@/components/footer';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Footer: FC = () => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    const isRtl = locale === 'ar';

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#283A5F', // Background color
                py: { xs: 6, md: 10 }, // Padding top and bottom
                color: 'primary.contrastText', // Text color
                borderTop: '2px solid', // Add a border at the top
                borderColor: 'secondary.main', // Border color
            }}
        >
            <Container>
                <Grid container spacing={3}>
                    {/* Left Section (Brand Info and Social Links) */}
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                width: '100%',
                                minWidth: 360, // Limit width for better readability
                                mb: { xs: 4, md: 0 }, // Add margin bottom on mobile
                                textAlign: { xs: 'center', md: 'left' }, // Center on mobile, left-align on desktop
                                ml: { xs: 1 },
                            }}
                        >
                            {/* Title */}
                            <Typography
                                component="h2"
                                variant="h2"
                                sx={{
                                    mb: 2,
                                    fontSize: { xs: 28, md: 32 }, // Responsive font size
                                    fontWeight: 'bold', // Bold title
                                }}
                            >
                                IGCC Egypt
                            </Typography>

                            {/* Subtitle */}
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    letterSpacing: 1,
                                    mb: 3,
                                    lineHeight: 1.6, // Better readability
                                    opacity: 0.9, // Slightly lighter text
                                }}
                            >
                                {t('Footer.footerpragraphs')}
                            </Typography>

                            {/* Social Links */}
                            <FooterSocialLinks />
                        </Box>
                    </Grid>

                    {/* Right Section (Footer Navigation) */}
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'center', md: 'flex-end' }, // Center on mobile, align right on desktop
                            }}
                        >
                            {/* Embedded Google Map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213.2080705972283!2d29.96317888394875!3d31.239310869550305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c52863cf22fb%3A0x5a90b8653b3b6e6a!2s587%20Barbar%2C%20San%20Stefano%2C%20El%20Raml%201%2C%20Alexandria%20Governorate%205451010!5e0!3m2!1sen!2seg!4v1740500000603!5m2!1sen!2seg"
                                width="500"
                                height="250"
                                loading="lazy"
                            ></iframe>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright Section */}
                <Box
                    sx={{
                        mt: 4, // Add margin-top for spacing
                        pt: 3, // Add padding-top for spacing
                        borderTop: '1px solid', // Add a border at the top
                        borderColor: 'secondary.main', // Border color
                        textAlign: 'center', // Center-align the text
                        opacity: 0.8, // Slightly lighter text
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} IGCC Egypt. {t('Footer.copyright')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;