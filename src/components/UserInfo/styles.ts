import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    height: 60px;
    align-items: center;
    margin-bottom: 10px;
`;


export const Divider = styled.View`
    width: 5px;
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

export const Title = styled.Text`
font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
color: ${({theme}) => theme.COLORS.GRAY_600};
text-align: center;
`;

export const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    text-align: center;
`;
