import { Entypo } from "@expo/vector-icons";
import ContentLoader from "react-content-loader/native";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type ContainerProps = {
    loading?: boolean;
  };

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_300};
  border: ${({ theme, loading }) => loading ? 0 : `1px solid ${theme.COLORS.GRAY_400}`};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

export const ContainerSkeleton = styled(ContentLoader)`
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
  size: 22,
  color: theme.COLORS.BLUE_800,
}))`
  margin-left: 10px;
`;

export const ContainerIcon = styled.View`
  width: 150px;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ContainerImage = styled(Image)`
  width: 150px;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONTE_SIZE.MD}px;
  color: ${({ theme }) => theme.COLORS.BLUE_800};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONTE_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.BLUE_800};
`;

export const Divider = styled.View`
  width: 100%;
  height: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_800};
`;

export const ContainerText = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const DivaiderInformation = styled.View`
  height: 100%;
  width: 2px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_800};
  margin-left: 10px;
  margin-right: 10px;
`;

export const Button = styled(TouchableOpacity)``;

export const Items = styled.View`
  max-width: 150px;
  min-width: 65px;
  max-height: 30px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_800};
  border-radius: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 5px;
`;

export const ItemsText = styled.Text`
  font-size: ${({ theme }) => theme.FONTE_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-bottom: 5px;
`;

export const ContainerItems = styled.View`
  height: 100%;
  width: 100%;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
`;
