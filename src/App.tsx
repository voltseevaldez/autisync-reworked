import { useState } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// eslint-disable-next-line
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import { Pages } from './Routes';

import { WithAuth } from '~/layouts';
import CustomTheme from '~/theme';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     background: (props: any) => props.palette.background.default,
//   },
// }));

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    false
    // localStorage.getItem("darkMode") === null
    //   ? true
    //   : localStorage.getItem("darkMode") === "true"
    //   ? true
    //   : false
  );
  // const classes = useStyles(theme as Theme);
  // TODO - Refactor?
  const clientId =
    (import.meta as any).env.VITE_APP_PAYPAL_CLIENT_ID ||
    'AXv0bXQgDlWJJvvsO_7aBxSlwoByie-N9ROT2qtLE9eBeDKZRxuC4C5uSRXh2xDDoAktahoUTGexmPqC';
  const theme = darkMode ? CustomTheme.darkTheme : CustomTheme.lightTheme;

  const toggleTheme = () => {
    setDarkMode((curr) => {
      localStorage.setItem('darkMode', JSON.stringify(!curr));
      return !curr;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PayPalScriptProvider options={{ clientId }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <Routes>
              {Pages.map(({ path, Component, requireAuth, requireAdmin }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    requireAuth ? (
                      <WithAuth
                        requireAdmin={requireAdmin}
                        Component={Component}
                      />
                    ) : (
                      <Component
                        darkMode={darkMode}
                        toggleTheme={toggleTheme}
                      />
                    )
                  }
                />
              ))}
            </Routes>
          </Router>
        </LocalizationProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default App;
