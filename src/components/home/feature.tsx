import React, { FC } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import SocialLinks from "@/components/home/SocilaLiks";

const HomeFeature: FC = () => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const isRtl = locale === 'ar'

  return (
    <Box id="feature" sx={{ xs: 10, md: 14 , backgroundColor: 'background.paper' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              <Image src="/images/Nourhan_m_Hassan.png" width={650} height={678} quality={97} alt="Feature img" />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              component="h2"
              sx={{
                position: 'relative',
                fontSize: { xs: 40, md: 50 },
                ml: { xs: 0 },
                mt: 2,
                mb: 3,
                lineHeight: 1,
                fontWeight: 'bold',
                textAlign: isRtl ? 'right' : 'left',
              }}
            >
              {t('home.launchCareer')}{' '}
              <Typography
                component="mark"
                sx={{
                  position: 'relative',
                  color: '#283A5F',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  backgroundColor: 'unset',
                }}
              >
                {t('home.withIGCC')} <br />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 28 },
                    transform: isRtl ? 'rotate(-3deg)' : 'rotate(3deg)',
                    [isRtl ? 'right' : 'left']: 2,
                    '& img': { width: { xs: 140, md: 175 }, height: 'auto' },
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/headline-curve.svg" alt={t('home.withIGCC')} />
                </Box>
              </Typography>
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                mb: 2,
                ml: { xs: 0, md: 4 },
                textAlign: isRtl ? 'left' : 'left',
                direction: isRtl ? 'rtl' : 'ltr'
              }}
            >
              {t('home.mainDescription')}
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                ml: { xs: 0, md: 4 },
                textAlign: isRtl ? 'left' : 'left',
                direction: isRtl ? 'rtl' : 'ltr'
              }}
            >
              {t('home.vision2030')}
            </Typography>
          {/*  the social links app  */}
              <Typography
                  sx={{
                      color: 'text.secondary',
                      ml: { xs: 0, md: 4 },
                      textAlign: isRtl ? 'left' : 'left',
                      direction: isRtl ? 'rtl' : 'ltr',
                      mt: 2
                  }}
              >
              </Typography>

              <Box
                  sx = {{
                      paddingRight : '40px'
                  }}
              >
                  <SocialLinks />
              </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeFeature
