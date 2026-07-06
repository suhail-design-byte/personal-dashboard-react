import './App.css';
import TaskList from './components/TaskList';
import NotesList from './components/NotesList';

function App() {
  return (
    <div className="dashboard">
      <header>
        <h1>My Dashboard</h1>
      </header>
      <main>
        <TaskList />
        <NotesList />
      </main>
    </div>
  );
}

export default App;