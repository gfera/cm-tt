import { useEffect, useState } from "react";
import { easeOutCubic } from "../utils/easing-functions";


interface CountUpArgs {
  value: number;
  duration?: number;
  fractionDigits?: number;
}
const CountUp = ({ value, duration = 500, fractionDigits = 4 }: CountUpArgs) => {
  const [count, setCount] = useState('0');
  useEffect(() => {
    const startTime = Date.now();
    setCount(count)
    const interval = setInterval(() => {
      let delta = (Date.now() - startTime) / duration;
      if (delta >= 1) {
        delta = 1;
        clearInterval(interval)
      }
      setCount((easeOutCubic(delta) * value).toFixed(fractionDigits));

    }, 33)
    return () => clearInterval(interval)
  }, [value])
  return (<span>{count}</span>)
}

export default CountUp;