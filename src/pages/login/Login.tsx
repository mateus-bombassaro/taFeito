import { 
  Box, 
  CardHeader, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Stack 
} from '@mui/material';

import {CustomizedCardHeader} from './styles';


const Login = () => {
  return (
    <Box sx={{
      width: "100%", 
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'primary.dark'
    }} >
      <Card sx={{ max: 470 }}>
        <CustomizedCardHeader title="TaFeito" subheader="Transforme suas ideias em ações" titleTypographyProps={{align: 'center'}} subheaderTypographyProps={{align: 'center'}} />
        <CardHeader  titleTypographyProps={{color: 'text.primary', textAlign: 'center'}} />
        <CardContent>
          <Stack spacing={2} direction="column">
            <TextField id="username" label="Usuário" variant="filled" />
            <TextField type="password" id="password" label="Senha" variant="filled" />
          </Stack>
        </CardContent>
        <CardContent>
          <Button fullWidth variant="contained">Login</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login;
