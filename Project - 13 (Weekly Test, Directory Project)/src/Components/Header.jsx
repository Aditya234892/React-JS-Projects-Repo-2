import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full bg-violet-900 flex flex-col items-center p-5 gap-4'>
            <div>    
                <h1 className='text-3xl text-violet-800 font-semibold border-2 border-white py-2 px-4 rounded-lg bg-indigo-200'>Aditya Directory App</h1>
            </div>
            <div className='w-full flex bg-indigo-300 justify-center rounded-xl'>
                <ul className='w-full flex justify-center gap-x-10 p-4 font-serif text-lg'>
                    <li><Link to="/"><button className='bg-violet-600 px-4 py-2 rounded-3xl hover:bg-indigo-600 active:scale-90 shadow-lg text-emerald-200 shadow-emerald-400 active:shadow-emerald-600 active:shadow-md active:text-emerald-400  duration-150'>Add New Person </button></Link></li>
                    <li><Link to="/retrieve-info"><button className='bg-violet-600 px-4 py-2 rounded-3xl hover:bg-indigo-600 active:scale-90 shadow-lg text-emerald-200 shadow-emerald-400 active:shadow-emerald-600 active:shadow-md active:text-emerald-400  duration-150'>Retrieve Information</button></Link></li>
                </ul>
            </div>
        </ div>
    );
}

export default Header;