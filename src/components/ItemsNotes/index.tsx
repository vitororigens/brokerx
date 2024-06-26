import { View } from "react-native";
import { Button, Container, ContainerIcon, ContainerText, Divaider, Divider, Icon, IconApp, SubTitle, Title } from "./styles";
import Share from 'react-native-share';

type ItemsScheduleProps = {
    title: string;
    date: string;
    hours: string;
    notes: string;
}

export function ItemsNotes({ date, hours, notes, title }: ItemsScheduleProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Informações da nota:\nTitulo: ${title}\nNota: ${notes}\nData: ${date}\nHora: ${hours}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    return (
        <Container>
            <ContainerIcon>
                <Icon name="infocirlce" />
            </ContainerIcon>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Title>{date}</Title>
                        <Divaider />
                        <Title>{hours}</Title>
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <SubTitle> {notes
                        ? notes.length > 10
                            ? notes.substring(0, 30) + "..."
                            : notes
                        : ""}</SubTitle>
                    <Button onPress={handleShare}>
                        <IconApp name='share' />
                    </Button>
                </ContainerText>
            </View>

        </Container>
    )
}