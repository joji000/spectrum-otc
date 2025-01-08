/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Paper } from '@mui/material'

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    gradient: true
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    primaryGradient: true
    haftGradient: true
  }
}