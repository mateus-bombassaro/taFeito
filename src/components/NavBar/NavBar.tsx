import * as React from "react";
import { useEffect, useState } from "react";

import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem} from '@mui/material';
import {TaskAlt, Logout} from '@mui/icons-material';

import { api } from '../../providers/customAxios';

import { url_usuarios_autenticado } from '../../utils/api';

type NavBarProps = {
  logout: () => void
}

const NavBar = (props: NavBarProps) => {

  const { logout } = props;

  const [userData, setUserData] = useState<null | {
    nome: string;
    login: string;
    admin: boolean;
  }>(null);

  useEffect(() => {
    api.get(url_usuarios_autenticado).then((response) => {
      setUserData(response.data.usuario);
    });
  }, []);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TaskAlt sx={{ display: "flex", mr: 2 }} />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TaFeito
            </Typography>
            {userData ? (
              <Typography> Bem vindo: {userData.nome} </Typography>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Usuario Anonimo" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logout}>
                <Logout sx={{ display: "flex", mr: 2 }} />
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;