import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, Content, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import auth from "@react-native-firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Formato inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function SingIn() {
    const navigation = useNavigation();

    // Hooks
    const { control, handleSubmit, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Functions
    function handleForgetPassword() {
        navigation.navigate("forgetpassword");
    }
    function handleSingIn({ email, password }: FormSchemaType) {
        auth()
            .signInWithEmailAndPassword(email.trim(), password.trim())
            .then(() => {
                Toast.show("Login realizado com sucesso!", { type: "success" });
                reset();
                navigation.navigate("tabroutes");
            })
            .catch(() =>
                Toast.show("Verifique se seu e-mail ou senha estão corretos.", {
                    type: "danger",
                })
            );
    }
    const onInvalid = () => {
        Toast.show("Por favor, preencha todos os campos.", { type: "danger" });
    };

    return (
        <DefaultContainer showButtonBack>
            <Container>
                <Content>
                    <Title>Entrar</Title>
                    <SubTitle>Continue gerenciando os seus imóveis.</SubTitle>
                    <ScrollView>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    name="envelope"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    showIcon
                                    placeholder="Email"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    name="lock"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    showIcon
                                    placeholder="Senha"
                                    passwordType
                                />
                            )}
                        />
                        <Button
                            title={"Entrar"}
                            onPress={handleSubmit(handleSingIn, onInvalid)}
                        />
                        <ButtonPassword onPress={handleForgetPassword}>
                            <SubTitle>Esqueceu a senha?</SubTitle>
                        </ButtonPassword>
                    </ScrollView>
                </Content>
            </Container>
        </DefaultContainer>
    )
}