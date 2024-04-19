import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div<{width: number, height: number, isSelected: boolean, backUrl: string}>`
    border: solid ${(props) => props.isSelected ? "1px" : "0px"} ${colors[2]};
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
    justify-content: space-between;
    align-items: center;
    
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
        background-color: transparent;
        border: solid 0.5px ${colors[2]};
        padding: 5px 10px;
        color: ${colors[2]};
        border-radius: 100vw;
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
        background-color: transparent;
        border: solid 0.5px ${colors[2]};
        padding: 5px 10px;
        color: ${colors[2]};
        border-radius: 100vw;
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
    margin-bottom: 100px;
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