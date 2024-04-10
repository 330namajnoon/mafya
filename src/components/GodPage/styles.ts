import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div`
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    background-color: ${colors[0]};
    background-image: url(./images/start_back.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;    
`;

export const BackgroundTransparent = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors[1]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UserCards = styled.div`
    width: 95%;
    height: auto;
    display: flex;
    align-items: center;
    overflow-x: auto;
    box-sizing: border-box;

`;