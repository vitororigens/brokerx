import { ButtonTypeProps, Container, Title } from "./styles";

type ButtonProps ={
    type?: ButtonTypeProps;
    title?: string;
}

export function Button({type ='PRIMARY', title}: ButtonProps){
    return(
        <Container type={type} >
            <Title type={type}>{title}</Title>
        </Container>
    )
}