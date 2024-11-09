// 커스텀 훅
// -> 데이터를 요청할 때마다 reducer을 작성하는 것이 번거롭기 때문에
//    반복적인 코드를 작성하지 말고
//    간단히 가져와서 사용할 수 있도록 한다.
import { useEffect, useReducer } from "react";

//reducer함수는 밖에 선언
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

// useAsync(callback, deps=[])
// -> 첫번째 파라미터: API 요청을 시작하는 함수
// -> 두번째 파라미터: 해당 함수 안에서 사용하는 useEffect의 deps

const useAsync = (callback, deps = []) => {
  // useReducer 의 장점
  //  -> useState를 사용하지 않아도 된다.
  //  -> 다른 곳에서도 쉽게 재사용할 수 있다.
  //  -> setState() 대신에 dispatch() 로 사용한다.
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
  // 요청 관련 상태와 fetchData 함수
};

export default useAsync;
