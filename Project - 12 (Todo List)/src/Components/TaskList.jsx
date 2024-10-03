import { useState } from "react";
import Tasks from "./Tasks";

const TaskList = () => {
  const [items, setItems] = useState("");
  const [itemList, setItemList] = useState([]);

  const handleBtnClick = () => {
    if (items.trim() !== "") {
        //Creat object with id and then add it in List
        const newItem = { id: itemList.length + 1, item:  items.charAt(0).toUpperCase() + items.slice(1)};
        //Add the new item to the list
        const updatedList = [...itemList, newItem];
        setItemList(updatedList);
        setItems("");
      } 
  };

  const deleteItems = (id) => {
    const updatedList = itemList.filter((item) => {
        return item.id!==id;
    });
    setItemList(updatedList);
  };

  return (
    <div className="shadow-md flex flex-col items-center gap-6 w-3/6 p-8">
      <h1 className="text-2xl font-bold text-teal-800">Get it Done!!</h1>
      <div className="w-full flex justify-center">
        <input
          type="text"
          value={items}
          onChange={(e) => {
            setItems(e.target.value);
          }}
          className="w-2/5 py-1 px-4 rounded-tl-lg rounded-bl-lg"
          placeholder="Add Tasks"
        />
        {/* {console.log(items)} */}
        <button
          onClick={handleBtnClick}
          className="bg-teal-900 py-1 px-4 rounded-tr-lg rounded-br-lg text-teal-100 font-semibold hover:bg-teal-500 hover:text-teal-950 duration-300"
        >
          Add items
        </button>
      </div>

      <Tasks itemList={itemList} deleteItems = {deleteItems}/>
    </div>
  );
};

export default TaskList;
