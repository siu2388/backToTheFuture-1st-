const userMock1 = {
  id: "abcde-1",
  email: "ktkim@elicer.com",
  name: "튜터",
  description: "안녕하세요!",
}
const userMock2 = {
  id: "abcde-12",
  email: "ironman@avengers.com",
  name: "아이언맨",
  description: "I, am, Ironman",
}
const userMock3 = {
  id: "abcde-123",
  email: "captain_america@avengers.com",
  name: "캡틴아메리카",
  description: "I can do this all day",
}
const userMock4 = {
  id: "abcde-1234",
  email: "thor@avengers.com",
  name: "토르",
  description: "Strongest Avenger",
}
const userMock5 = {
  id: "abcde-12345",
  email: "natasha@avengers.com",
  name: "나타샤",
  description: "Strongest Agent",
}



async function get(endpoint, params = "") {
console.log(
  `%cGET 요청 ${"/" + endpoint + "/" + params}`,
  "color: #a25cd1;"
);

if (endpoint === "userlist") {
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
userMock1.email = data.email
userMock1.name = data.name
userMock1.description = data.description

const response = {data: userMock1}
return response
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.put 로 쓸 수 있음.
export { get, put };
