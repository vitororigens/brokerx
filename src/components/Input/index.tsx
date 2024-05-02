import { Container, Icon, InputContainer } from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
    name: string;
    placeholder: string;
}

export function Input({ name, placeholder }: InputProps) {
    return (
        <Container >
            <Icon name={name} />
            <InputContainer placeholder={placeholder} />
        </Container>
    )
}