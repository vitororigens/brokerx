import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Switch, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, StyledImage, Content, Input, Title, ImageContainer } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { database, storage } from "../../services";
import { useUserAuth } from "../../hooks/useUserAuth";
import { Toast } from "react-native-toast-notifications";
import { Button } from "../../components/Button";
import * as ImagePicker from 'expo-image-picker';

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useRoute } from "@react-navigation/native";

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    cpf: z.string().min(11, "numero de CPF Invalido").optional(),
    phone: z.string().min(10, "Telefone é obrigatório"),
    email: z.string().email("Email inválido").optional(),
    adress: z.string().optional(),
    observations: z.string().optional(),
    investor: z.boolean().optional(),
    resident: z.boolean().optional(),
    image: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;


export function NewContact() {
    const route = useRoute();
    const { selectedItemId } = route.params as { selectedItemId?: string };
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const userUid = useUserAuth();
    const uid = userUid?.uid;
  
    const { control, handleSubmit, setValue, watch, reset } = useForm<FormSchemaType>({
      defaultValues: {
        name: '',
        cpf: '',
        phone: '',
        email: '',
        adress: '',
        observations: '',
        investor: false,
        resident: false,
        image: undefined,
      },
    });
  
    const investor = watch('investor');
    const resident = watch('resident');
  
    useEffect(() => {
      if (selectedItemId) {
        database.collection("Contacts").doc(selectedItemId).get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              setValue("name", data.name);
              setValue("cpf", data.cpf);
              setValue("phone", data.phone);
              setValue("email", data.email);
              setValue("adress", data.adress);
              setValue("observations", data.observations);
              setValue("investor", data.investor);
              setValue("resident", data.resident);
              setImage(data.image);
            }
          }
        });
      }
    }, [selectedItemId]);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setValue('image', result.assets[0].uri);
      }
    };
  
    const uploadImage = async (uri: string) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = storage.ref(`contacts/${uid}/${new Date().getTime()}`);
      await imageRef.put(blob);
      return await imageRef.getDownloadURL();
    };
  
    const handleSaveForm = async (data: FormSchemaType) => {
      if (!data.name) {
        Alert.alert('Atenção!', 'Por favor, preencha todos os campos obrigatórios antes de salvar.');
        return;
      }
  
      setIsLoading(true);
  
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImage(image);
      }
  
      const docRef = selectedItemId
        ? database.collection('Contacts').doc(selectedItemId)
        : database.collection('Contacts').doc();
  
      docRef.set({
        ...data,
        uid,
        imageUrl,
      }).then(() => {
        Toast.show(selectedItemId ? 'Contato Atualizado!' : 'Contato adicionado!', { type: 'success' });
        reset();
        setImage(null);
      }).catch(error => {
        console.error('Erro ao criar/atualizar contato: ', error);
        Toast.show('Erro ao criar/atualizar contato!', { type: 'danger' });
      }).finally(() => {
        setIsLoading(false);
      });
    };

    return (
        <DefaultContainer showButtonBack title="Adicionar contato">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Container>
                    <Content>
                        {image ? (
                            <StyledImage source={{ uri: image }} />
                        ) : (
                            <ImageContainer onPress={pickImage}>
                                <MaterialIcons name="add-a-photo" size={36} color="white" />
                            </ImageContainer>
                        )}
                    </Content>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Title>Nome:</Title>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Title>CPF:</Title>
                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Title>Telefone:</Title>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Title>E-mail:</Title>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Title>Endereço:</Title>
                        <Controller
                            control={control}
                            name="adress"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                <Controller
                                    control={control}
                                    name="investor"
                                    render={({ field: { onChange, value } }) => (
                                        <Switch
                                            trackColor={{ false: "#0F2851", true: "#0F2851" }}
                                            thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={onChange}
                                            value={value}
                                            style={{ width: 50, marginRight: 10 }}
                                        />
                                    )}
                                />
                                <Title>Investidor</Title>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Controller
                                    control={control}
                                    name="resident"
                                    render={({ field: { onChange, value } }) => (
                                        <Switch
                                            trackColor={{ false: "#b91c1c", true: "#b91c1c" }}
                                            thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={onChange}
                                            value={value}
                                            style={{ width: 50, marginRight: 10 }}
                                        />
                                    )}
                                />
                                <Title>Morador</Title>
                            </View>
                        </View>
                        <Title>Observações:</Title>
                        <Controller
                            control={control}
                            name="observations"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 40, paddingRight: 40, paddingTop: 20 }}>
                            <Button title={isLoading ? <ActivityIndicator /> : "Salvar"} onPress={handleSubmit(handleSaveForm)} disabled={isLoading} />
                        </View>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        </DefaultContainer>
    );
}
