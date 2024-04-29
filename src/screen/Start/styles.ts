import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background: ${({theme}) => theme.COLORS.WHITE};
`;

export const ContainerBackground = styled.View`
    height: 50%;
    width: 100%;
    background: ${({theme}) => theme.COLORS.RED_700};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

`;

export const ContainerOpacity = styled.View`
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 10; 
    width: 100%; 
    height: 100%;
    padding: 20px;
    align-items: center;
    justify-content: center;
 
`;
export const Content = styled.View`
    height: 400px;
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
    color: ${({theme}) => theme.COLORS.BLUE_800};
    text-align: center;
    padding-bottom: 40px;
`;
