import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    align-items: center;
    justify-content: center;
`;


export const Content = styled.View`
    min-height: 300px;
    width: 100%;
    background: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 20px;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
`;

export const SubTitle = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    text-align: center;
    padding-bottom: 40px;
`;
