import { ButtonTypeProps, Container, Title } from "./styles";

type ButtonProps ={
    type?: ButtonTypeProps;
    title?: string;
    onPress?: () => void;
}

export function Button({type ='PRIMARY', title, onPress}: ButtonProps){
    return(
        <Container onPress={onPress} type={type} >
            <Title type={type}>{title}</Title>
        </Container>
    )
}