import { useMemo, useState } from 'react';
import { 
  Box, 
  CardHeader, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Stack,
  FormControl,
  InputAdornment,
  InputLabel,
  FilledInput,
  IconButton,
  CardActions,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { CustomizedCardHeader } from './styles';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const isDisabled = useMemo(() => !(username && password), [username, password]);

  const postLogin = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        login: username,
        senha: password
      })
  };
    setErrorMessage('');
    fetch('http://localhost:3000/usuarios/login', requestOptions)
      .then(async (response) => {
        const dataResponse = await response.json()
        return {
          responseStatus: response.status,
          data: dataResponse
        }
      })
      .then(data => {
        if(data.responseStatus === 422 && data.data?.mensagem) {
          setErrorMessage(data.data?.mensagem)
        } else if(data.responseStatus === 400) {
          setErrorMessage('Requisição inválida!')
        } else if(data.responseStatus === 200) {
          navigate('/tarefas');
        } 
      })
      .catch(() => setErrorMessage('Erro no servidor, tente novamente em alguns minutos!'));
  }

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
            <TextField id="username" label="Usuário" variant="filled" onChange={(e) => setUsername(e.target.value)} />
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                onChange={(newValue) => {
                  setPassword(newValue.target.value);
                }}
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions>
          <Box sx={{
            display:'flex',
            flexDirection:'row',
            width:'100%',
            flexWrap: 'wrap'
          }}>
            <Box width={'100%'} textAlign="center">
              {errorMessage && <Typography color={'red'}>
                {errorMessage}
              </Typography>}
            </Box>
            <Box width={'100%'}>
              <Button
                sx={{
                  width: '100%'
                }}
                onClick={() => {postLogin()}}
                disabled={isDisabled} fullWidth variant="contained">
                  Login
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login;
