import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function ActivityCalendar({ history }) {
  const scoreMap = {};

  history.forEach((day) => {
    const key = day.record_date.split("T")[0];

    scoreMap[key] = day.total_score;
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

const tileContent = ({ date, view }) => {
  if (view !== "month") return null;

  const key = formatDate(date);

  const score = scoreMap[key];

  if (score == null) return null;

  let color = "";

  if (score >= 90) color = "green-dot";
  else if (score >= 60) color = "yellow-dot";
  else color = "red-dot";

  return (
    <div
      className={`score-dot ${color}`}
      title={`Score: ${score}/100`}
    ></div>
  );
};

  return (
    <div className="calendar-container">
<Calendar
  tileContent={tileContent}
/>    </div>
  );
}

export default ActivityCalendar;
