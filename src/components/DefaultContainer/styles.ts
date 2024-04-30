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