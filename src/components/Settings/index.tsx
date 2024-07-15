import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Container, Icon, Title } from './styles';
import auth from '@react-native-firebase/auth';

export function Settings() {
    const navigation = useNavigation();

    function handleLogout() {
        auth()
          .signOut()
          .then(() => console.log('User signed out'))
          .catch(error => console.error('Error signing out:', error));
    }

    function handlePerfil() {
        navigation.navigate('perfil');
    }

    return (
        <Container>
            <Button onPress={handlePerfil}>
                <Icon name="pencil" />
                <Title>Dados</Title>
            </Button>
            <Button onPress={handleLogout}>
                <Icon name="log-out" />
                <Title>Sair</Title>
            </Button>
        </Container>
    );
}
