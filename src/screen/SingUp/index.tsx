import { ActivityIndicator, ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { Container, Content, SubTitle, Title, Text } from "./styles";
import { useTheme } from "styled-components/native";
import { useState } from "react";
import { Toast } from "react-native-toast-notifications";
import auth from "@react-native-firebase/auth";
import { database } from "../../services";



export function SignUp() {
    const { COLORS } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        creci: '',
        phone: '',
        realEstate: ''

    });
    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        creciError: '',
        phoneError: '',
        realEstateError: ''
    });

    function validatePhone(phone: string) {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone);
    }
    

    function validateForm() {
        let isValid = true;
    
        if (!user.name.trim()) {
            setErrors(prevState => ({
                ...prevState,
                nameError: 'O nome é obrigatório.'
            }));
            isValid = false;
        } else if (!user.name.trim().includes(' ')) {
            setErrors(prevState => ({
                ...prevState,
                nameError: 'O nome completo deve conter pelo menos um sobrenome.'
            }));
            isValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, nameError: '' }));
        }
    
        if (!user.email.trim()) {
            setErrors(prevState => ({
                ...prevState,
                emailError: 'O email é obrigatório.'
            }));
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            setErrors(prevState => ({
                ...prevState,
                emailError: 'O email deve ser válido.'
            }));
            isValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, emailError: '' }));
        }
    
        if (!user.password.trim()) {
            setErrors(prevState => ({
                ...prevState,
                passwordError: 'A senha é obrigatória.'
            }));
            isValid = false;
        } else if (user.password.length < 6) {
            setErrors(prevState => ({
                ...prevState,
                passwordError: 'A senha deve conter pelo menos 6 caracteres.'
            }));
            isValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, passwordError: '' }));
        }
    
        if (!user.confirmPassword.trim()) {
            setErrors(prevState => ({
                ...prevState,
                confirmPasswordError: 'Confirme sua senha.'
            }));
            isValid = false;
        } else if (user.password.trim() !== user.confirmPassword.trim()) {
            setErrors(prevState => ({
                ...prevState,
                confirmPasswordError: 'As senhas não coincidem.'
            }));
            isValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, confirmPasswordError: '' }));
        }
    
        if (!user.phone.trim()) {
            setErrors(prevState => ({
                ...prevState,
                phoneError: 'O telefone é obrigatório.'
            }));
            isValid = false;
        } else if (!validatePhone(user.phone.trim())) {
            setErrors(prevState => ({
                ...prevState,
                phoneError: 'O telefone deve ser válido e conter 10 ou 11 dígitos.'
            }));
            isValid = false;
        } else {
            setErrors(prevState => ({ ...prevState, phoneError: '' }));
        }
    
        return isValid;
    }
    

    function handleLogout() {
        auth()
          .signOut()
          .then(() => console.log('User signed out'));
    }

    function handleRegister() {
        setIsLoading(true);
        if (validateForm()) {
            auth()
                .createUserWithEmailAndPassword(user.email.trim(), user.password.trim())
                .then((userCredential) => {
                    const { uid } = userCredential.user;
                    userCredential.user.updateProfile({
                        displayName: user.name.trim()
                    }).then(() => {
                        handleLogout()
                        Toast.show("Conta cadastrada com sucesso!", { type: 'success' });
                        database
                            .collection('Register')
                            .doc(uid) 
                            .set({
                                creci: user.creci,
                                phone: user.phone,
                                realEstate: user.realEstate
                            })
                            .then(() => {
                                console.log('Usuário adicionado ao banco de dados.');
                            })
                            .catch(error => {
                                console.error('Erro ao adicionar usuário ao banco de dados:', error);
                            });
                    });
                })
                .catch((error) => {
                    console.error("Erro ao criar conta:", error);
                    Toast.show("Não foi possível cadastrar sua conta, verifique.", { type: 'danger' });
                })
                .finally(() => {
                    setIsLoading(false);
                    setUser({
                        ...user,
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        creci: '',
                        phone: '',
                        realEstate: ''
                    });
                });
        } else {
            setIsLoading(false);
        }
    }
    

    return (
        <DefaultContainer showButtonBack>
            <Container>
                <Content>
                    <Title>Cadastrar</Title>
                    <SubTitle>Comece a gerenciar os seus imóveis agora mesmo!</SubTitle>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Input
                            name="face"
                            placeholder="Nome completo"
                            value={user.name}
                            onChangeText={(text) => setUser({ ...user, name: text })}
                        />
                        {errors.nameError && <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>{errors.nameError}</Text>}
                        
                        <Input
                            name="email"
                            placeholder="E-mail"
                            value={user.email}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                        />
                        {errors.emailError && <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>{errors.emailError}</Text>}
                        
                        <Input
                            name="phone"
                            placeholder="Telefone"
                            value={user.phone}
                            onChangeText={(text) => setUser({ ...user, phone: text })}
                        />
                        {errors.phoneError && <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>{errors.phoneError}</Text>}
                        
                        <Input
                            name="badge"
                            placeholder="CRECI"
                            value={user.creci}
                            onChangeText={(text) => setUser({ ...user, creci: text })}
                        />
                        
                        <Input
                            name="badge"
                            placeholder="Imobiliária"
                            value={user.realEstate}
                            onChangeText={(text) => setUser({ ...user, realEstate: text })}
                        />
                        
                        <Input
                            name="lock"
                            placeholder="Senha"
                            value={user.password}
                            secureTextEntry
                            onChangeText={(text) => setUser({ ...user, password: text })}
                        />
                        {errors.passwordError && <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>{errors.passwordError}</Text>}
                        
                        <Input
                            name="lock"
                            placeholder="Confirma senha"
                            value={user.confirmPassword}
                            secureTextEntry
                            onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                        />
                        {errors.confirmPasswordError && <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>{errors.confirmPasswordError}</Text>}
                        
                        <Button title={isLoading ? <ActivityIndicator /> : "Cadastrar"} onPress={handleRegister} disabled={isLoading} />
                    </ScrollView>
                </Content>
            </Container>
        </DefaultContainer>
    );
}
