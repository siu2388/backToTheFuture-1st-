import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

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
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/userId/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("userId", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/userId/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
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

            <div className="box profile-box">
              <div className="profile-image">
                <User
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>
              <div className="profile-text font-kyobohand">
                ㄴr는.. 오늘도.. 눈물을.. 흘린ㄷr..★
              </div>
              <div className="profile-username font-kyobohand">
                <span style={{ color: "#0f1b5c" }}>수지니</span> (♪♬)
              </div>
              <div className="profile-dropdown">
                <div className="dropdown-button">
                  <div className="dropdown-title">파도타기</div>
                  <div className="triangle-down"></div>
                </div>
                <div className="dropdown-content">
                  <a onClick={() => navigate("/network")}>네트워크</a>
                </div>
              </div>
            </div>
          </div>

          <div className="content-container">
            <div className="header content-title">
              <div className="content-title-name">
                의 추억 상ㅈr... (*ˊᵕˋo💐o
              </div>
            </div>
            <div className="box content-box">
              <div className="miniroom">
                <div className="box-title">Miniroom</div>
                <div className="miniroom-gif-box">
                  <div id="career-section">
                    <Careers
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="education-section">
                    <Educations
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="project-section">
                    <Projects
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="award-section">
                    <Awards
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="certificate-section">
                    <Certificates
                      portfolioOwnerId={portfolioOwner.id}
                      isEditable={portfolioOwner.id === userState.user?.id}
                    />
                  </div>

                  <div id="skill-section">
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
              scrollToMove={(e) => {
                const section = document.getElementById(e.target.value);
                section.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Portfolio;
