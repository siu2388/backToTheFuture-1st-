import React from "react";

function Footer() {
  return (
    <div className="footer" style={{ paddingTop: "30px", marginTop: "40px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginRight: "5px",
          }}
        >
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#b9b9b9", marginBottom: "5px" }}>FRONT</p>
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#8d8d8d", marginBottom: "5px" }}>
            이영현
          </p>
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#8d8d8d", marginBottom: "5px" }}>
            이지윤
          </p>
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#8d8d8d", marginBottom: "5px" }}>
            황희원
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "5px",
          }}
        >
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#b9b9b9", marginBottom: "5px" }}>BACK</p>
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#8d8d8d", marginBottom: "5px" }}>
            김시유
          </p>
          <p style={{ fontFamily: "NeoDunggeunmo", color: "#8d8d8d", marginBottom: "5px"}}>
            이채영
          </p>
          <p style= {{marginBottom: "5px"}}>　</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
