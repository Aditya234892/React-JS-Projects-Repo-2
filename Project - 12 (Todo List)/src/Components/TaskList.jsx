import { useState, useEffect } from "react";
import Tasks from "./Tasks";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
  const [items, setItems] = useState("");
  const [itemList, setItemList] = useState([]);

  
  useEffect(() => {
    const storedTasks = localStorage.getItem("taskList");
    if (storedTasks) {
      setItemList(JSON.parse(storedTasks)); 
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(itemList)); 
  }, [itemList]);

 
  const handleBtnClick = () => {
    if (items.trim() !== "") {
      const newItem = {
        id: Date.now(), 
        item: items.charAt(0).toUpperCase() + items.slice(1), 
      };
      const updatedList = [...itemList, newItem];
      setItemList(updatedList); 
      setItems(""); 
      // notifyAdd(); 
    }
  };


  const deleteItems = (id) => {
    const updatedList = itemList.filter((item) => item.id !== id);
    setItemList(updatedList);
    notifyDelete(); 
  };

    // const notifyAdd = () => {
    //   toast.success("Task Added Successfully!!", {
    //     position: "top-left",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // };

  return (
    <div className="shadow-md flex flex-col items-center gap-6 w-3/6 p-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-teal-800">Get it Done!! ✌️</h1>
      <div className="w-full flex justify-center">
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)} // Update input field
          className="w-2/5 py-1 px-4 rounded-tl-lg rounded-bl-lg"
          placeholder="Add Tasks"
        />
        <button
          onClick={handleBtnClick}
          className="bg-teal-900 py-1 px-4 rounded-tr-lg rounded-br-lg text-teal-100 font-semibold hover:bg-teal-500 hover:text-teal-950 duration-300"
        >
          Add items
        </button>
      </div>
      <Tasks itemList={itemList} deleteItems={deleteItems} />
    </div>
  );
};

export default TaskList;
