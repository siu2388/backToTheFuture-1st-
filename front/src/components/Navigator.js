import React from "react";
import { useNavigate } from "react-router-dom";

import "./layout.css";
import "./home.css";
import "./font.css";
import { Button } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll";


function getTextColorByBackgroundColor(hexColor) {
  const c = hexColor.substring(1)      // 색상 앞의 # 제거
  const rgb = parseInt(c, 16)   // rrggbb를 10진수로 변환
  const r = (rgb >> 16) & 0xff  // red 추출
  const g = (rgb >>  8) & 0xff  // green 추출
  const b = (rgb >>  0) & 0xff  // blue 추출
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  // 색상 선택
  return luma < 127.5 ? "white" : "black" // 글자색이
}

function Navigator({ backHome, scrollToMove, portfolioOwner }) {
  const navigate = useNavigate();

  const scrollUp = () => {
    scroll.scrollToTop({
      containerId: "content-box",
      duration: 500,
      smooth: "easeInOutQuint",
    });
  };

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
