import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserStateContext, DispatchContext } from "../App";
import "./layout.css"
import "./home.css"
import "./font.css"
import { Button } from "react-bootstrap";
import { animateScroll as scroll } from 'react-scroll';



function Navigator({ backHome, scrollToMove, portfolioOwner }) {
  const navigate = useNavigate();

  const scrollUp = () => {
    scroll.scrollToTop({
      containerId:"content-box",
      duration: 500, // 스크롤 이동에 걸리는 시간 (단위: ms)
      smooth: 'easeInOutQuint', // 스크롤 이동의 애니메이션 효과
    });
  };

  return (
    
      <div className="menu-button">
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} onClick={backHome}>홈</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} value="career-section" onClick={scrollToMove}>경력</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} value="education-section" onClick={scrollToMove}>학력</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} value="project-section" onClick={scrollToMove}>프로젝트</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} value="award-section" onClick={scrollToMove}>수상</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} value="certificate-section" onClick={scrollToMove}>자격증</Button>
          <Button style = {{backgroundColor: portfolioOwner?.mvenuColor }} value="skill-section" onClick={scrollToMove}>사용기술</Button>
          <Button style = {{backgroundColor: portfolioOwner?.menuColor }} onClick={() => navigate(`/userId/${portfolioOwner?.id}/guestBooks`)}>방명록</Button>
      </div>
    
  );
}

export default Navigator;
