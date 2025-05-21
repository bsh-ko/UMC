import { useEffect, useState, useRef } from "react";

function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecutedRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 값이 변경되었을 때만 처리
    if (JSON.stringify(value) !== JSON.stringify(throttledValue)) {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecutedRef.current;

      // 이전 타이머가 있다면 제거
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 딜레이 시간이 지났으면 즉시 업데이트
      if (timeSinceLastExecution >= delay) {
        setThrottledValue(value);
        lastExecutedRef.current = now;
      } else {
        // 아직 딜레이 시간이 지나지 않았으면 남은 시간 후에 업데이트하도록 타이머 설정
        timerRef.current = setTimeout(() => {
          setThrottledValue(value);
          lastExecutedRef.current = Date.now();
          timerRef.current = null;
        }, delay - timeSinceLastExecution);
      }
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay, throttledValue]);

  return throttledValue;
}

export default useThrottle;
