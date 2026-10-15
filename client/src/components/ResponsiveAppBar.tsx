import { useState } from 'react';
import type { MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import type { NavLinkItem } from '../types/navigation';

interface ResponsiveAppBarProps {
  appName?: string;
  navLinks: NavLinkItem[];
  settingsLinks?: NavLinkItem[];
}

function ResponsiveAppBar({ appName, navLinks, settingsLinks }: ResponsiveAppBarProps) {
  const homeRoute = navLinks.length > 0 ? navLinks[0].route : '/';
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.paper', // Fondo claro para que resalte el "brand-deep-blue"
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary'
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
        <Toolbar disableGutters>
          {/* LOGO ESCRITORIO*/}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to={homeRoute}
            sx={{
              mr: 6,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              color: 'var(--brand-deep-blue)',
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>

          {/* LOGO MOVIL */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 800,
              color: 'var(--brand-deep-blue)',
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>

          {/* ENLACES ESCRITORIO */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={RouterLink}
                to={link.route}
                sx={{ 
                  my: 2, 
                  color: 'text.secondary', 
                  display: 'block',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  '&:hover': {
                    color: 'var(--brand-deep-blue)',
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          
          {/* MENU MOVIL */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.label} onClick={handleCloseNavMenu} component={RouterLink} to={link.route}>
                  <Typography sx={{ fontWeight: 600 }}>{link.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* MENU DE USUARIO */}
          {settingsLinks && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Ajustes">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: '2px solid transparent', '&:hover': { borderColor: 'var(--brand-deep-blue)' } }}>
                  <Avatar sx={{ width: 35, height: 35 }} alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingsLinks.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu} component={RouterLink} to={setting.route}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;