import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserStateContext, DispatchContext } from "../App";
import "./layout.css"
import "./home.css"
import "./font.css"
import { Button } from "react-bootstrap";

function Navigator({ scrollToMove, portfolioOwner }) {
  const navigate = useNavigate();

  return (
    
      <div className="menu-button">
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="career-section" onClick={scrollToMove}>홈</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="career-section" onClick={scrollToMove}>경력</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="education-section" onClick={scrollToMove}>학력</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="project-section" onClick={scrollToMove}>프로젝트</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="award-section" onClick={scrollToMove}>수상</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="certificate-section" onClick={scrollToMove}>자격증</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} value="skill-section" onClick={scrollToMove}>사용기술</Button>
          <Button style = {{backgroundColor: portfolioOwner.menuColor }} onClick={() => navigate("/GuestBooks")}>방명록</Button>
      </div>
    
  );
}

export default Navigator;
