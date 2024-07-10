import React, { useState, useEffect } from "react";
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
}).refine(values => values.password === values.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
}).superRefine((values, ctx) => {
  if (values.role === 'broker' && !values.creci) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "O CRECI é obrigatório para corretores.",
      path: ["creci"],
    });
  }
  if ((values.role === 'broker' || values.role === 'trainee') && !values.realEstate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "A Imobiliária é obrigatória para corretores e estagiários.",
      path: ["realEstate"],
    });
  }
});

type FormSchemaType = z.infer<typeof formSchema>;

export function SignUp() {
  const { COLORS } = useTheme();
  const [role, setRole] = useState<'broker' | 'trainee' | 'buyer'>('broker');
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<FormSchemaType>({
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

  useEffect(() => {
    clearErrors();
  }, [role]);

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
                  status={role === 'broker' ? 'checked' : 'unchecked'}
                  onPress={() => setRole('broker')}
                />
                <SubTitle>Corretor</SubTitle>
                <RadioButton
                  value="trainee"
                  status={role === 'trainee' ? 'checked' : 'unchecked'}
                  onPress={() => setRole('trainee')}
                />
                <SubTitle>Estagiário</SubTitle>
                <RadioButton
                  value="buyer"
                  status={role === 'buyer' ? 'checked' : 'unchecked'}
                  onPress={() => setRole('buyer')}
                />
                <SubTitle>Cliente</SubTitle>
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
                    name="voicemail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    showIcon
                    placeholder="E-mail*"
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
                    showIcon
                    placeholder="Telefone*"
                  />
                )}
              />
              {errors.phone && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.phone.message}
                </Text>
              )}
              {role === 'broker' && (
                <Controller
                  control={control}
                  name="creci"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      name="id-card"
                      value={value ?? ''} 
                      onChangeText={onChange}
                      onBlur={onBlur}
                      showIcon
                      placeholder="CRECI*"
                    />
                  )}
                />
              )}
              {errors.creci && role === 'broker' && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.creci.message}
                </Text>
              )}
              {(role === 'broker' || role === 'trainee') && (
                <Controller
                  control={control}
                  name="realEstate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      name="hotel"
                      value={value ?? ''} 
                      onChangeText={onChange}
                      onBlur={onBlur}
                      showIcon
                      placeholder="Imobiliária*"
                    />
                  )}
                />
              )}
              {errors.realEstate && (role === 'broker' || role === 'trainee') && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.realEstate.message}
                </Text>
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
                    showIcon
                    placeholder="Senha*"
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
                    showIcon
                    placeholder="Confirme sua senha*"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={{ color: COLORS.RED_700, marginBottom: 20, marginLeft: 10 }}>
                  {errors.confirmPassword.message}
                </Text>
              )}
              <Button
                onPress={handleSubmit(handleRegister)}
                disabled={isLoading}
                title="Cadastrar"
              />
              {isLoading && <ActivityIndicator color={COLORS.BLUE_800} size="large" />}
            </ScrollView>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    </DefaultContainer>
  );
}
