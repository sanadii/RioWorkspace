import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SearchDropDown = ({ id, inputSearchValue, options, onSelect }) => {
  const handleClientSelect = (client) => {
    onSelect(client); // Trigger the onSelect event handler
    // searchDropdown.classList.remove("show");
    // searchDropdown.classList.add("hide");
  };

  useEffect(() => {
    const searchDropdown = document.getElementById("client-dropdown") as HTMLElement;
    const clientSearchInput = document.getElementById(id) as HTMLInputElement;

    clientSearchInput.addEventListener("focus", function () {
      if (inputSearchValue.length > 1) {
        searchDropdown.classList.add("show");
      } else {
        searchDropdown.classList.add("hide");
      }
    });

    clientSearchInput.addEventListener("keyup", function () {
      if (inputSearchValue.length > 1) {
        searchDropdown.classList.add("show");
      } else {
        searchDropdown.classList.add("hide");
      }
    });

    document.body.addEventListener("click", function (e: any) {
      if (e.target.getAttribute("id") !== "search-options") {
        searchDropdown.classList.remove("show");
        // searchOptions.classList.add("d-none");
      }
    });
  }, [inputSearchValue]);

  return (
    <div className="typeahead dropdown-menu dropdown-menu-lg" id="client-dropdown">
      <SimpleBar style={{ height: "320px" }}>
        {options.map((client) => (
          <div key={client.id} onClick={() => handleClientSelect(client)}>
            <Link to="#">
              <strong>{client.name}</strong> +{client.mobile}
            </Link>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default SearchDropDown;
