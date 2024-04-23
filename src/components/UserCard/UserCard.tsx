import React, { useContext, useEffect, useState } from "react";
import { serverURL } from "../../config";
import User from "../../modules/User";
import {
  Background,
  IsOnline,
  NotActive,
  Role,
  Timer,
  UserName,
  Votes,
} from "./styles";
import appContext from "../../contexts/AppContext";

const UserCard = (props: {
  user: User;
  width: number;
  height: number;
  style?: React.CSSProperties | undefined;
}) => {
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>();
  const [isSelected, setIsSelected] = useState(false);
  const gameState = useContext(appContext);
  const { avatar, name, role, isActive, id, votes, isOnline } = props.user;
  const isGod = gameState.me?.id === gameState.god?.id;
  const [timer, setTimer] = useState(props.user.timer);

  const setSelected = () => {
    if (!isSelected)
      gameState.dispatch(
        gameState.selectUser(id),
        `
                this.selectUser("${id}");
            `
      );
    else
      gameState.dispatch(
        gameState.unSelectUser(id),
        `
                this.unSelectUser("${id}");
            `
      );
    setIsSelected(!isSelected);
    setTimeOut(
      setTimeout(() => {
        setTimeOut(null);
      }, 500)
    );
    if (timeOut)
      gameState.dispatch(
        gameState.userSetIsActiveById(id, !isActive),
        `
                    if (this.currentRoom) {
                        this.currentRoom.users.forEach((user) => {
                            if (user.id === "${id}") {
                                user.isActive = ${!isActive};
                            }
                        })
                    }
                `
      );
  };

  const setTimerWidthTimeOut = () => {
    if (timer > 0)
      setTimeout(() => {
        props.user.timer--;
        setTimer(timer - 1);
      }, 1000);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (gameState.me)
        gameState.dispatch(
          gameState.setUserIsOnline(gameState.me.id, true),
          `this.setUserIsOnline("${gameState.me.id}", true)`
        );
    };
    const beforeunload = () => {
      if (gameState.me)
        gameState.dispatch(
          gameState.setUserIsOnline(gameState.me.id, false),
          `this.setUserIsOnline("${gameState.me.id}", false)`
        );
    };
    window.document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
    window.addEventListener("beforeinput", beforeunload);
    return () => {
      window.document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (props.user.timer > 0) {
      setTimer(props.user.timer);
      setTimerWidthTimeOut();
    }
  });

  return (
    <Background
      style={props.style}
      onClick={isGod ? setSelected : () => {}}
      width={props.width}
      height={props.height}
      isSelected={
        gameState.currentRoom
          ? gameState.currentRoom.usersSelected.some((u) => u.id === id)
          : false
      }
      backUrl={serverURL + avatar?.path}
    >
      <IsOnline width={props.width} isOnline={isOnline} />
      {role && isGod && (
        <Role width={props.width}>
          <h2>{role}</h2>
        </Role>
      )}
      {isGod && (
        <Votes width={props.width}>
          <h2>{votes.length}</h2>
        </Votes>
      )}
      <UserName width={props.width}>
        <h2>{name}</h2>
      </UserName>
      {!isActive && <NotActive width={props.width}>Fuera</NotActive>}
      {timer > 0 && <Timer width={props.width}>{timer}s</Timer>}
    </Background>
  );
};

export default UserCard;
