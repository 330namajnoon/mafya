import styled from "styled-components";
import { colors } from "../../config";

export const Background = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const CreateRoleBack = styled.div`
    width: 95%;
    padding: 10px;
    box-sizing: border-box;
    background-color: ${colors[5]};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`;

export const CreateRoleButton = styled.button`
    width: 100%;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    font-size: 20px;
    padding: 10px;
    margin-top: 10px;
`;

export const ShareRolesButton = styled.button`
    width: 95%;
    margin-top: 10px;
    background-color: ${colors[1]};
    border-radius: 5px;
    border: solid 0.5px ${colors[2]};
    color: ${colors[2]};
    font-size: 20px;
    padding: 10px;
    `;

export const Role = styled.h2`
    color: ${colors[2]};
    border: solid 0.5px ${colors[2]};
    border-radius: 100vw;
    padding: 10px 20px;
    background-color: ${colors[3]};
    font-size: 15px;
    margin: 5px;

`;