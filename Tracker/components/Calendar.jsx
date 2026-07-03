import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function ActivityCalendar({ history = [] }) {
  const scoreMap = {};

  history.forEach((day) => {
    scoreMap[day.record_date] = day.total_score;
  });

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return "";

    const dateString = date.toISOString().split("T")[0];
    const score = scoreMap[dateString];

    if (score == null) return "";
    if (score >= 90) return "green-day";
    if (score >= 60) return "yellow-day";

    return "red-day";
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dateString = date.toISOString().split("T")[0];
    const score = scoreMap[dateString];

    if (score == null) return null;

    return <div className="score-label">{score}</div>;
  };

  return (
    <div className="calendar-container">
      <Calendar tileClassName={tileClassName} tileContent={tileContent} />{" "}
    </div>
  );
}

export default ActivityCalendar;
