import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import Certificates from "./certificate/Certificates";
import Educations from "./education/Educations";
import Careers from "./career/Careers";
import Skills from "./skill/Skills";
import Navigator from "./Navigator";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [users, setUsers] = useState();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPortfolioOwner = async (ownerId) => {
    const res = await Api.get("userId", ownerId);
    const ownerData = res.data;

    setPortfolioOwner(ownerData);

    setIsFetchCompleted(true);
  };

  useEffect(() => {
    document.body.style.backgroundColor = portfolioOwner?.bgColor;

    return () => {
      document.body.style.backgroundColor = "#d9d7da";
    };
  }, [portfolioOwner]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data));

    if (params.userId) {
      const ownerId = params.userId;

      fetchPortfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPortfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Container
      className="bookcover"
      style={{ backgroundColor: portfolioOwner.boxColor }}
    >
      <div className="bookdot">
        <div className="page">
          <div className="profile-container">
            <div className="header profile-title font-neo">
              TODAY<span className="color-red"> 28</span> | TOTAL 234918
            </div>

            <div className="box profile-box" style={{ display: "flex" }}>
              <div className="profile-image">
                <User
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>

              <div className="profile-dropdown">
                <div className="dropdown-button">
                  <div className="dropdown-title">파도타기</div>
                  <div className="triangle-down"></div>
                  <div className="dropdown-content">
                    <p onClick={() => navigate("/network")}>네트워크</p>
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
          </div>

          <div className="content-container" id="content-container">
            <div className="header content-title">
              <Link
                to={`/userId/${portfolioOwner.id}`}
                className="content-title-name"
              >
                {portfolioOwner.homeName}
              </Link>
            </div>
            <div className="box content-box" id="content-box">
              <div className="miniroom">
                <div className="box-title">Miniroom</div>
                <div className="miniroom-gif-box">
                  <div id="career-section" className="component-card-body">
                    <Careers
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="education-section" className="component-card-body">
                    <Educations
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="project-section" className="component-card-body">
                    <Projects
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="award-section" className="component-card-body">
                    <Awards
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="certificate-section" className="component-card-body">
                    <Certificates
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="skill-section" className="component-card-body">
                    <Skills
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-container">
            <Navigator
              backHome={() => {
                navigate(`/userId/${portfolioOwner.id}`);
              }}
              scrollToMove={(e) => {
                const section = document.getElementById(e.target.value);
                section.scrollIntoView({ behavior: "smooth" });
              }}
              portfolioOwner={portfolioOwner}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Portfolio;
