import { TouchableOpacityProps } from "react-native";
import { ButtonTypeProps, Container, Title } from "./styles";

type ButtonProps = TouchableOpacityProps & {
    title: string | JSX.Element;
    type?: ButtonTypeProps;
}


export function Button({type ='PRIMARY', title, onPress}: ButtonProps){
    return(
        <Container onPress={onPress} type={type} >
            <Title type={type}>{title}</Title>
        </Container>
    )
}