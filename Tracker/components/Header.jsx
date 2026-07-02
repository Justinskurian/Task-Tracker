import "./Header.css";

function Header({ date, score, totalPoints = 100 }) {
  const percentage = (score / totalPoints) * 100;

  const getColor = () => {
    if (score >= 90) return "#22c55e";
    if (score >= 60) return "#eab308";
    return "#ef4444";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <header className="header">
      <h1>Daily Tracker</h1>

      <p className="date">{formatDate(date)}</p>

      <h2 className="score" style={{ color: getColor() }}>
        {score} / {totalPoints}
      </h2>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </header>
  );
}

export default Header;