//import { useEffect, useState, useReducer } from "react";
import React from "react";
import axios from "axios";
import useAsync from "../hooks/useAsync"; //커스텀 훅
import { useState } from "react";
import Params from "./Params";

// useAsync 에서는 Promise 결과를 바로 data에 담기 때문에
// 요청을 한 이후 response에서 data를 추출한 후 반환하는 함수를 따로 만든다.
async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

const User = () => {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, []);

  // reducer에서 쓴 변수들 할당해주기
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>불러오기</button>
      {userId && <Params id={userId} />}
    </>
  );
};

export default User;
