import { Avatar, Card, Image } from "antd";
import React, { FC, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const Message: FC<{ message: any }> = (props) => {
  const { message } = props;
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        flexDirection:
          currentUser?.uid === message.sender ? "row-reverse" : "row",
      }}
    >
      <Card
        style={{
          flex: 0.5,
        }}
        className={
          currentUser?.uid === message.sender ? "glass owner" : "glass"
        }
        cover={
          message.image ? (
            <Image width={300} src={message.image} />
          ) : (
            <div style={{ height: "10px" }}></div>
          )
        }
      >
        {/* Message container with sender name and text, avatar */}
        <Card.Meta
          className={currentUser?.uid === message.sender ? "owner" : ""}
          style={{
            alignItems: "center",
          }}
          title={currentUser?.uid === message.sender ? "Me" : data?.user.name}
          description={message.text}
          avatar={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/*<Avatar*/}
              {/*  size={45}*/}
              {/*  src={*/}
              {/*    currentUser?.uid !== message.sender*/}
              {/*      ? data?.user.avatar*/}
              {/*      : currentUser?.photoURL*/}
              {/*  }*/}
              {/*/>*/}
              {/*<span style={{ fontSize: "12px", color: "gray" }}>12:00 PM</span>*/}
            </div>
          }
        />
      </Card>
    </div>
  );
};
