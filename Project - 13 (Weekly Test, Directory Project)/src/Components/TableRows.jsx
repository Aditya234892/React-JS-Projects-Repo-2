const TableRows = (props) => {
  // Split the DOB string into year, month, and day
  const [year, month, day] = props.dob.split('-');
//   console.log(props);
  const handleDeleteBtn = (id) => {
    props.deletePerson(id);
    
  } 

  return (
    <tr className="text-center">
      <td className="border-2 border-red-900 px-4 py-2">{props.name.charAt(0).toUpperCase() + props.name.slice(1).toLowerCase()}</td>
      <td className="border-2 border-red-900 px-4 py-2">{`${year}-${month}-${day}`}</td>
      <td className="border-2 border-red-900 px-4 py-2">{props.aadharNumber}</td>
      <td className="border-2 border-red-900 px-4 py-2">{props.phnNumber}</td>
      <td className="border-2 border-red-900 px-4 py-2">{props.age}</td>
      <td className="border-2 border-red-900 px-4 py-2"><button className="bg-red-500 py-1 px-4 rounded-lg text-red-100 active:scale-95 duration-100" onClick={() => {handleDeleteBtn(props.id)}}>Delete</button></td>
    </tr>
  );
};

export default TableRows;
