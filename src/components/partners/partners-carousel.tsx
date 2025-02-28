import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

// Using program images for partners from external JSON

interface Partner {
    id: string;
    name: string;
    logo: string;
}

const StyledSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6, 0),
    }
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 1),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 2),
    }
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    animation: 'scroll 30s linear infinite',
    '&:hover': {
        animationPlayState: 'paused',
    },
    '@keyframes scroll': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' }
    },
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(6),
    }
}));

const PartnerLogo = styled(Box)(({ theme }) => ({
    flex: '0 0 auto',
    width: 100,
    height: 100,
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    },
    [theme.breakpoints.up('sm')]: {
        width: 120,
        height: 120,
    },
    [theme.breakpoints.up('md')]: {
        width: 150,
        height: 150,
    }
}));

const PartnersCarousel: React.FC = () => {
    const [partners, setPartners] = React.useState<Partner[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { t } = useTranslation('common')
    const { locale } = useRouter()
    const isRtl = locale === 'ar'

    React.useEffect(() => {
        fetch("https://raw.githubusercontent.com/RamezHany/IGCCe-tr/main/partners.json")
            .then((response) => response.json())
            .then((data) => {
                setPartners(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching partners:", error);
                setLoading(false);
            });
    }, []);

    // Triple the partners for smoother infinite scroll
    const duplicatedPartners = [...partners, ...partners, ...partners];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <StyledSection>
            <Container maxWidth="lg">
                <Typography
                    component="h2"
                    variant="h3"
                    align="center"
                    sx={{
                        mb: { xs: 3, sm: 4, md: 6 },
                        fontWeight: 700,
                        color: '#283A5F',
                        fontSize: { xs: 24, sm: 28, md: 36 },
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',

                    }}
                >
                    {t('home.OurPartners')}
                </Typography>

                <CarouselContainer>
                    <CarouselTrack>
                        {duplicatedPartners.map((partner, index) => (
                            <PartnerLogo key={`${partner.id}-${index}`}>
                                <Box
                                    component="div"
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={150}
                                        height={150}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        priority={index < 5}
                                    />
                                </Box>
                            </PartnerLogo>
                        ))}
                    </CarouselTrack>
                </CarouselContainer>
            </Container>
        </StyledSection>
    );
};

export default PartnersCarousel;
