import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(./images/start_back.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const RoomsBack = styled.div`
    width: 100%;
`;

export const RoomsListBack = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
    button {
        width: 300px;
        padding: 10px;
        font-size: 20px;
        background-color: ${colors[5]};
        border-radius: 5px;
        border: solid 0.5px ${colors[2]};
        color: ${colors[0]};
        margin-top: 10px;
        
    }
`;

export const UserNameStepBack = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;