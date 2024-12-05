import React, { PropsWithChildren, useEffect, useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import FormIcon from '@mui/icons-material/FormatListNumberedRtl';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeIcon from '@mui/icons-material/MilitaryTech';
import { Container, Menu, MenuItem, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { ICompanyInformation, IUser, ROLES } from '~/types';
import { Get, auth, collections, useErrorNotif, useLogin } from '~/utils';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

/**
 * TemporaryDrawer component provides a navigation drawer with user and company information.
 * It includes links to various sections of the application and handles user authentication state.
 *
 * @param {boolean} hasContainer - Determines if the children should be wrapped in a container.
 * @param {React.ReactNode} children - The content to be displayed within the drawer.
 * @returns {JSX.Element} The rendered component.
 */
export default function TemporaryDrawer({
  hasContainer,
  children,
}: PropsWithChildren<{
  hasContainer?: boolean;
}>) {
  const [companyInfo, setCompanyInfo] = useState<
    ICompanyInformation | undefined
  >();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();

  const { user } = useLogin();

  useEffect(() => {
    const getCompanyInfo = async () => {
      const data = await Get<ICompanyInformation>({
        docRef: collections.companyInfo.ref,
      });
      setCompanyInfo(data);
    };

    if (!companyInfo) getCompanyInfo();
  }, [companyInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await Get<IUser>({
        docRef: `${collections.users.string}/${user?.uid}`,
      });
      setUserInfo(data);
    };

    if (!userInfo && user) getUserInfo();
  }, [userInfo, user]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { checkState } = useLogin('/');
  const showError = useErrorNotif();

  const handleLogout = async () => {
    try {
      signOut(auth);
      checkState();
    } catch (err) {
      showError(err);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/legacy/home2')}>
          <Box display='flex' alignItems='center'>
            <ListItemIcon>
              <img
                draggable={false}
                src={companyInfo?.logo}
                style={{ maxHeight: '2rem' }}
                alt='company-logo'
              />
            </ListItemIcon>
            {/* <Typography>
              <strong>{companyInfo?.companyName}</strong>
            </Typography> */}
          </Box>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[
          { label: 'About Us', Icon: CircleIcon, link: '/legacy/home2' },
          {
            label: 'Contact Us',
            Icon: CircleIcon,
            link: '/legacy/home2',
          },
          { label: 'Journey', Icon: CircleIcon, link: '/legacy/home2' },
        ].map(({ label, Icon, link }) => (
          <ListItem onClick={() => navigate(link)} button key={label}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <Divider />
        {userInfo &&
          userInfo.roles.includes(ROLES.ADMIN) &&
          [
            {
              label: 'Forms',
              Icon: FormIcon,
              link: '/forms',
            },
            // { label: 'Orders', Icon: ReceiptLongIcon, link: '/orders' },
            // { label: 'Inventory', Icon: InventoryIcon, link: '/inventory' },
            // { label: "Contact", Icon: PhoneIcon, link: "/contact" },
          ].map(({ label, Icon, link }) => (
            <ListItem onClick={() => navigate(link)} button key={label}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const navigate = useNavigate();
  return (
    <>
      {companyInfo && (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position='sticky'
              elevation={0}
              sx={{ mb: 2 }}
              color='transparent'
            >
              <Toolbar>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer('left', true)}
                >
                  <MenuIcon />
                </IconButton>
                <Box component='div' sx={{ flexGrow: 1 }}>
                  <img
                    draggable={false}
                    src={companyInfo?.logo}
                    style={{ maxHeight: '2rem' }}
                    alt='company-logo'
                  />
                </Box>

                <Stack spacing={2} className='items-center' direction='row'>
                  <div>
                    <IconButton onClick={handleOpenMenu}>
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      open={open}
                      onClose={handleCloseMenu}
                      anchorEl={anchorEl}
                    >
                      <h1 className='mx-5 my-5'>Hello {userInfo?.firstName}</h1>
                      <Divider />
                      <MenuItem onClick={() => navigate('/legacy/badges-page')}>
                        <ListItemIcon>
                          <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Badges' />
                      </MenuItem>

                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                      </MenuItem>
                    </Menu>
                  </div>
                </Stack>
              </Toolbar>
            </AppBar>
            {hasContainer ? <Container>{children}</Container> : children}
          </Box>

          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </div>
      )}
    </>
  );
}
