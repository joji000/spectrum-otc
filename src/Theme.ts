'use client'

import { createTheme } from '@mui/material/styles'
import { Noto_Sans_Thai } from 'next/font/google'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
})

const theme = createTheme({
  typography: {
    fontFamily: notoSansThai.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#6A79FA',
    },
    secondary: {
      main: '#D701A2',
    },
    grey: {
      300: '#333235',
      400: '#ADB7BE',
      500: '#333336',
      600: '#1C1D1F',
    },
    background: {
      paper: '#232426',
      default: '#232426',
    },
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 8,
})

theme.components = {
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        fontSize: 22,
        borderRadius: 6,
        height: 39,
      },
      colorDefault: {
        backgroundColor: '#333336',
        color: '#ffffff',
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none', // Remove underline
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      contained: {
        background: 'linear-gradient(to right,#D40075, #4340FF)',

        '&:hover': {
          filter: 'contrast(1.5)',
        },
        borderRadius: 20
      },
      outlined: {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 20
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      sizeSmall: {
        width: 20,
        height: 20,

        '& .MuiIcon-root': {
          fontSize: 14,
        },
      },
      sizeMedium: {
        width: 30,
        height: 30,

        '& .MuiIcon-root': {
          fontSize: 24,
        },
      },
      root: {
        color: '#ADB7BE',
        background: '#333235',

        '&:hover': {
          background: '#444444',
        },
      },
      colorPrimary: {
        background: 'linear-gradient(to right, #400ED3 0%, #5562FC 100%)',
        color: '#FFF',
        '&:hover': {
          background: 'linear-gradient(to right, #5562FC 0%, #400ED3 100%)',
        },
      },
    },
  },
  MuiTypography: {
    variants: [
      {
        props: {
          color: 'gradient',
        },
        style: {
          background: 'linear-gradient(180deg, #FFFFFF 50%, #999999 110.42%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      },
      {
        props: {
          variant: 'h3',
        },
        style: {
          fontSize: 36,
        },
      },
      {
        props: {
          variant: 'h6',
        },
        style: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
    ],
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 50,
        height: 30,
        padding: 0,
        borderRadius: '99px',
        display: 'flex',
      },
      switchBase: {
        padding: 1,
        transform: 'translateX(0px)',
        '&.Mui-checked': {
          transform: 'translateX(21px)',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.primary.main,
            opacity: 1,
          },
        },
      },
      thumb: {
        width: 28,
        height: 28,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.5)',
      },
      track: {
        backgroundColor: '#78788029',
        opacity: 1,
      },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        '& .MuiListItemText-root .MuiTypography-root': {
          fontWeight: 500,
        },

        '&.Mui-selected': {
          boxShadow: `inset 4px 0 0 0 ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.grey[600],

          '& .MuiListItemText-root .MuiTypography-root': {
            fontWeight: 600,
          },
        },
      },
    },
  },

  MuiPaper: {
    variants: [
      {
        props: {
          variant: 'haftGradient',
        },
        style: {
          background: 'linear-gradient(to right, #212243 0%, #1C1D1F 100%)',
        },
      },
      {
        props: {
          variant: 'primaryGradient',
        },
        style: {
          background: 'linear-gradient(to right, #292D5C 0%, #212142 100%)',
        },
      },
      {
        props: {
          variant: 'elevation',
        },
        style: {
          backgroundColor: 'grey.600',
          color: 'common.white',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    ],
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: 16,
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      slotProps: {
        inputLabel: {
          shrink: true,
        },
      },
    },
  },
}

export default theme