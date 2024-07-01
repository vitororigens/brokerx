import React from "react";
import { Background, Button, Container, ContainerBackground, ContainerMenu, ContainerOpacity, Icon, Menu, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Popover } from "react-native-popper";
import { Settings } from "../Settings";

type PropsDefaultContainer = {
  children: React.ReactNode;
  title?: string;
  showButtonGears?: boolean;
  showButtonBack?: boolean;
  showButtonEdit?: boolean;
  onEdit?: () => void;
}

export function DefaultContainer({ children, title, showButtonGears, showButtonBack, showButtonEdit, onEdit }: PropsDefaultContainer) {
  const Navigation = useNavigation();

  function HandleGoBack() {
    Navigation.goBack()
  }

  return (
    <Container>
      <ContainerBackground >
        <Background />
      </ContainerBackground>
      <ContainerOpacity>
        <Menu>
          {showButtonBack &&
            <Button onPress={HandleGoBack}>
              <Icon name="arrow-left" />
            </Button>
          }
          <Title>{title}</Title>
          {showButtonGears &&
            <Popover
              trigger={
                <Button>
                  <Icon name="gear" />
                </Button>
              }
            >
              <Popover.Backdrop />
              <Popover.Content>
                <Settings />
              </Popover.Content>
            </Popover>
          }
          {showButtonEdit &&
            <Button onPress={onEdit}>
              <SubTitle>
                Editar
              </SubTitle>
            </Button>
          }


        </Menu>
        {children}
      </ContainerOpacity>
    </Container>
  )
}