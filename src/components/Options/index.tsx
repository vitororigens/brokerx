import { Button, Container, ContainerIcon, ContainerImage, ContainerItem, ContainerOptions, Icon, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

type ItemOptions = {
    title: string;
    onDelete: () => void;
    onEdit: () => void;
    onCopy: () => void;
    image?: string;
};

export function Options({ onCopy, onDelete, onEdit, title, image }: ItemOptions) {
    return (
        <Container>
            <ContainerItem>
                {image ? (
                    <ContainerImage source={{ uri: image }} />
                ) : (
                    <ContainerIcon>
                        <MaterialIcons name="add-a-photo" size={22} color="white" />
                    </ContainerIcon>
                )}
                <Title>{title}</Title>
            </ContainerItem>
            <ContainerOptions>
                <Button onPress={onCopy}>
                    <Icon name="copy" />
                    <Title>Copiar</Title>
                </Button>
                <Button onPress={onEdit}>
                    <Icon name="pencil" />
                    <Title>Editar</Title>
                </Button>
                <Button onPress={onDelete}>
                    <Icon name="trash" />
                    <Title>Excluir</Title>
                </Button>
            </ContainerOptions>
        </Container>
    );
}
