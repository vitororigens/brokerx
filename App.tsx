import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
//
import { Loader } from './src/components/Loader';
import { Routes } from './src/routes';
import theme from './src/theme';
import { ToastProvider } from 'react-native-toast-notifications';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {fontLoader ? <Routes /> : <Loader />}
        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}

