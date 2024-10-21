import React from "react";

function TeamList(props) {
  return (
    <div className="teamList-card flex flex-col gap-2 p-4 mt-3 mb-3 w-2/5 rounded-lg shadow-md bg-green-400">
      <h1 className="text-2xl text-center font-extrabold">Team List</h1>
      <div className="w-full bg-gray-200 flex justify-between items-center p-3 rounded-md"> 
        <button onClick={() => props.dispatch({ type: "Calculate_average_age" })} className="bg-blue-400 py-1 px-2 rounded-md shadow-md shadow-orange-500 font-semibold active:scale-95">
          Calculate Average Age
        </button>
        <p>Average age: {props.averageAge.toFixed(2)}</p>
        <button onClick={() => props.dispatch({ type: "Sort_by_age" })} className="bg-orange-400 py-1 px-2 rounded-md shadow-md shadow-blue-500 font-semibold active:scale-95">Sort By Age</button>
      </div>
      {props.data.map((employee) => (
        <div
          className="employee-card flex items-center p-3 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-lg"
          key={employee.id}
        >
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-gray-800 text-orange-600">{`${employee.first_name} ${employee.last_name}`}</h3>
            <p>Age :{employee.age}</p>
            <p className="text-gray-600 truncate">{employee.email}</p>
          </div>
          <button
            onClick={() => props.dispatch({ type: "Remove_from_team_list", payload: employee })}
            className="text-blue-500 font-bold border border-blue-500 px-2 py-1 rounded-md ml-auto"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeamList;