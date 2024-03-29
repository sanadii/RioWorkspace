import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";

// General Filters
import GlobalFilter from "../Filters/GlobalFilter";
import PriorityFilter from "../Filters/PriorityFilter";
import StatusFilter from "../Filters/StatusFilter";
import ResetFilters from "../Filters/ResetFilters";
import SearchFilter from "../Filters/SearchFilter";


const TableFilters = ({

  // Tab Filters----------
  isElectionCategoryFilter,
  isCampaignRoleFilter,

  // Global Filter----------
  isGlobalFilter,

  globalFilter,

  // Select Filters----------
  isStatusFilter,
  isPriorityFilter,
  isResetFilters,
  isTestFilter,
  isGlobalSearch,

  // Settings
  activeTab,
  setActiveTab,
  filters,
  setFilters,
  customPageSize,
  SearchPlaceholder,

  // Constants
  setCampaignMemberList,
  setElectionCandidateList,
  setCampaignGuaranteeList,

  // From useTable
  preGlobalFilteredRows,
  setPageSize,
  gotoPage,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768); // Assuming 768px as the breakpoint
  const [showFilters, setShowFilters] = useState(!isMobile); // Filters should be displayed by default for non-mobile
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= 768;
      setWindowWidth(window.innerWidth);
      setIsMobile(isCurrentlyMobile);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Then, use 'filteredElections' to render your table or list.
  // const [activeTab, setActiveTab] = useState("0");

  return (
    <React.Fragment>

      {isMobile && (
        <Row className="d-grid mb-4">
          <button
            type="button"
            className="btn btn-danger mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            عرض الفلاتر
          </button>
        </Row>
      )}

      {
        (showFilters || !isMobile) && (

          <div>
            <Row className="g-4 mb-4">
              <div className="d-flex align-items-center ">
                <div className="col">
                  
                </div>
                <div className="flex-shrink-0"></div>
              </div>
            </Row>

            <Row className="g-4 mb-4">
              <div className="d-flex align-items-center ">
                <div className="col d-flex g-2 row">
                  {/* {isGlobalSearch && (
                            <select
                                className="form-select"
                                value={pageSize}
                                onChange={onChangeInSelect}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        )} */}
                  {isGlobalFilter && (
                    <GlobalFilter
                      preGlobalFilteredRows={preGlobalFilteredRows}
                      setFilters={setFilters}
                      SearchPlaceholder={SearchPlaceholder}
                      globalFilter={filters?.global}

                    />
                  )}

                  {isStatusFilter && (
                    <StatusFilter
                      filters={filters}
                      setFilters={setFilters}
                    />
                  )}
                  {isPriorityFilter && (
                    <PriorityFilter
                      filters={filters}
                      setFilters={setFilters}
                    />
                  )}
                 
                </div>
                <div className="flex-shrink-0">
                  {isResetFilters && (
                    <ResetFilters
                      setFilters={setFilters}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      globalFilter={globalFilter}
                    />
                  )}
                </div>
              </div>
            </Row>
          </div>
        )}

    </React.Fragment>
  )
};
export default TableFilters;
