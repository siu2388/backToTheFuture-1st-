import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { UserStateContext, DispatchContext } from "../App";
import './font.css'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    
    <Nav activeKey={location.pathname} style={{height:150}}>
      

      <Nav.Item className="me-auto" >
      <button onClick={() => navigate("/")} style={{fontSize: "20px"}} className="orange-button">MINI PORTFOLIOPAGE</button>
      </Nav.Item>

      <Nav.Item > 
        <button onClick={() => navigate("/")} style={{fontSize: "20px"}} className="orange-button">나의 페이지</button>
      </Nav.Item>


      {isLogin && (
        <>

        <Nav.Item >
          <button onClick={logout} style={{fontSize: "20px"}} className="orange-button">로그아웃</button>
        </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Header;
