

import { Container, ContainerInfo, Divider, SubTitle, Title } from "./styles";
import { Entypo } from '@expo/vector-icons';
import { useTheme } from "styled-components/native";

type UserProps = {
    title: string;
    subTitle: string;
    name: string;
} 
export function UserInfo({ subTitle, title, name }: UserProps) {
    const { COLORS } = useTheme()
    return (

        <Container>
            <Divider />
            <Entypo size={22} color={COLORS.BLUE_800} name={name} />
            <ContainerInfo>
                <Title>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
            </ContainerInfo>
        </Container>
    );
}

