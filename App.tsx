import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
//
import theme from './src/theme';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loader } from './src/components/Loader';
import { SingIn } from './src/screen/SingIn';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      {fontLoader ? <SingIn/> : <Loader/>}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

