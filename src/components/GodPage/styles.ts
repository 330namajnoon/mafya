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
    overflow-y: auto;
`;

export const BackgroundTransparent = styled.div`
    width: 100%;
    min-height: 100%;
    background-color: ${colors[1]};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
    padding: 20px 0 20px 0px;
    
`;

export const UserCards = styled.div`
    width: 95%;
    height: auto;
    display: flex;
    align-items: center;
    overflow-x: auto;
    box-sizing: border-box;
    box-sizing: border-box;

`;

export const ButtonsBack = styled.div`
    margin-top: 15px;
    width: 95%;
    padding: 0px 10px 10px;
    box-sizing: border-box;
    background-color: ${colors[5]};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

export const Button = styled.button`
    width: 100%;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
`;

export const TimerBack = styled.div`
    margin-top: 15px;
    width: 95%;
    padding: 0px 10px 10px;
    box-sizing: border-box;
    background-color: ${colors[5]};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TimerCup = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
    position: relative;
    font-size: 20px;
`;

export const TimeChanger = styled.div`
    height: 100%;
    background-color: ${colors[1]};
    border-radius: 5px;
    position: absolute;
    left: 0px;
`;

export const StoriesBack = styled.div`
    margin-top: 15px;
    width: 95%;
    padding: 0px 10px 10px;
    box-sizing: border-box;
    background-color: ${colors[5]};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Story = styled.div`
    width: 100%;
    display: flex;
    margin: 10px;
    color: ${colors[2]};
    h4 {
        margin-left: 5px;
    }
`;

export const UserRegisterBack = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    box-sizing: border-box;
`;

export const TextInput = styled.input`
    width: 93%;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
`;