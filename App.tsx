import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
//
import theme from './src/theme';
import { Start } from './src/screen/Start';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loader } from './src/components/Loader';
import { SingUp } from './src/screen/SingUp';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {fontLoader ? <SingUp/> : <Loader/>}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

