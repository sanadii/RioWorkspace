import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SearchDropDown = ({ field, validation, onChangeHandler }) => {
  const { id, label, name, options, onChange, onSelect } = field;

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleClientSelect = (client) => {
    onSelect(client); // Trigger the onSelect event handler
    setIsDropdownVisible(false); // Hide dropdown
  };

  const handleInputChange = (e) => {
    onChangeHandler(e);
    setIsDropdownVisible(e.target.value.length > 1);
  };

  const handleDocumentClick = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      inputRef.current &&
      !inputRef.current.contains(e.target)
    ) {
      setIsDropdownVisible(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <React.Fragment>
      <input
        type="text"
        id={id}
        name={name}
        className="form-control"
        placeholder={`Enter ${label}`}
        ref={inputRef}
        value={validation.values[name] || ""}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={validation.handleBlur}
      />
      {validation.touched[name] && validation.errors[name] && (
        <div className="invalid-feedback">{validation.errors[name]}</div>
      )}

      <div className={`dropdown-menu dropdown-menu-lg ${isDropdownVisible ? "show" : ""}`} ref={dropdownRef}>
        <SimpleBar style={{ height: "320px" }}>
          {options.map((client) => (
            <div key={client.id} onClick={() => handleClientSelect(client)}>
              <Link to="#">
                <strong>{client.name}</strong> {client.mobile}
              </Link>
            </div>
          ))}
        </SimpleBar>
      </div>
    </React.Fragment>
  );
};

export default SearchDropDown;
