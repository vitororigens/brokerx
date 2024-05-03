import styled from "styled-components/native";
import AntDesign from '@expo/vector-icons/AntDesign';


export const Container = styled.View`
    width: 100%;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const Icon = styled(AntDesign).attrs(({theme}) => ({
    size: 26,
    color: theme.COLORS.WHITE,
}))``;

export const ContainerIcon = styled.View`
    width: 40px;
    height: 40px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    border-radius: 8px;
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
