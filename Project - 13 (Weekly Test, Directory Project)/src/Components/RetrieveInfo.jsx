import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const RetrieveInfo = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [aadharNumber, setAadharNumber] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dropDown, setDropDown] = useState("");


  const debouncedName = useDebounce(name, 1000);
  const debouncedAadhar = useDebounce(aadharNumber, 1000);
  const debouncedMobile = useDebounce(mobile, 1000);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("peopleData"));
    setPeopleData(getData);
  }, []);

  return (
    <div className="w-full min-h-[74.5vh] bg-indigo-200 p-4">
      <div className="w-full flex flex-col items-center border-4 border-red-800 bg-red-100 px-5 pb-6">
        <h1 className="text-lg text-indigo-700 border-4 border-red-800 border-t-0 px-4 py-2 font-semibold bg-white rounded-br-xl rounded-bl-xl">
          Retrieve Information
        </h1>
        <div className="w-full mt-10 bg-indigo-300 p-4 border-4 border-indigo-500 rounded-2xl flex flex-col items-center text-xl gap-y-3">
          <select
            className="w-1/6 text-center py-1 text-indigo-800 font-semibold rounded-xl"
            value={dropDown}
            onChange={(e) => setDropDown(e.target.value)}
          >
            <option value="S" disabled={dropDown !== ""}>
              Select to Search
            </option>
            <option value="name">By Name</option>
            <option value="aadhar">By Aadhar Number</option>
            <option value="mobile">By Mobile Number</option>
          </select>

          {/* Search by Name */}
          {dropDown === "name" && (
            <>
              <h1 className="text-3xl font-semibold mt-6">Enter Name, to Search</h1>
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-1 w-3/6 rounded-2xl text-center"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="px-5 py-2 mt-4 flex gap-x-5">
                {peopleData
                  .filter((person) => person.name === debouncedName)
                  .map((person, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 border-2 border-indigo-400 rounded-xl mt-4"
                    >
                      <p>
                        <strong>Name:</strong> {person.name.charAt(0).toUpperCase() + person.name.slice(1).toLowerCase()}
                      </p>
                      <p>
                        <strong>DOB:</strong> {person.dob}
                      </p>
                      <p>
                        <strong>Aadhar Number:</strong> {person.aadharNumber}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {person.phnNumber}
                      </p>
                      <p>
                        <strong>Age:</strong> {person.age}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* Search by Aadhar */}
          {dropDown === "aadhar" && (
            <>
              <h1 className="text-3xl font-semibold mt-6">Enter Aadhar Card Number, to Search</h1>
              <input
                type="number"
                placeholder="Search"
                className="px-4 py-1 w-3/6 rounded-2xl text-center"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
              <div className="px-5 py-2 mt-4">
                {peopleData
                  .filter((person) => person.aadharNumber === debouncedAadhar) // Filter based on debounced Aadhaar
                  .map((person, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 border-2 border-indigo-400 rounded-xl mt-4"
                    >
                      <p>
                        <strong>Name:</strong> {person.name}
                      </p>
                      <p>
                        <strong>DOB:</strong> {person.dob}
                      </p>
                      <p>
                        <strong>Aadhar Number:</strong> {person.aadharNumber}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {person.phnNumber}
                      </p>
                      <p>
                        <strong>Age:</strong> {person.age}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* Search by Mobile */}
          {dropDown === "mobile" && (
            <>
              <h1 className="text-3xl font-semibold mt-6">Enter Mobile Number, to Search</h1>
              <input
                type="number"
                placeholder="Search"
                className="px-4 py-1 w-3/6 rounded-2xl text-center"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div className="px-5 py-2 mt-4">
                {peopleData
                  .filter((person) => person.phnNumber === debouncedMobile) // Filter based on debounced mobile
                  .map((person, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 border-2 border-indigo-400 rounded-xl mt-4"
                    >
                      <p>
                        <strong>Name:</strong> {person.name}
                      </p>
                      <p>
                        <strong>DOB:</strong> {person.dob}
                      </p>
                      <p>
                        <strong>Aadhar Number:</strong> {person.aadharNumber}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {person.phnNumber}
                      </p>
                      <p>
                        <strong>Age:</strong> {person.age}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetrieveInfo;
