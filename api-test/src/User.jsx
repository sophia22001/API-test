import { useEffect, useState, useReducer } from "react";
import axios from "axios";
//import usersData from "./usersData";

//reducer함수는 User 밖에 선언
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const User = () => {
  // useReducer 의 장점
  //  -> useState를 사용하지 않아도 된다.
  //  -> 다른 곳에서도 쉽게 재사용할 수 있다.
  //  -> setState() 대신에 dispatch() 로 사용한다.

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch({ type: "SUCCESS", data: res.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // reducer에서 쓴 변수들 할당해주기
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>불러오기</button>
    </>
  );
};

export default User;
