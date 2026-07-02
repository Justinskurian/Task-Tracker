import HabitItem from "./HabitItem";
import "./HabitList.css";

function HabitList({ habits, toggleHabit }) {
  return (
    <section className="habit-list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          toggleHabit={toggleHabit}
        />
      ))}
    </section>
  );
}

export default HabitList;