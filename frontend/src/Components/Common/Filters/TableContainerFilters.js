import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";

// General Filters
import GlobalFilter from "./GlobalFilter";
import PriorityFilter from "./PriorityFilter";
import StatusFilter from "./StatusFilter";
import ResetFilters from "./ResetFilters";
import SearchFilter from "./SearchFilter";


const TableContainerFilters = ({

    // Tab Filters----------

    // Global Filter----------
    isGlobalFilter,

    globalFilter,

    // Select Filters----------
    isStatusFilter,
    isPriorityFilter,
    isResetFilters,
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
    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };
    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };

    // Fetching the elections (assuming you have them in some state or context)
    const elections = useSelector((state) => state.Elections.elections);


    // Then, use 'filteredElections' to render your table or list.
    // const [activeTab, setActiveTab] = useState("0");

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
};
export default TableContainerFilters
