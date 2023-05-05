import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import "./font.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  // 기본 페이지로 돌아가기
  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Nav activeKey={location.pathname} style={{ height: 100 }}>
      <Nav.Item className="me-auto">
        <button 
          onClick={() => navigate("/")}
          className="orange-button"
        >
          MINI PORTFOLIOPAGE
        </button>
      </Nav.Item>

      <Nav.Item>
        <button
          onClick={() => navigate("/")}

          className="orange-button"
        >
          나의 페이지
        </button>
      </Nav.Item>

      {isLogin && (
        <>
          <Nav.Item>
            <button
              onClick={logout}
              className="orange-button"
            >
              로그아웃
            </button>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Header;
