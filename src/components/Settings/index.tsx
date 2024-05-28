import { Button, Container, Icon, Title } from "./styles";
import auth from "@react-native-firebase/auth";

export function Settings() {
    function handleLogout() {
        auth()
          .signOut()
          .then(() => console.log('User signed out'));
    }
    return (
        <Container>
            <Button>
                <Icon name="pencil" />
                <Title>Dados</Title>
            </Button>
            <Button onPress={handleLogout} >
                <Icon name="log-out" />
                <Title>Sair</Title>
            </Button>
        </Container >
    )
}