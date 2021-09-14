import React, { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chat.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  TypingIndicator,
  Conversation,
  ConversationList,
  AttachmentButton,
} from "@chatscope/chat-ui-kit-react";
import * as session from "../../services/session";
import * as allUserInfo from "../../services/authServices";
import { socket } from "../../services/socket";
import axios from "axios";
import Modal from "../Modal/modal";
const emilyIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";

export default function ChatDesign() {
  const [userData, setUserData] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [typingUser, setUserTyping] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [typingStart, setTypingStart] = useState("");
  const [onlineUser, setOnlineUser] = useState("");
  const [readMessages, setReadMessages] = useState([]);
  const [getRead, setGetRead] = useState(false);
  const [modal, setModal] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [imageUpload, setImageUpload] = useState({});
  const [show, setShow] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [latestMessage, setLatestMessage] = useState([]);
  useEffect(() => {
    const userLogin = JSON.parse(session.getSessionData());
    allUserInfo.GetUserInfos(userLogin.id).then((resp) => {
      setUserData(resp.data.data);
    });
    let Userdata = {
      user: {
        user_id: userLogin.id,
        email: userLogin.email,
        name: userLogin.name,
      },
    };
    socket.emit("connected", Userdata);
    socket.emit("get_chats", Userdata);
    socket.on("set_chats", (data) => {
      setChatrooms(data.chats);
    });
  }, []);

  const getChats = () => {
    socket.emit("get_chats", {
      user: {
        user_id: userData.id.toString(),
        email: userData.email,
        name: userData.name,
      },
    });
    socket.on("set_chats", (data) => {
      setChatrooms(data.chats);
    });
  };
  useEffect(() => {
    const userLogin = JSON.parse(session.getSessionData());
    let data = {
      user_id: userLogin.id,
    };
    socket.emit("online_status", data);
    socket.on("online_status_show", (resp) => {
      setOnlineUser(resp);
    });
  }, []);

  useEffect(() => {
    const chats = chatrooms.map((element) => {
      onlineUser.map((elem) => {
        if (element.name === elem.email) {
          element.status = "available";
          return element;
        } else {
          element.status = "unavailable";
          return element;
        }
      });
      return element;
    });
    setChatrooms(chats);
  }, [onlineUser]);
  const onHide = () => {
    setModalImage(false);
  };
  useEffect(() => {
    socket.off("message_broadcast").on("message_broadcast", (message) => {
      setMessages((messages) => [...messages, message.message_body]);
      let readMessage = {
        room: roomId,
        user: {
          user_id: userData.id,
          email: userData.email,
          name: userData.name,
        },
      };
      socket.emit("read_status", readMessage);
      socket.on("read_status_show", (resp) => {
        setGetRead(true);
        setReadMessages(resp.data);
      });
    });
  }, [messages]);
  const getMessages = (id) => {
    setRoomId(id);
    let data = {
      room: id,
      user_id: userData.id,
    };
    socket.emit("get_messages", data);
    socket.on("set_messages", (res) => {
      setUsername(res.messages.data.room.name);
      setMessages(res.messages.data.messages);
      setModal(true);
    });
    let messageRead = {
      room: id,
      user: {
        user_id: userData.id.toString(),
        email: userData.email,
        name: userData.name,
      },
    };
    socket.emit("read_status", messageRead);
    socket.on("read_status_show", (resp) => {
      setReadMessages(resp.data);
    });
  };
  const onFocus = () => {
    let start = {
      room: roomId,
      user: {
        user_id: userData.id,
        email: userData.email,
        name: userData.name,
      },
    };
    socket.emit("typing_start", start);
    socket.on("show_start_typing", (resp) => {
      setTypingStart(true);
      setUserTyping(resp.user);
    });
  };

  const onBlur = () => {
    let end = {
      room: roomId,
      user: {
        user_id: userData.id,
        email: userData.email,
        name: userData.name,
      },
    };
    socket.emit("typing_end", end);
    socket.on("show_end_typing", (resp) => {
      setTypingStart(false);
      setUserTyping(resp.user.name);
    });
  };

  let sendMessage = () => {
    let messageData = {
      room: roomId,
      message_body: messageInput,
      type: "USER_TEXT_MESSAGE",
      user: {
        user_id: userData.id,
        email: userData.email,
        name: userData.name,
      },
    };
    socket.emit("new_message", messageData);
    socket.off("message_broadcast").on("message_broadcast", (message) => {
      setMessages((messages) => [...messages, message.message_body]);
      let Userdata = {
        user: {
          user_id: userData.id,
          email: userData.email,
          name: userData.name,
        },
      };
      socket.emit("connected", Userdata);
      socket.emit("get_chats", Userdata);
      socket.on("set_chats", (data) => {
        setChatrooms(data.chats);
      });
      if (message.client_id !== userData.id.toString()) {
        let readMessage = {
          room: roomId,
          user: {
            user_id: userData.id,
            email: userData.email,
            name: userData.name,
          },
        };
        socket.emit("read_status", readMessage);
        socket.on("read_status_show", (resp) => {
          setGetRead(true);
          setReadMessages(resp.data);
        });
      }
    });
    setMessageInput("");
  };
  const onChangeImage = (e) => {
    setModalImage(true);
    const reader = new FileReader();
    let im = e.target.files[0];
    var formdata = new FormData();
    formdata.append("file", im, im.name);
    setImageUpload(formdata);
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    let token = localStorage.getItem("userDetails");
    axios
      .post(`http://18.162.60.16/api/v1/upload-multiple/`, imageUpload, {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      })
      .then((res) => {
        setModalImage(false);
        let new_message = {
          room: roomId,
          message_body: res.data.data[0],
          type: "USER_IMAGE_MESSAGE",
          user: {
            user_id: userData.id.toString(),
            email: userData.email,
            name: userData.name,
          },
        };
        socket.emit("new_message", new_message);

        setLatestMessage({ messageData: "" });

        socket.off("message_broadcast").on("message_broadcast", (resp) => {
          setLatestMessage(resp.message_body);
          setMessages((chatHistory) => [...chatHistory, resp.message_body]);
          getChats();
          if (resp.client_id !== userData.id.toString()) {
            let messageRead = {
              room: roomId,
              user: {
                user_id: userData.id.toString(),
                email: userData.email,
                name: userData.name,
              },
            };

            socket.emit("read_status", messageRead);
            socket.on("read_status_show", (resp) => {
              setReadMessages(resp.data);
              setShow(true);
            });
          }
        });
      })
      .catch((err) => console.log(err.response, "i am errr"));
  };

  return (
    <>
      {chatrooms.length > 0 ? (
        <>
          <div className="row chat-class">
            <div
              className="col-4"
              style={{ paddingRight: "inherit", borderRight: "1px solid" }}
            >
              <ConversationList className="list-data">
                {chatrooms.map((chatroom) => (
                  <Conversation
                    name={chatroom.name}
                    onClick={() => {
                      getMessages(chatroom.id);
                    }}
                    unreadCnt={
                      chatroom.id !== userData.id
                        ? chatroom.unread_messages_count
                        : null
                    }
                  >
                    <Avatar src={emilyIco} status={chatroom.status} />
                  </Conversation>
                ))}
              </ConversationList>
            </div>

            {modal === true ? (
              <div className="col-8" style={{ paddingLeft: "inherit" }}>
                <ChatContainer className="list-data">
                  <ConversationHeader>
                    <Avatar src={emilyIco} name="Emily"></Avatar>
                    <ConversationHeader.Content userName={username} />
                  </ConversationHeader>
                  <MessageList
                    typingIndicator={
                      userData.id !== typingUser.user_id && typingStart ? (
                        <TypingIndicator
                          content={`${typingUser.name} is typing`}
                        />
                      ) : null
                    }
                  >
                    {messages.map((message) => (
                      <>
                        {message.type === "USER_TEXT_MESSAGE" && (
                          <>
                            {message.sender.user_id != userData.id ? (
                              <>
                                <Message
                                  model={{
                                    message: message.message_body,
                                    sentTime: "15 mins ago",
                                    direction: "incoming",
                                    position: "single",
                                  }}
                                />
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck-ack"
                                        x="2063"
                                        y="2076"
                                        className="float-right"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#4fc3f7"
                                        />
                                      </svg>;
                                    } else {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck"
                                        x="2047"
                                        y="2061"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#92a58c"
                                        />
                                      </svg>;
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                        {message.type === "USER_TEXT_MESSAGE" && (
                          <>
                            {message.sender.user_id == userData.id ? (
                              <>
                                <Message
                                  model={{
                                    message: message.message_body,
                                    sentTime: "15 mins ago",
                                    direction: "outgoing",
                                    position: "single",
                                  }}
                                />
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      return (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="15"
                                          id="msg-dblcheck-ack"
                                          x="2063"
                                          y="2076"
                                          className="float-right"
                                        >
                                          <path
                                            d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                            fill="#4fc3f7"
                                          />
                                        </svg>
                                      );
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                        {message.type === "USER_IMAGE_MESSAGE" && (
                          <>
                            {message.sender.user_id != userData.id ? (
                              <>
                                <Message
                                  model={{
                                    direction: "incoming",
                                  }}
                                >
                                  <Message.ImageContent
                                    src={`${message.message_body}`}
                                    width={150}
                                    height={150}
                                  ></Message.ImageContent>
                                </Message>
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck-ack"
                                        x="2063"
                                        y="2076"
                                        className="float-right"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#4fc3f7"
                                        />
                                      </svg>;
                                    } else {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck"
                                        x="2047"
                                        y="2061"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#92a58c"
                                        />
                                      </svg>;
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                        {message.type === "USER_IMAGE_MESSAGE" && (
                          <>
                            {message.sender.user_id == userData.id ? (
                              <>
                                <Message
                                  model={{
                                    direction: "outgoing",
                                  }}
                                >
                                  <Message.ImageContent
                                    src={`${message.message_body}`}
                                    width={150}
                                    height={150}
                                  ></Message.ImageContent>
                                </Message>
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      return (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="15"
                                          id="msg-dblcheck-ack"
                                          x="2063"
                                          y="2076"
                                          className="float-right"
                                        >
                                          <path
                                            d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                            fill="#4fc3f7"
                                          />
                                        </svg>
                                      );
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                        {message.type === "USER_FILE_MESSAGE" && (
                          <>
                            {message.sender.user_id != userData.id ? (
                              <>
                                <Message
                                  model={{
                                    direction: "incoming",
                                  }}
                                >
                                  <iframe
                                    src={`${message.message_body}`}
                                    style={{ width: "150px", height: "150px" }}
                                  ></iframe>
                                </Message>
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck-ack"
                                        x="2063"
                                        y="2076"
                                        className="float-right"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#4fc3f7"
                                        />
                                      </svg>;
                                    } else {
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="15"
                                        id="msg-dblcheck"
                                        x="2047"
                                        y="2061"
                                      >
                                        <path
                                          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                          fill="#92a58c"
                                        />
                                      </svg>;
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                        {message.type === "USER_FILE_MESSAGE" && (
                          <>
                            {message.sender.user_id == userData.id ? (
                              <>
                                <Message
                                  model={{
                                    direction: "outgoing",
                                  }}
                                >
                                  <iframe
                                    src={`${message.message_body}`}
                                    style={{ width: "150px", height: "150px" }}
                                  ></iframe>
                                </Message>
                                {readMessages.length > 0 &&
                                  readMessages.map((read) => {
                                    if (read === message.id) {
                                      return (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="15"
                                          id="msg-dblcheck-ack"
                                          x="2063"
                                          y="2076"
                                          className="float-right"
                                        >
                                          <path
                                            d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                            fill="#4fc3f7"
                                          />
                                        </svg>
                                      );
                                    }
                                  })}
                              </>
                            ) : null}
                          </>
                        )}
                      </>
                    ))}
                  </MessageList>
                  <MessageInput
                    onSend={() => sendMessage()}
                    onChange={setMessageInput}
                    value={messageInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    attachButton={false}
                    placeholder="Type message here"
                  />
                </ChatContainer>

                <form className="image-chat">
                  <input
                    id="file"
                    type="file"
                    onChange={onChangeImage}
                    accept=".jpg,.jpeg,.png,.txt,.pdf,.tiff,.rtf,.xlxs"
                    className="d-none"
                  />
                  <label htmlFor="file">
                    <span tabIndex="0" role="button" aria-controls="filename">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="paperclip"
                        className="svg-inline--fa fa-paperclip fa-w-14 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <br />
                </form>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        "No Chat"
      )}
      <Modal
        displayModal={modalImage}
        closeModal={onHide}
        modalBody={
          <>
            <div className="modal-body">
              <div className="modalcontent">
                <div>
                  {imgData !== null &&
                    imgData.length !== 0 &&
                    imgData.length > 0}
                  {
                    <img
                      id="blah"
                      src={imgData}
                      alt="your image"
                      className="w-100"
                    />
                  }
                </div>
                <div className="modal-button">
                  <button
                    type="submit"
                    className="btn btn-light"
                    onClick={onHide}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
