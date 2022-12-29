import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#8843F2',
    },
    secondary: {
      main: '#EF2F88',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#F9D371',
    },
    secondary: {
      main: '#EF2F88',
    },
  },
});

const Page = () => {

  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ?
      'darkTheme'
      :
      'defaultTheme'
  )

  const themes = {
    defaultTheme,
    darkTheme
  };

  const toggleTheme = () => {
    let themeKeys = Object.keys(themes);
    let currentIndex = themeKeys.indexOf(theme);
    if (currentIndex >= (themeKeys.length - 1) || currentIndex <= -1) {
      setTheme(themeKeys[0])
    } else {
      setTheme(themeKeys[currentIndex + 1])
    };
  };

  const handleBackground = () => {
    switch (theme) {
      case "darkTheme":
        return "#000000";
      default:
        return "#F9D371";
    };
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: handleBackground() },
        }}
      />
      <App toggleTheme={toggleTheme} theme={themes[theme]} />
    </ThemeProvider>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Page />
);
