import './App.css'
import TaskList from './Components/TaskList';

function App() {

  return (
    <div className='w-full h-[100vh] bg-teal-200 flex flex-col items-center p-8 gap-11'>
      <h1 className='text-5xl font-semibold text-teal-950'>TASK NEST 🪹</h1>
      <TaskList />
    </div>
  )
}

export default App
