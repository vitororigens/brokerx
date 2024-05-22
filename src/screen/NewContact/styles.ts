import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    position: relative;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`;

export const StyledImage = styled.View`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.BLUE_800} ;
    position: absolute;
    right: -30px;
    top: -40px;
    border-radius: 100px;
    z-index: 11;
`;