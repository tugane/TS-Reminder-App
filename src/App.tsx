import { useEffect, useState } from "react";
import "./App.css";
import NewReminder from "./components/NewReminder";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/Reminder";
import reminderService from "./services/reminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setLoading(true);
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
    setLoading(false);
  };

  const removeReminder = (id: number) => {
    setLoading(true);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    setLoading(false);
  };

  const addReminder = async (title: string) => {
    setLoading(true);
    const newReminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
    setLoading(false);
  };

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      {loading && <div className="spinner-border my-3" role="status"></div>}
      <ReminderList onRemoveReminder={removeReminder} items={reminders} />
    </div>
  );
}

export default App;
