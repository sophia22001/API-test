// id값을 props객체에서 받아와서 API를 요청한다.
import axios from "axios";
import useAsync from "../hooks/useAsync";

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

const Params = ({ id }) => {
  // 객체 구조 분해 할당: params를 받아서 params.id를 쓰는 것과 같다.
  const [state] = useAsync(() => getUser(id), [id]);
  // 이때 첫번째 인자로 화살표 함수를 쓰는 이유:
  // id가 변경될 때마다 최신 id 값을 이용해 비동기 요청이 다시 실행될 수 있도록 하기 위함이다.

  const { loading, data: user, error } = state;

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
};

export default Params;
