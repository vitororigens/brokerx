import React from "react";
import { Alert, ScrollView, Switch, View, Text, ActivityIndicator } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Input, Title, Button, TitleButton, InputNote, ButtonAdd, Icon } from "./styles";

import { useState } from "react";
import { database } from "../../services";
import { Toast } from "react-native-toast-notifications";
import { useUserAuth } from "../../hooks/useUserAuth";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


const formSchema = z.object({
    nameNotes: z.string().min(1, "Nome da Tarefa é obrigatória"),
    notes: z.string().min(1, "Descrição é obrigatória"),
    date: z.string().optional(),
    hours: z.string().optional(),
    participants: z.string().optional(),
    addSchedule: z.boolean().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function NewNotes() {
    const [isLoading, setIsLoading] = useState(false);
    const user = useUserAuth();
    const uid = user?.uid;

    // Hooks
    const { control, handleSubmit, reset, setValue, watch } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notes: "",
            nameNotes: "",
            date: "",
            hours: "",
            participants: "",
            addSchedule: false,
        },
    });

    const addSchedule = watch('addSchedule');

    const handleSaveForm = async (data: FormSchemaType) => {
        setIsLoading(true);

        database
            .collection('Notes')
            .doc()
            .set({
                ...data,
                uid
            })
            .then(() => {
                Toast.show('Nota adicionada!', { type: 'success' });
                reset();
            })
            .catch(error => {
                console.error('Erro ao criar nota: ', error);
                Toast.show('Erro ao criar nota!', { type: 'danger' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <DefaultContainer showButtonBack title="Adicionar Nota">
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Tipo de nota:</Title>
                    <Controller
                        control={control}
                        name="nameNotes"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Title>Nota:</Title>
                    <Controller
                        control={control}
                        name="notes"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputNote
                                multiline
                                numberOfLines={20}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                textAlignVertical="top"
                            />
                        )}
                    />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10
                    }}>
                        <Controller
                            control={control}
                            name="addSchedule"
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    trackColor={{ false: "#0F2851", true: "#0F2851" }}
                                    thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onChange}
                                    value={value}
                                    style={{
                                        width: 50,
                                        marginRight: 10
                                    }}
                                />
                            )}
                        />
                        <Title>Agendar</Title>
                    </View>

                    {addSchedule && (
                        <>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ width: '45%' }}>
                                    <Title>Data:</Title>
                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Title>Horário:</Title>
                                    <Controller
                                        control={control}
                                        name="hours"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </>
                    )}

                    <Title>Participantes:</Title>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ width: '80%' }}>
                            <Controller
                                control={control}
                                name="participants"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        <View style={{ width: '15%' }}>
                            <ButtonAdd>
                                <Icon name='plus' />
                            </ButtonAdd>
                        </View>
                    </View>

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button onPress={handleSubmit(handleSaveForm)}>
                            <TitleButton>
                                {isLoading ? <ActivityIndicator /> : 'Salvar'}
                            </TitleButton>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        </DefaultContainer>
    );
}
