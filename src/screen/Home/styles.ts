import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    position: absolute;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
`;

export const SubTitle = styled.Text`
font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
color: ${({theme}) => theme.COLORS.GRAY_600};
text-align: center;
`;

export const Text = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    text-align: center;
`;


export const Content = styled.View`
    flex-direction: row;
    height: 60px;
    align-items: center;
`;


export const Divider = styled.View`
    width: 4px;
    height: 100%;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800};
    margin-right: 10px;
`;


export const ContainerInfo = styled.View`
    flex: 1;
    align-items: flex-start;
    padding-left: 10px;
    height: 100%;
    justify-content: center;
`;