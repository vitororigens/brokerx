import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
//
import theme from './src/theme';
import { Start } from './src/screen/Start';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Start/>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

