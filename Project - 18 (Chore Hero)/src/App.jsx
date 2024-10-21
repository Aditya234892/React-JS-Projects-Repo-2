import { useReducer, createContext, useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/CardList/CardList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import choreHeroIntros from "./components/IntroLines";

// our context provider
export const TrelloContext = createContext();

function App() {
  const initState = {
    todo: [],
    inProgress: [],
    done: [],
  };

  const gradientClasses = [
    "bg-gradient-to-tr from-red-400 to-coral-400",
    "bg-gradient-to-tr from-green-00 to-teal-500",
    "bg-gradient-to-tr from-blue-500 to-indigo-500",
    "bg-gradient-to-tr from-purple-500 to-pink-500",
    "bg-gradient-to-tr from-yellow-500 to-red-500",
    "bg-gradient-to-tr from-cyan-500 to-blue-500",
    "bg-gradient-to-tr from-emerald-500 to-teal-500",
    "bg-gradient-to-tr from-pink-500 to-purple-500",
    "bg-gradient-to-tr from-indigo-600 to-blue-600",
    "bg-gradient-to-tr from-gray-500 to-gray-800"
  ];
  

  const reducerfn = (state, action) => {
    switch (action.type) {
      case "add-item":
        return {
          ...state,
          [action.payload.listName]: [
            ...state[action.payload.listName],
            action.payload.data,
          ],
        };
      case "move-item": {
        const fromList = state[action.payload.fromList].filter(
          (item) => item !== action.payload.data
        );
        const toList = [...state[action.payload.toList], action.payload.data];
        return {
          ...state,
          [action.payload.fromList]: fromList,
          [action.payload.toList]: toList,
        };
      }
      case "edit-item": {
        const list = [...state[action.payload.listName]];
        list[action.payload.index] = action.payload.newData;
        return {
          ...state,
          [action.payload.listName]: list,
        };
      }
      case "delete-item": {
        const newList = state[action.payload.listName].filter(
          (_, idx) => idx !== action.payload.index
        );
        return {
          ...state,
          [action.payload.listName]: newList,
        };
      }
      default:
        return state;
    }
  };

  const [introIndex, setIntroIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Set an interval to update the intro every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIntroIndex((prevIndex) => (prevIndex + 1) % choreHeroIntros.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const [state, dispatch] = useReducer(reducerfn, initState);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-indigo-700 p-8">
      <h1 className="text-4xl font-extrabold text-white text-center mb-5">
        Chore Hero 🏅
      </h1>
      <h4
        className={`bg-clip-text text-transparent text-2xl font-bold text-white text-center mb-8 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        } ${gradientClasses[introIndex]}`}
      >
        {choreHeroIntros[introIndex].intro}
      </h4>
      <TrelloContext.Provider value={{ state, dispatch }}>
        <DndProvider backend={HTML5Backend}>
          <div className="flex justify-around gap-8">
            <CardList id="todo" title="To Do" />
            <CardList id="inProgress" title="In Progress" />
            <CardList id="done" title="Done" />
          </div>
        </DndProvider>
      </TrelloContext.Provider>
    </div>
  );
}

export default App;
