import { useEffect, useState } from "react";
import axios from "axios";
import usersData from "./usersData";

const User = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setUsers(null);
        setLoading(true);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
        // setUsers(usersData);
        // 이 폴더에 데이터 파일이 있으면 axios로 api를 호출하지 않아도 된다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
};

export default User;
