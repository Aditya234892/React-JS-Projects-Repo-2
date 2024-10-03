import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = (props) => {
  // Initiallizing the check Array with false
  const [check, setCheck] = useState(
    props.itemList.map(() => false) // initialize the check state based on the number of items
  );

  // Function to handle checkbox change
  const handleCheckChange = (index) => {
    const newCheckState = [...check];
    newCheckState[index] = !newCheckState[index]; // Toggle the specific checkbox at the index
    setCheck(newCheckState);
  };

  const handleDeleteBtn = (id) => {
    notify(); // Show notification
    props.deleteItems(id); // Call the delete function from props
  };

  const notify = () => {
    toast("TASK Deleted Successfully")
  };

  return (
    <div className="w-full flex flex-col justify-center items-center shadow-xl p-3 rounded-md hover:shadow-2xl duration-300">
        <ToastContainer />
      {props.itemList.map((item, index) => {
        return (
          <div
            key={`${index}_itemList`}
            className="w-3/5 py-1 flex justify-between items-center"
          >
            <div className=" w-[80px] h-10 gap-x-2 flex jus tify-center items-center ">
            <input
  className="w-3 h-3 flex-shrink-0"
  type="checkbox"
  checked={check[index]} // Bind to the specific index of the check array
  onChange={() => handleCheckChange(index)} // Handle checkbox changes
/>
              {/* {console.log(item)} */}
              <p
                className={`text-2xl font-semibold text-teal-900 ${
                  check[index] ? "line-through" : ""
                }`}
              >
                {item.item}
              </p>
            </div>

            <button className="bg-teal-800 px-3 py-1 rounded-lg text-teal-100 font-semibold active:scale-75 active:bg-violet-400 active:text-violet-900 duration-100 outline-none" onClick={() => handleDeleteBtn(item.id, index)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
    
  );
};

export default Tasks;
