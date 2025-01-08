import { CircularProgress, Container } from '@mui/material'

const PageLoading = () => {
  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  )
}

export default PageLoading
