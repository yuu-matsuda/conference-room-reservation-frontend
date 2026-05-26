import type React from "react";
import { useState } from "react";

interface TimeSelectProps {
  startHour?: number;
  endHour?: number;
  stepMinutes?: number;
  onChange?: (value: string) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  startHour = 9,
  endHour = 21,
  stepMinutes = 5,
  onChange,
}) => {
  const [selectedTime, setSelectedTime] = useState("");

  const generateTimes = () => {
    const times: string[] = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let min = 0; min < 60; min += stepMinutes) {
        const h = hour.toString().padStart(2, "0");
        const m = min.toString().padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTime(value);
    if (onChange) onChange(value);
  };

  return (
    <select value={selectedTime} onChange={handleChange}>
      <option value="">-- 時間を選択 --</option>
      {generateTimes().map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimeSelect;
