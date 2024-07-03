import { Button, Container, ContainerIcon, ContainerImage, ContainerItem, ContainerOptions, Icon, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

type ItemOptions = {
    title: string;
    onDelete: () => void;
    onEdit: () => void;
    onCopy: () => void;
    image?: string;
    showCopy?: boolean;
    showDelet?: boolean;
    showEdit?: boolean;
    showShare?: boolean;
};

export function Options({ onCopy, onDelete, onEdit, title, image, showCopy, showDelet, showEdit, showShare }: ItemOptions) {
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
                {showCopy && (
                    <Button onPress={onCopy}>
                        <Icon name="copy" />
                        <Title>Copiar</Title>
                    </Button>
                )}
                {showShare && (
                    <Button onPress={() => { /* Lógica de compartilhar */ }}>
                        <Icon name="share" />
                        <Title>Compartilhar</Title>
                    </Button>
                )}
                {showEdit && (
                    <Button onPress={onEdit}>
                        <Icon name="pencil" />
                        <Title>Editar</Title>
                    </Button>
                )}
                {showDelet && (
                    <Button onPress={onDelete}>
                        <Icon name="trash" />
                        <Title>Excluir</Title>
                    </Button>
                )}
            </ContainerOptions>
        </Container>
    );
}
