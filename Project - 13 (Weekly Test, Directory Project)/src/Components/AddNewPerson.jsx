import { useState, useEffect } from "react";
import TableRows from "./TableRows";
const today = new Date().toISOString().split("T")[0];
const AddNewPerson = () => {
  const [addData, setAddData] = useState(true);
  //   console.log(addData);
  const [name, setName] = useState("");
  const [dob, setDOB] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [aadharNumber, setAadharNumber] = useState();
  const [phnNumber, setPhnNumber] = useState();
  const [age, setAge] = useState("Age");
  const [peopleData, setPeopleData] = useState([]);// Used to set the local storage data in the table whenever local storage is updated


  const loadDataFromLocalStorage = () => {
    const existingData = JSON.parse(localStorage.getItem("peopleData")) || [];
    setPeopleData(existingData);
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const [year, month, day] = selectedDate.split("-");
    setDOB({ year, month, day });
  };

  const handleAddButton = () => {
    setAddData(false);
  };

  const handleDeleteButton = () => {
    setAddData(true);
  };

  const handleSaveBtn = () => {
    if (
      !name ||
      !aadharNumber ||
      !phnNumber ||
      age === "Age" ||
      !dob.year ||
      !dob.month ||
      !dob.day) {
      alert("Fill all the input fields to save or Click on Delete button!!");
    } 
    if(aadharNumber.length < 12 ){
      alert("Invalid Aadhar Card");
      return;
    }
    if(phnNumber.length < 10){
      alert("Invalid Phone Number");
      return;
    }else {
      const newPersonData = {
        id: new Date().getTime(),
        name: name.toLowerCase()  ,
        dob: `${dob.year}-${dob.month}-${dob.day}`,
        aadharNumber: aadharNumber,
        phnNumber: phnNumber,
        age: age,
      };
      saveDataInLocalStorage(newPersonData);

      //Load Data From Local Storage Whenever Save button is hit
      loadDataFromLocalStorage();

      setName("");
      setDOB({ year: "", month: "", day: "" });
      setAadharNumber("");
      setPhnNumber("");
      setAge("");
      setAddData(true);
    }
  };
  //   console.log(personData);

  const saveDataInLocalStorage = (newPersonData) => {
    const existingData = JSON.parse(localStorage.getItem("peopleData")) || [];
    existingData.push(newPersonData);
    localStorage.setItem("peopleData", JSON.stringify(existingData));
  };

  const calculateAge = () => {
    // Ensure that the DOB fields are valid
    if (!dob.year || !dob.month || !dob.day) {
      setAge("");
      return;
    }
    const birthDate = new Date(dob.year, dob.month - 1, dob.day);
    const today = new Date();
    const ageDiffMs = today.getTime() - birthDate.getTime();
    const ageDiffYears = Math.floor(ageDiffMs / (365.25 * 24 * 60 * 60 * 1000));
    // console.log(ageDiffYears);
    if (ageDiffMs < 0) {
      setAge(0);
    } else {
      setAge(ageDiffYears);
    }
  };

  const deletePerson = (id) => {
    console.log("Working", id);
    const updatedData = peopleData.filter((personData) => personData.id!== id);
    setPeopleData(updatedData);
    localStorage.setItem("peopleData", JSON.stringify(updatedData));
  } 
//   console.log(peopleData); 

  // Automatically calculate age whenever DOB changes
  useEffect(() => {
    calculateAge();
  }, [dob]); // Re-run age calculation whenever DOB changes
  
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []); // Load data from local storage when component mounts

  //   console.log(name, dob, aadharNumber, phnNumber, age);    

  return (
    <div className="w-full h-[74.5vh] p-4 bg-indigo-200">
      <div className="w-full h-full flex flex-col items-center border-4 border-red-800 bg-red-100 px-5">
        <h1 className="text-lg text-indigo-700 border-4 border-red-800 border-t-0 px-4 py-2 font-semibold bg-white rounded-br-xl rounded-bl-xl">
          Add New Person's Data
        </h1>
        <table className="min-w-full border-collapse border-2 border-red-800 mt-6">
          <thead className="bg-red-300 text-red-950">
            <tr>
              <th className="border-2 border-red-900 px-4 py-2">Name</th>
              <th className="border-2 border-red-900 px-4 py-2">
                Date Of Birth
              </th>
              <th className="border-2 border-red-900 px-4 py-2">
                Aadhar Number
              </th>
              <th className="border-2 border-red-900 px-4 py-2">
                Mobile Number
              </th>
              <th className="border-2 border-red-900 px-4 py-2">Age</th>
              <th className="border-2 border-red-900 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                peopleData.map((person, index) => {
                    // console.log(person); 
                    return <TableRows key = {index} id = {person.id} name = {person.name} dob = {person.dob} aadharNumber = {person.aadharNumber} phnNumber = {person.phnNumber} age = {person.age} deletePerson = {deletePerson}/>
                })
            }
          </tbody>
        </table>

        {!addData ? (
          <table className="min-w-full border-collapse border-2 border-red-800 mt-6 table-fixed">
            <thead className="bg-red-300 text-red-950">
              <tr>
                <th className="text-center px-4 py-2" colSpan="6">
                  Fill the below form and click on the save button to add a "New
                  Entry"
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border-2 border-red-900 w-1/6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full h-full py-1 px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
                <td className="border-2 border-red-900 w-1/6">
                  <input
                    type="date"
                    max={today}
                    className="w-full h-full py-1 px-3"
                    value={`${dob.year}-${dob.month}-${dob.day}`}
                    onChange={handleDateChange}
                  />
                </td>
                <td className="border-2 border-red-900 w-1/6">
                  <input
                    type="number"
                    placeholder="Aadhar Number"
                    className="w-full h-full py-1 px-3"
                    maxLength={12}
                    minLength={12}  
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                  />
                </td>
                <td className="border-2 border-red-900 w-1/6">
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    className="w-full h-full py-1 px-3"
                    maxLength={10}
                    minLength={10}
                    value={phnNumber}
                    onChange={(e) => setPhnNumber(e.target.value)}
                  />
                </td>
                <td className="border-2 border-red-900 w-1/6">
                  <input
                    type="number"
                    placeholder="Age"
                    min={0}
                    max={180}
                    className="w-full h-full py-1 px-3"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </td>
                <td className="border-2 border-red-900 w-1/6">
                  <button
                    className="px-4 py-1 bg-red-900 rounded-lg text-red-100"
                    onClick={handleSaveBtn}
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : null}

        {addData ? (
          <button
            className="absolute bottom-[5vh] right-[3vw] bg-blue-600 text-violet-100 font-semibold py-1 px-6 rounded-xl active:scale-90 duration-150"
            onClick={handleAddButton}
          >
            Add
          </button>
        ) : (
          <button
            className="absolute bottom-[5vh] right-[3vw] bg-red-600 text-violet-100 font-semibold py-1 px-6 rounded-xl active:scale-90 duration-150"
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNewPerson;
