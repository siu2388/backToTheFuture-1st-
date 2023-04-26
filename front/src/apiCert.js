// 원래 api.js에는 axios를 이용하는 코드가 작성되어 있습니다.
// 하지만 이번 실습에서는 백엔드가 없어 axios를 못 씁니다.
// 따라서 코드를 실습용으로 임시 변경했습니다.

// Mock은 가짜라는 뜻을 가집니다. 임시로 가짜 사용자 데이터를 설정합니다.
const userMock1 = {
  title: "컴활",
  authority: "대한상공회의소",
  registerNum: "1234",
  grade: "1급",
}
const userMock2 = {
  title: "한능검",
  authority: "기관1",
  registerNum: "5678",
  grade: "1급",
}
const userMock3 = {
  title: "토익",
  authority: "기관2",
  registerNum: "3746",
  grade: "990",
}
const userMock4 = {
  title: "한능시",
  authority: "기관3",
  registerNum: "0909",
  grade: "1급",
}
const userMock5 = {
  title: "토플",
  authority: "기관4",
  registerNum: "6789",
  grade: "110",
}



async function get(endpoint, params = "") {
console.log(
  `%cGET 요청 ${"/" + endpoint + "/" + params}`,
  "color: #a25cd1;"
);

if (endpoint === "certificatelist") {
  const data = [userMock1, userMock2, userMock3, userMock4, userMock5]
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
userMock1.title = data.title
userMock1.authority = data.authority
userMock1.registerNum = data.registerNum
userMock1.grade = data.grade

const response = {data: userMock1}
return response
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.put 로 쓸 수 있음.
export { get, put };
