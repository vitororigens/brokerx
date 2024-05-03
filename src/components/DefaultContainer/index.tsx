import React from "react";
import { Button, Container, ContainerBackground, ContainerOpacity, Icon, Menu, Title } from "./styles";

type PropsDefaultContainer ={
    children: React.ReactNode
}

export function DefaultContainer({children}: PropsDefaultContainer) {
    return (
        <Container>
            <ContainerBackground />
            <ContainerOpacity>
                <Menu>
                    <Title>Tela inicial</Title>
                    <Button>
                        <Icon name="gear"/>
                    </Button>
                </Menu>
                    {children}
            </ContainerOpacity>
        </Container>
    )
}