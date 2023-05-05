import React from "react";
import { useNavigate } from "react-router-dom";

import "./layout.css";
import "./home.css";
import "./font.css";
import { Button } from "react-bootstrap";

function getTextColorByBackgroundColor(hexColor) {
  const c = hexColor.substring(1)      
  const rgb = parseInt(c, 16)  
  const r = (rgb >> 16) & 0xff  
  const g = (rgb >>  8) & 0xff  
  const b = (rgb >>  0) & 0xff 
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b 
  // 색상 선택
  return luma < 127.5 ? "white" : "black" 
}

function Navigator({ backHome, scrollToMove, portfolioOwner }) {
  const navigate = useNavigate();

  return (
    <div className="menu-button">
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        onClick={backHome}
      >
        홈
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="career-section"
        onClick={scrollToMove}
      >
        경력
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="education-section"
        onClick={scrollToMove}
      >
        학력
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="project-section"
        onClick={scrollToMove}
      >
        프로젝트
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="award-section"
        onClick={scrollToMove}
      >
        수상
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="certificate-section"
        onClick={scrollToMove}
      >
        자격증
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        value="skill-section"
        onClick={scrollToMove}
      >
        보유기술
      </Button>
      <Button
        style={{ backgroundColor: portfolioOwner?.menuColor, color: getTextColorByBackgroundColor(portfolioOwner?.menuColor) }}
        onClick={() => navigate(`/userId/${portfolioOwner?.id}/guestBooks`)}
      >
        방명록
      </Button>
    </div>
  );
}

export default Navigator;
