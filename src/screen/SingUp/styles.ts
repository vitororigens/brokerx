import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;
export const Content = styled.View`
    height: 450px;
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
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
    color: ${({theme}) => theme.COLORS.BLUE_800};
    text-align: center;
`;

export const Text = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.SM}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_400};
    text-align: center;
    margin-bottom: 40px;
`;

export const RadioGrup = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    height: 60px;
    align-items: center;

`;