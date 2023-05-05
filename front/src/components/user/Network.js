import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);

  document.body.style.backgroundColor = "#d9d7da";

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <div>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {users.map((user) => (
            <Col className="mb-4">
              <UserCard key={user.id} user={user} isNetwork />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Network;
