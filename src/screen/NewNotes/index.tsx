import React, { useEffect, useState } from "react";
import { ScrollView, Switch, View, Text, ActivityIndicator, Alert, PermissionsAndroid, Platform } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Input, Title, InputNote, ButtonAdd, Icon, Card } from "./styles";
import { database, message } from "../../services";
import { useUserAuth } from "../../hooks/useUserAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRoute } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { CustomModal } from "../../components/CustomModalNotes";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { Toast } from "react-native-toast-notifications";
import notifee, { AndroidImportance, TimestampTrigger, TriggerType, EventType, AuthorizationStatus } from "@notifee/react-native";
import messaging from '@react-native-firebase/messaging';

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
    const route = useRoute();
    const contacts = useFirestoreCollection('Contacts');
    const [isLoading, setIsLoading] = useState(false);
    const { selectedItemId } = route.params as { selectedItemId?: string };
    const user = useUserAuth();
    const uid = user?.uid;
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    

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

    useEffect(() => {
        async function requestPermissions() {
            const settings = await notifee.requestPermission();
    
            if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
                console.log('Permissão concedida');
            } else {
                console.log('Permissão não concedida');
            }
        }
    
        requestPermissions();
    }, []);

    useEffect(() => {
        if (selectedItemId) {
            database.collection("Notes").doc(selectedItemId).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data) {
                        setValue("notes", data.notes);
                        setValue("nameNotes", data.nameNotes);
                        setValue("date", data.date);
                        setValue("hours", data.hours);
                        setValue("participants", data.participants);
                        setValue("addSchedule", data.addSchedule);
                    }
                }
            });
        }
    }, [selectedItemId]);

    const handleSaveForm = async (data: FormSchemaType) => {
        setIsLoading(true);

        const docRef = selectedItemId
            ? database.collection('Notes').doc(selectedItemId)
            : database.collection('Notes').doc();

        docRef.set({
            ...data,
            uid,
        }).then(() => {
            Toast.show(selectedItemId ? 'Nota Atualizada!' : 'Nota adicionada!', { type: 'success' });
            reset();
            if (data.addSchedule && data.date && data.hours) {
                const [day, month, year] = data.date.split('/').map(Number);
                const [hour, minute] = data.hours.split(':').map(Number);
                const notificationDate = new Date(year, month - 1, day, hour, minute);
                
                scheduleNotification(notificationDate);
            }
        }).catch(error => {
            console.error('Erro ao criar/atualizar nota: ', error);
            Toast.show('Erro ao criar/atualizar nota!', { type: 'danger' });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const scheduleNotification = async (notificationDate: Date) => {
        try {
            const channelId = await notifee.createChannel({
                id: 'notificacao',
                name: 'Notificação da agenda',
                vibration: true,
                importance: AndroidImportance.HIGH,
            });
    
            // Verifica se a data é válida
            if (isNaN(notificationDate.getTime())) {
                throw new Error('Data inválida');
            }
    
            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: notificationDate.getTime(),
            };
    
            await notifee.createTriggerNotification(
                {
                    title: "Nota agendada!",
                    body: "Olá, você tem um compromisso na sua agenda para hoje!",
                    android: { channelId },
                },
                trigger
            );
        } catch (error) {
            console.error('Erro ao agendar notificação:', error);
        }
    };
    

    function handleContact() {
        setConfirmModalVisible(true);
    }

    useEffect(() => {
        const requestExactAlarmPermission = async () => {
            if (Platform.OS === 'android' && Platform.Version >= 31) {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.SCHEDULE_EXACT_ALARM
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        Alert.alert('Permission Denied', 'Exact alarm scheduling permission is required for this feature to work.');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };

        requestExactAlarmPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('Usuário descartou a notificação');
                    break;

                case EventType.ACTION_PRESS:
                    console.log('Usuário pressionou a notificação', detail.notification);
                    break;

                default:
                    break;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        return notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log("Usuário tocou na notificação", detail.notification);
            }
        });
    }, []);

    return (
        <DefaultContainer showButtonBack title="Adicionar Nota">
            <Container>
                <Card>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Title>Titulo:</Title>
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
                                <ButtonAdd onPress={handleContact}>
                                    <Icon name='plus' />
                                </ButtonAdd>
                            </View>
                        </View>

                        <Button title={isLoading ? <ActivityIndicator /> : "Salvar"} onPress={handleSubmit(handleSaveForm)} disabled={isLoading} />

                    </ScrollView>
                </Card>
            </Container>
            <CustomModal
                animationType="slide"
                transparent={true}
                onCancel={() => setConfirmModalVisible(false)}
                onClose={() => setConfirmModalVisible(false)}
                onConfirm={(selectedItems: string[]) => {
                    const selectedNames = contacts
                        .filter(contact => selectedItems.includes(contact.id))
                        .map(contact => contact.name)
                        .join(", ");
                    setValue("participants", selectedNames);
                    setConfirmModalVisible(false);
                }}
                title="Selecione um contato"
                visible={confirmModalVisible}
            />
        </DefaultContainer>
    );
}
