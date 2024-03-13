import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SearchDropDown = ({ clientSearchValue, clients, onSelectClient }) => {
  console.log("clientSearchValue ", clientSearchValue, "[", clientSearchValue.length, "]");

  useEffect(() => {
    const searchDropdown = document.getElementById("client-dropdown") as HTMLElement;
    const clientSearchInput = document.getElementById("clientName") as HTMLInputElement;

    clientSearchInput.addEventListener("focus", function () {
      if (clientSearchValue.length > 0) {
        searchDropdown.classList.add("show");
      } else {
        searchDropdown.classList.add("hide");
      }
    });

    clientSearchInput.addEventListener("keyup", function () {
      if (clientSearchValue.length > 0) {
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
  }, [clientSearchValue]);

  return (
    <div className="dropdown dropdown-menu dropdown-menu-lg" id="client-dropdown">
      <SimpleBar style={{ height: "320px" }}>
        {clients.map((client) => (
          <div className="dropdown-header" key={client.id} onClick={() => onSelectClient(client)}>
            <Link to="#">
              <strong>{client.name}</strong> {client.mobile}
            </Link>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};

export default SearchDropDown;
