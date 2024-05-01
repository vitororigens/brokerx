import { Container, Icon } from "./styles";
import { TextInputProps } from "react-native";

type InputProps = TextInputProps & {
    name: string;
    placeholder: string;
}

export function Input({name, placeholder}: InputProps){
    return(
        <Container placeholder={placeholder} >
            <Icon name={name}/>
        </Container>
    )
}