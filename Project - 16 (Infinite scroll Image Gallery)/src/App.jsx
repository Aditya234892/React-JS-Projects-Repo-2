
import './App.css'
import Images from './Components/Images';

function App() {
  return (
    <div className='w-full h-[100vh] bg-blue-100 flex flex-col justify-center items-center pt-8 pb-4'>
      <div className='w-full p-4 overflow-auto flex flex-col gap-y-4 '>
        <Images/>
      </div>
    </div>
  )
}

export default App;
