import React, { useState } from "react";
import SkillCard from "./SkillCard";
import SkillEditForm from "./SkillEditForm";


function Skill({ skill, setSkills, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);



  return (
    <>
      {isEditing ? (
        <SkillEditForm
          currentSkill={skill}
          setSkills={setSkills}
          setIsEditing={setIsEditing}
        />
      ) : (
        <SkillCard
          skill={skill}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setSkills = {setSkills}
        />
      )}
    </>
  );
}

export default Skill;
