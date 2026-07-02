import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function ActivityCalendar({ history = [] }) {
  const scoreMap = {};

  history.forEach((day) => {
    scoreMap[day.date] = day.score;
  });

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const dateString = date.toISOString().split("T")[0];

    const score = scoreMap[dateString];

    if (score === undefined) return "";

    if (score >= 90) return "green-day";

    if (score >= 60) return "yellow-day";

    return "red-day";
  };

  return (
    <div className="calendar-container">
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

export default ActivityCalendar;