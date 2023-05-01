import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserStateContext, DispatchContext } from "../App";
import "./layout.css"
import "./home.css"
import "./font.css"
import { Button } from "react-bootstrap";

function Navigator({ scrollToMove }) {
  const navigate = useNavigate();

  return (
    
      <div className="menu-button">
        <Button value="career-section" onClick={scrollToMove}>홈</Button>
        <Button value="career-section" onClick={scrollToMove}>경력</Button>
        <Button value="education-section" onClick={scrollToMove}>학력</Button>
        <Button value="project-section" onClick={scrollToMove}>프로젝트</Button>
        <Button value="award-section" onClick={scrollToMove}>수상</Button>
        <Button value="certificate-section" onClick={scrollToMove}>자격증</Button>
        <Button value="skill-section" onClick={scrollToMove}>사용기술</Button>


        <Button onClick={() => navigate("/network")}>방명록</Button>
      </div>
    
  );
}

export default Navigator;
