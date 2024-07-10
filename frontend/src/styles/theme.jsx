import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  colorScheme: 'dark',
  primaryColor: 'blue',
  loader: 'bars'
});

const ThemeProvider = ({ children }) => (
  <MantineProvider theme={theme}>
    {children}
  </MantineProvider>
);

export default ThemeProvider;
