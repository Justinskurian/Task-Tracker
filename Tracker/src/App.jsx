import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import api from "./api";
import Header from "../components/Header";
import HabitList from "../components/HabitList";
import ActivityCalendar from "../components/Calendar";

function App() {
  const [record, setRecord] = useState({
    recordId: null,
    date: "",
    score: 0,
    habits: [],
  });

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const fetchToday = async () => {
    try {
      const [today, history] = await Promise.all([
        api.get("/records/today"),
        api.get("/records/history"),
      ]);

      setRecord(today.data);

      setHistory(history.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId) => {
    try {
      const { data } = await api.put(
        `/records/${record.recordId}/habits/${habitId}`,
      );

      setRecord(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchToday();
  }, []);

  return (
    <div className="app-container">
      <div className="left-panel">
        <Header date={record.date} score={record.score} />

        <HabitList habits={record.habits} toggleHabit={toggleHabit} />
      </div>

      <div className="right-panel">
        <ActivityCalendar history={history} />
      </div>
    </div>
  );
}

export default App;
