import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Skill from "./Skill";
import SkillAddForm from "./SkillAddForm";

function Skills({ portfolioOwnerId, isEditable }) {
  //useState로 skills 상태를 생성함.
  const [skills, setSkills] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "skilllist/유저id"로 GET 요청하고, response의 data로 skills를 세팅함.
    Api.get("skilllist", portfolioOwnerId).then((res) => setSkills(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ display: "inline-block", marginRight: "10px" }}>
          보유기술
        </Card.Title>
        {isEditable && (
          <button
            className="btn-add"
            style={{ display: "inline-block" }}
            onClick={() => setIsAdding(true)}
          >
            +
          </button>
        )}

        {isAdding && (
          <SkillAddForm
            portfolioOwnerId={portfolioOwnerId}
            setSkills={setSkills}
            setIsAdding={setIsAdding}
          />
        )}
        {skills.map((skill) => (
          <Skill
            key={skill.id}
            skill={skill}
            setSkills={setSkills}
            isEditable={isEditable}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Skills;
