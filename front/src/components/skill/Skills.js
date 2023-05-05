import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import Skill from "./Skill";
import SkillAddForm from "./SkillAddForm";

function Skills({ portfolioOwnerId, isEditable }) {
  const [skills, setSkills] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
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
