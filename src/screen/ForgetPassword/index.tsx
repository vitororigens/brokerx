import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, Content, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "@react-native-firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("Formato inválido").min(1, "E-mail é obrigatório"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function ForgetPassword() {
    // States
    const navigation = useNavigation();

    // Hooks
    const { control, handleSubmit, reset } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    // Functions
    function handleRegister() {
        navigation.navigate("singin");
    }

    function handleForgetPassword({ email }: FormSchemaType) {
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Toast.show("Um link foi enviado ao seu email", { type: "success" });
                reset()
                handleRegister();
            })
            .catch(() =>
                Toast.show("Verifique se seu e-mail está correto.", { type: "danger" })
            );
    }

    const onInvalid = () => {
        Alert.alert(
            "Atenção!",
            "Por favor, preencha o campo Email para que possa recuperar a senha"
        );
    };
    return (
        <DefaultContainer showButtonBack>
            <Container>
                <Content>
                    <Title>Recuperar Senha</Title>
                    <SubTitle>Esqueceu a senha? enviaremos um email de recuperação para seu email.</SubTitle>
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

                        <Button title={"Enviar"} onPress={handleSubmit(handleForgetPassword, onInvalid)} />
                    </ScrollView>
                </Content>
            </Container>
        </DefaultContainer>
    )
}