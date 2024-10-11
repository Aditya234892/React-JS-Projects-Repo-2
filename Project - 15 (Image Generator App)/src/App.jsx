import { useState } from 'react'
import './App.css'
import useDebounce from './Components/useDebounce';
import Images from './Components/Images';

function App() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 1500);
  // console.log(debounceSearch);
  return (
    <div className='w-full h-[100vh] bg-blue-100 flex flex-col justify-center items-center pt-8 pb-4'>
      <div className='w-3/6 h-2/6 bg-white shadow-lg shadow-blue-400 rounded-2xl p-6 flex flex-col items-center gap-6 mb-6 search_card'>
        <h1 className='text-4xl font-bold text-indigo-900'>Image Generator App 📸</h1>
        <input type="text" value={search} placeholder='Write text to Generate' className='text-center border-2 border-black w-3/6 h-12 mt-8 text-lg font-semibold px-3 py-1' onChange={(e) => {setSearch(e.target.value)}}/>
      </div>
      <div className='w-full p-4 overflow-auto flex flex-col gap-y-4 '>
        <Images searchQuery = {debounceSearch}/>
      </div>
    </div>
  )
}

export default App;
