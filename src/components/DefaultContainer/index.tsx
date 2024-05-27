import React from "react";
import { Button, Container, ContainerBackground, ContainerOpacity, Icon, Menu, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

type PropsDefaultContainer = {
    children: React.ReactNode;
    title?: string;
    showButtonGears?: boolean;
    showButtonBack?: boolean;
}

export function DefaultContainer({ children, title, showButtonGears, showButtonBack }: PropsDefaultContainer) {
    const Navigation  = useNavigation();

    function HandleGoBack(){
        Navigation.goBack()
    }

    return (
        <Container>
            <ContainerBackground />
            <ContainerOpacity>
                <Menu>
                    {showButtonBack &&
                        <Button onPress={HandleGoBack}>
                            <Icon name="arrow-left" />
                        </Button>
                    }
                    <Title>{title}</Title>
                    {showButtonGears &&
                        <Button>
                            <Icon name="gear" />
                        </Button>
                    }

                </Menu>
                {children}
            </ContainerOpacity>
        </Container>
    )
}