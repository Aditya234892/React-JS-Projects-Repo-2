const Options = (props) => {
    const handleOnChange = (e) => {
      props.handleChange(e); // Pass the entire event, not just the value
    };
  
    return (
      <>
        <select
          className="w-2/3 text-center bg-red-400 rounded-3xl"
          onChange={handleOnChange}
          value={props.selectedLang} // Ensure the selected language is set
        >
          {props.languages.map((lang) => {
            return (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            );
          })}
        </select>
      </>
    );
  };
  
  export default Options;
  