import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div<{width: number, height: number, backUrl: string}>`
    border: solid 0px ${colors[2]};
    transition: all 0.1s;
    box-sizing: border-box;
    position: relative;
    background-image: url(${(props) => props.backUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-width: ${(props) => props.width}px;
    max-width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    background-color: ${colors[4]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
    
`;

export const Role = styled.div<{width: number}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
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

export const UserName = styled.div<{width: number}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    
    h2 {
        margin-top: 10px;
        font-size: ${(props) => props.width / 10}px;
        background-color: ${colors[1]};
        border: solid 0.5px ${colors[2]};
        padding: ${(props) => props.width / 50}px ${(props) => props.width / 10}px;
        color: ${colors[2]};
        border-radius: 100vw;
        margin-bottom: 30px;
    }
`;

export const Votes = styled.div<{width: number}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    
    h2 {
        margin-top: 10px;
        font-size: ${(props) => props.width / 10}px;
        background-color: ${colors[1]};
        border: solid 0.5px ${colors[2]};
        padding: ${(props) => props.width / 50}px ${(props) => props.width / 20}px;
        color: ${colors[2]};
        border-radius: 100vw;
        margin-bottom: 30px;
    }
`;

export const Button = styled.button`
    width: 60%;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    font-size: 20px;
    padding: 10px;
    margin: 15px;
`;