import "./HabitItem.css";

function HabitItem({ habit, toggleHabit }) {
  return (
    <div className={`habit-item ${habit.completed ? "completed" : ""}`}>
      <div className="habit-left">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => toggleHabit(habit.id)}
        />

        <span className="habit-name">
          {habit.name}
        </span>
      </div>

      <span className="habit-points">
        +{habit.points}
      </span>
    </div>
  );
}

export default HabitItem;