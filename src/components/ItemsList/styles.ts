import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.View`
    width: 100%;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const Icon = styled(FontAwesome5).attrs(({theme}) => ({
    size: 22,
    color: theme.COLORS.BLUE_800,
}))`
    margin-left: 10px;
`;

export const ContainerIcon = styled.View`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONTE_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONTE_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
`;

export const Divider = styled.View`
    width: 100%;
    height: 2px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
`;


export const ContainerText = styled.View`
    justify-content: space-between;
    flex-direction: row;
`;