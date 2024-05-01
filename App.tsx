import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
//
import { Loader } from './src/components/Loader';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {fontLoader ? <Routes/> : <Loader/>}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

