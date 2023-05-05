import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Navigator from "./Navigator";
import "./layout.css";
import GuestBooks from "./guestbook/GuestBooks";

function GuestBookPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [users, setUsers] = useState();
  const [guestBookPageOwner, setGuestBookPageOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchGuestBookPageOwner = async (ownerId) => {
    const res = await Api.get("userId", ownerId);

    const ownerData = res.data;

    setGuestBookPageOwner(ownerData);

    setIsFetchCompleted(true);
  };

  useEffect(() => {}, [guestBookPageOwner]);

  useEffect(() => {
    document.body.style.backgroundColor = guestBookPageOwner?.bgColor;

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [guestBookPageOwner]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    Api.get("userlist").then((res) => setUsers(res.data));

    if (params.userId) {
      const ownerId = params.userId;
      fetchGuestBookPageOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchGuestBookPageOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Container
      className="bookcover"
      style={{ backgroundColor: guestBookPageOwner?.boxColor }}
    >
      <div className="bookdot">
        <div className="page">
          <div className="profile-container">
            <div className="header profile-title font-neo">
              TODAY<span className="color-red"> 28</span> | TOTAL 234918
            </div>

            <div className="box profile-box">
              <div className="profile-image">
                <User
                  portfolioOwnerId={guestBookPageOwner.id}
                  isEditable={guestBookPageOwner.id === userState.user?.id}
                />
              </div>

              <div className="profile-dropdown">
                <div className="dropdown-button">
                  <div className="dropdown-title">파도타기</div>
                  <div className="triangle-down"></div>
                </div>
                <div className="dropdown-content">
                  <a onClick={() => navigate("/network")}>네트워크</a>
                  {users?.map((user) => (
                    <p
                      key={user.id}
                      user={user}
                      onClick={() => navigate(`/userId/${user.id}`)}
                    >
                      {user.name} ({user.homeName})
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="content-container">
            <div className="header content-title">
              <Link
                to={`/userId/${guestBookPageOwner.id}`}
                className="content-title-name"
              >
                {guestBookPageOwner.homeName}
              </Link>
            </div>
            <div className="box content-box">
              <div className="miniroom">
                <div className="box-title">Miniroom</div>
                <div className="miniroom-gif-box">
                  <div id="guestBook-section">
                    <GuestBooks
                      guestBookPageOwnerId={guestBookPageOwner.id}
                      portfolioOwner={guestBookPageOwner}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-container">
            <Navigator
              portfolioOwner={guestBookPageOwner}
              backHome={() => {
                navigate(`/userId/${guestBookPageOwner.id}`);
              }}
              scrollToMove={(e) => {
                navigate(`/userId/${guestBookPageOwner.id}`);
                setTimeout(() => {
                  const section = document.getElementById(e.target.value);
                  section.scrollIntoView({ behavior: "smooth" });
                }, 200);
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default GuestBookPage;
