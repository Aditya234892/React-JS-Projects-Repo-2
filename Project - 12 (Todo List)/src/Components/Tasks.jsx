import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = (props) => {
 
  const [check, setCheck] = useState(
    props.itemList.map((item) => ({ id: item.id, isChecked: false })) 
  );

  // Function to handle checkbox change
  const handleCheckChange = (id) => {
    let data = check;
    data.forEach(element => {
      if(element.id == id){
        element[isChecked]=true;
      }
    });
    setCheck(data);
  };

  const handleDeleteBtn = (id) => {
    notifyDelete(); 
    props.deleteItems(id); 
    let data = check.filter((element)=>{
      if(element.id!==id){
        return  true;
      }
      return false;
    });
    setCheck(data);
  };

  useEffect(()=>{
    let data = props.itemList.map((item) => ({ id: item.id, isChecked: false })) ;
    console.log('Division');
    setCheck(data);
  },[props])
  const notifyDelete = () => {
    toast.error('🗑️ Task Deleted Successfully!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-3 items-center shadow-xl p-3 rounded-md hover:shadow-2xl duration-300">
      {props.itemList.map((item, index) => {
        return (
          <div
            key={`${item.id}_itemList`}
            className="w-8/12 py-1 px-4 flex justify-between"
          >
            <div className="gap-x-2 flex justify-center items-center">
              <input
                className="w-3 h-3 flex-shrink-0"
                type="checkbox"
                checked={check[index][isChecked]}
                onChange={() => handleCheckChange(item.id)} 
              />
              <p
                className={`text-2xl font-semibold text-teal-900 ${
                  check[index] ? "line-through" : ""
                }`}
              >
                {item.item}
              </p>
              {console.log}
            </div>

            <button
              className="bg-teal-800 px-3 py-1 rounded-lg text-teal-100 font-semibold active:scale-75 active:bg-violet-400 active:text-violet-900 duration-100 outline-none"
              onClick={() => handleDeleteBtn(item.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
1