import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserStateContext, DispatchContext } from "../App";
import "./layout.css"
import "./home.css"
import "./font.css"
import { Button } from "react-bootstrap";

function Navigator() {
  const navigate = useNavigate();

  return (
    
      <div className="menu-button">
        <Button onClick={() => navigate("/")}>홈</Button>
        <Button>다이어리</Button>
        <Button>사진첩</Button>
        <Button onClick={() => navigate("/network")}>방명록</Button>
      </div>
    
  );
}

export default Navigator;
