import { useEffect, useState } from "react";

const useDebounce = (value: string, time: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // 일정 시간 이후에 변경한다
      // 변경 사항이 생긴다면, 그로부터 time을 다시 센다
      return setDebouncedValue(value);
    }, time);
    // 기능 수행을 완료하면 구독을 해제한다
    return () => clearTimeout(timerId);
  }, [value, time]);

  // 변경된 값을 return
  return debouncedValue;
};

export default useDebounce;
