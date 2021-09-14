import React, { useEffect, useState } from "react";
import * as session from "../services/session";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import * as allUserInfo from "../services/authServices";
import { socket } from "../services/socket";
export default function AllUsers(props) {
  const [allUser, setAllUser] = useState("");
  const [userId, SetId] = useState("");
  const [userData, setUserData] = useState("");
  const userLogin = JSON.parse(session.getSessionData());
  useEffect(() => {
    allUserInfo.GetUserInfos(userLogin.id).then((resp) => {
      setUserData(resp.data.data);
    });
    getAllUserInfo();
  }, []);
  const getAllUserInfo = () => {
    allUserInfo.allUserInfos().then((resp) => {
      try {
       setAllUser(resp && resp.data && resp.data.data ? resp.data.data : "");
      } catch (error) {
        console.log(error, "error");
      }
    });
  };

  const viewUser = (id) => {
    SetId(id)
    allUserInfo.GetUserInfos(id).then((resp) => {
      let userRoom = {
        name: "test",
        participants: [
          {
            user_id: id,
            email: resp.data.data.email,
            name: resp.data.data.name,
          },
        ],
        user: {
          user_id: userData.id,
          email: userData.email,
          name: userData.name,
        },
        is_group: false,
      };
      socket.emit("new_room_create", userRoom);
      let data = {
        user: {
          user_id: userLogin.id,
          email: userLogin.email,
          name: userLogin.name,
        },
      };
      socket.emit("connected", data);
      socket.on("add_room", data => {
        console.log(data, "room data");
      });
      props.history.push("/admin/chat");
    });
  };


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">All Users</CardTitle>
              </CardHeader>
              <CardBody>
                {allUser && allUser.length > 0 ? (
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="text-center">Intro</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUser && allUser.length > 0
                        ? allUser.map((data, index) => (
                            <tr>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.phone}</td>
                              <td className="text-center">{data.intro}</td>
                              <td>
                                {" "}
                                <a
                                  onClick={() => {
                                    viewUser(data.id);
                                  }}
                                >
                                  {" "}
                                  <i className="tim-icons icon-chat-33"></i>
                                </a>
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </Table>
                ) : (
                  <h1 className="noData ">No User Available!</h1>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
