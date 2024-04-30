import React from "react";
import { Container, ContainerBackground, ContainerOpacity } from "./styles";

type PropsDefaultContainer ={
    children: React.ReactNode
}

export function DefaultContainer({children}: PropsDefaultContainer) {
    return (
        <Container>
            <ContainerBackground />
            <ContainerOpacity>
                    {children}
            </ContainerOpacity>
        </Container>
    )
}