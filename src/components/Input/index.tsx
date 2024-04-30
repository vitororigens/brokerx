import { Container, Icon } from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
    name: string;
}

export function Input({name}: InputProps){
    return(
        <Container>
            <Icon name={name}/>
        </Container>
    )
}