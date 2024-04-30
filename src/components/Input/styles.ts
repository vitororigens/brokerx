import { TextInput } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled(TextInput)`
    flex: 1;
    min-height: 60px;
    max-height: 60px;
    background: ${({theme}) => theme.COLORS.GRAY_300};
    border-radius: 8px;
    margin-bottom: 20px;
    padding-left: 20px;

`;

export const Icon = styled(MaterialIcons).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_400,
    size: 26
}))``;