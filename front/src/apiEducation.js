// 원래 api.js에는 axios를 이용하는 코드가 작성되어 있습니다.
// 하지만 이번 실습에서는 백엔드가 없어 axios를 못 씁니다.
// 따라서 코드를 실습용으로 임시 변경했습니다.

// Mock은 가짜라는 뜻을 가집니다. 임시로 가짜 사용자 데이터를 설정합니다.
const userMock1 = {
  schoolName: "엘리스",
  degree: "대학교",
  major: "컴퓨터공학과",
  status: "재학중",
  startDate: "20200301",
  endDate: "20250301",
}
const userMock2 = {
  schoolName: "영구",
  degree: "고등학교",
  major: "문과",
  status: "졸업",
  startDate: "20220303",
  endDate: "20250303",
}



async function get(endpoint, params = "") {
console.log(
  `%cGET 요청 ${"/" + endpoint + "/" + params}`,
  "color: #a25cd1;"
);

if (endpoint === "projectlist") {
  const data = [userMock1, userMock2]
  const response = {data}
  return response
}

const response = {data: userMock1}
return response
}

async function put(endpoint, data) {

console.log(
  `%cPUT 요청 ${"/" + endpoint + "/"}`,
  "color: green;"
);

// userMock 유저 정보를, 전달 받은 data 정보로 덮어씌움
userMock1.schoolName = data.schoolName
userMock1.degree = data.degree
userMock1.major = data.major
userMock1.status = data.status
userMock1.startDate = data.startDate
userMock1.endDate = data.endDate


const response = {data: userMock1}
return response
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.put 로 쓸 수 있음.
export { get, put };