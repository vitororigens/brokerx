import React from "react";
import { Button, Container, ContainerBackground, ContainerOpacity, Icon, Menu, Title } from "./styles";

type PropsDefaultContainer ={
    children: React.ReactNode;
    title?: string;
}

export function DefaultContainer({children, title}: PropsDefaultContainer) {
    return (
        <Container>
            <ContainerBackground />
            <ContainerOpacity>
                <Menu>
                    <Title>{title}</Title>
                    <Button>
                        <Icon name="gear"/>
                    </Button>
                </Menu>
                    {children}
            </ContainerOpacity>
        </Container>
    )
}