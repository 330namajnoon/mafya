import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div<{width: number, height: number, isSelected: boolean}>`
    border: solid ${(props) => props.isSelected ? "1px" : "0px"} ${colors[2]};
    transition: all 0.1s;
    box-sizing: border-box;
    position: relative;
    min-width: ${(props) => props.width}px;
    max-width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${colors[4]};
    display: grid;
    grid-template-rows: 1fr 1fr;
    margin-left: 5px;
    img {
        max-width: 100%;
        min-width: 100%;
    }
    
    h3 {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: ${(props) => props.width / 10}px;
        color: ${colors[2]};
    }
    `;

export const Role = styled.div<{width: number}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    
    h2 {
        margin-top: 10px;
        font-size: ${(props) => props.width / 10}px;
        background-color: transparent;
        border: solid 0.5px ${colors[2]};
        padding: 5px 10px;
        color: ${colors[2]};
        border-radius: 100vw;
    }
`;

export const NotActive = styled.div`
    width: 100%;
    background-color: ${colors[6]};
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors[2]};
    justify-content: center;
    font-size: 20px;
`;

export const Timer = styled.h3`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors[1]};
`