import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { Container, Content, SubTitle, Title, Text, RadioGrup } from "./styles";
import { useTheme } from "styled-components/native";
import { Toast } from "react-native-toast-notifications";
import auth from "@react-native-firebase/auth";
import { database } from "../../services";
import { RadioButton } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string()
    .min(1, "O nome é obrigatório.")
    .refine(value => value.trim().split(" ").length >= 2, {
      message: "O nome completo deve conter pelo menos um sobrenome.",
    }),
  email: z.string()
    .min(1, "O email é obrigatório.")
    .email("Formato inválido"),
  password: z.string()
    .min(1, { message: "A senha é obrigatória." })
    .min(6, { message: "A senha deve conter pelo menos 6 caracteres." }),
  confirmPassword: z.string().min(1, "Confirme sua senha."),
  phone: z.string()
    .min(1, "O telefone é obrigatório.")
    .refine(value => /^[0-9]{10,11}$/.test(value), {
      message: "O telefone deve ser válido e conter 10 ou 11 dígitos."
    }),
  creci: z.string().optional(),
  realEstate: z.string().optional(),
  role: z.enum(['broker', 'trainee', 'buyer']),
}).refine(values => {
  if (values.role === 'broker') {
    return !!values.creci && !!values.realEstate;
  } else if (values.role === 'trainee') {
    return !!values.realEstate;
  } else {
    return true; // No additional requirements for 'buyer'
  }
}, {
  message: "Campos obrigatórios não preenchidos para este papel.",
  path: ["role"],
}).refine(values => values.password === values.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type FormSchemaType = z.infer<typeof formSchema>;

export function SignUp() {
  const { COLORS } = useTheme();
  const [checked, setChecked] = useState('broker');
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      creci: "",
      realEstate: "",
      role: "broker"
    }
  });

  function handleRegister(data: FormSchemaType) {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email.trim(), data.password.trim())
      .then((userCredential) => {
        const { uid } = userCredential.user;
        userCredential.user.updateProfile({
          displayName: data.name.trim()
        }).then(() => {
          Toast.show("Conta cadastrada com sucesso!", { type: 'success' });
          database.collection('Register').doc(uid).set({
            creci: data.creci,
            phone: data.phone,
            realEstate: data.realEstate,
            role: data.role
          }).then(() => {
            console.log('Usuário adicionado ao banco de dados.');
          }).catch(error => {
            console.error('Erro ao adicionar usuário ao banco de dados:', error);
          });
        });
      }).catch((error) => {
        console.error("Erro ao criar conta:", error);
        Toast.show("Não foi possível cadastrar sua conta, verifique.", { type: 'danger' });
      }).finally(() => {
        setIsLoading(false);
        reset();
      });
  }

  return (
    <DefaultContainer showButtonBack>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Title>Cadastrar</Title>
            <SubTitle>Comece a gerenciar os seus imóveis agora mesmo!</SubTitle>
            <ScrollView showsVerticalScrollIndicator={false}>
              <RadioGrup>
                <RadioButton
                  value="broker"
                  status={checked === 'broker' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('broker')}
                />
                <SubTitle>Corretor</SubTitle>
                <RadioButton
                  value="trainee"
                  status={checked === 'trainee' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('trainee')}
                />
                <SubTitle>Estagiário</SubTitle>
                <RadioButton
                  value="buyer"
                  status={checked === 'buyer' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('buyer')}
                />
                <SubTitle>Comprador</SubTitle>
              </RadioGrup>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    name="user"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    showIcon
                    placeholder="Nome*"
                  />
                )}
              />
              {errors.name && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.name.message}
                </Text>
              )}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    name="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="E-mail"
                  />
                )}
              />
              {errors.email && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.email.message}
                </Text>
              )}
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    name="phone"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Telefone"
                  />
                )}
              />
              {errors.phone && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.phone.message}
                </Text>
              )}
              {checked === 'broker' && (
                <>
                  <Controller
                    control={control}
                    name="creci"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        name="badge"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="CRECI"
                      />
                    )}
                  />
                  {errors.creci && (
                    <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                      {errors.creci.message}
                    </Text>
                  )}
                </>
              )}
              {(checked === 'broker' || checked === 'trainee') && (
                <>
                  <Controller
                    control={control}
                    name="realEstate"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        name="badge"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Imobiliária"
                      />
                    )}
                  />
                  {errors.realEstate && (
                    <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                      {errors.realEstate.message}
                    </Text>
                  )}
                </>
              )}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    name="lock"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="Senha"
                  />
                )}
              />
              {errors.password && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.password.message}
                </Text>
              )}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    name="lock"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="Confirma senha"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.confirmPassword.message}
                </Text>
              )}
              <Button title={isLoading ? <ActivityIndicator /> : "Cadastrar"} onPress={handleSubmit(handleRegister)} disabled={isLoading} />
            </ScrollView>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
}
