import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { linkedinPosts, loadLinkedinPostsData } from '@/components/home/linkedin-posts.data';
import { MainLayout } from '@/components/layout';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { LinkedinPost } from '@/interfaces/LinkedinPost';
import { Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { defaultSEO } from '@/utils/seo.config';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.3s ease-in-out',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    },
}));

const AllLinkedinPosts: FC = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { locale } = router;
    const [posts, setPosts] = useState<LinkedinPost[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<LinkedinPost | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            await loadLinkedinPostsData();
            setPosts(linkedinPosts);
        };
        
        loadPosts();
    }, []);

    const handleOpenModal = (post: LinkedinPost) => {
        setSelectedPost(post);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box
            sx={{
                pt: { xs: 4, md: 8 },
                pb: { xs: 8, md: 12 },
                backgroundColor: 'background.default',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            mb: 2, 
                            fontSize: { xs: 32, md: 48 }, 
                            fontWeight: 'bold' 
                        }}
                    >
                        {locale === 'ar' 
                            ? t('linkedinPosts.allPostsTitle', 'جميع منشورات لينكد إن') 
                            : t('linkedinPosts.allPostsTitle', 'All LinkedIn Posts')}
                    </Typography>
                    <Typography 
                        variant="h5" 
                        color="textSecondary" 
                        sx={{ 
                            maxWidth: 800, 
                            mx: 'auto', 
                            mb: 6 
                        }}
                    >
                        {locale === 'ar' 
                            ? t('linkedinPosts.allPostsDescription', 'استكشف جميع منشوراتنا على لينكد إن واطلع على آخر الأخبار والرؤى') 
                            : t('linkedinPosts.allPostsDescription', 'Explore all our LinkedIn posts and stay updated with the latest news and insights')}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <StyledPaper onClick={() => handleOpenModal(post)}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LinkedInIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
                                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                                        LinkedIn
                                    </Typography>
                                </Box>
                                
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        color: 'text.primary',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {locale === 'ar' ? post.title_ar : post.title}
                                </Typography>
                                
                                {/* Preview of LinkedIn embed */}
                                <Box 
                                  sx={{ 
                                    mb: 2,
                                    flexGrow: 1,
                                    height: 150,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    borderRadius: 1,
                                    border: '1px solid #e0e0e0',
                                  }}
                                >
                                  <iframe
                                    src={post.embedUrl}
                                    height="150"
                                    width="100%"
                                    frameBorder="0"
                                    title={post.title}
                                    style={{ 
                                      pointerEvents: 'none',
                                    }}
                                  ></iframe>
                                </Box>
                                
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the parent onClick
                                        handleOpenModal(post);
                                    }}
                                    startIcon={<LinkedInIcon />}
                                    sx={{ alignSelf: 'flex-start', mt: 'auto' }}
                                >
                                    {locale === 'ar' ? t('buttons.viewPost', 'عرض المنشور') : t('buttons.viewPost', 'View Post')}
                                </Button>
                            </StyledPaper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => router.push('/')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            borderRadius: 2,
                        }}
                    >
                        {locale === 'ar' 
                            ? t('buttons.backToHome', 'العودة إلى الصفحة الرئيسية') 
                            : t('buttons.backToHome', 'Back to Home')}
                    </Button>
                </Box>
            </Container>

            {/* LinkedIn Post Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="linkedin-post-modal"
                aria-describedby="view-linkedin-post-embed"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '90%', sm: '80%', md: '70%' },
                        maxWidth: 800,
                        maxHeight: '90vh',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: { xs: 2, sm: 3, md: 4 },
                        overflow: 'auto',
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    
                    <Typography variant="h5" component="h2" sx={{ mb: 3, pr: 4 }}>
                        {selectedPost && (locale === 'ar' ? selectedPost.title_ar : selectedPost.title)}
                    </Typography>
                    
                    {selectedPost && (
                        <Box sx={{ 
                            position: 'relative', 
                            width: '100%', 
                            height: 600,
                            overflow: 'hidden',
                            '& iframe': {
                                border: 'none',
                                width: '100%',
                                height: '100%',
                            }
                        }}>
                            <iframe
                                src={selectedPost.embedUrl}
                                height="600"
                                width="100%"
                                frameBorder="0"
                                allowFullScreen
                                title={selectedPost.title}
                            ></iframe>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

AllLinkedinPosts.getLayout = (page) => <MainLayout seo={defaultSEO}>{page}</MainLayout>;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default AllLinkedinPosts;
