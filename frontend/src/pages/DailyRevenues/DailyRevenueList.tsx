import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CellProps } from "react-table";

import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Link } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
import {
  Loader,
  DeleteModal,
  BreadCrumb,
  TableContainer,
  TableContainerHeader,
  TableFilters,
} from "Components/Common";

import {
  CheckboxHeader,
  CheckboxCell,
  Id,
  Notes,
  Date,
  Amount,
  Status,
  Actions,
} from "Components/Common/Table/TableColumns";

//Import Icons
import FeatherIcon from "feather-icons-react";
import {
  DailyRevenueTable,
  DailyRevenueWidgets,
} from "../../common/data/DailyRevenueList";
import { useDelete } from "Components/Hooks";

import DailyRevenueModal from "./DailyRevenueModal";

//Import actions
import { getDailyRevenues, deleteDailyRevenue } from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { dailyRevenueSelector } from "Selectors";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

const DailyRevenueList = () => {
  const dispatch: any = useDispatch();

  // Delete Hook
  const {
    handleDeleteItem,
    onClickDelete,
    deleteModal,
    setDeleteModal,
    checkedAll,
    deleteCheckbox,
    isMultiDeleteButton,
    deleteModalMulti,
    setDeleteModalMulti,
    deleteMultiple,
  } = useDelete(deleteDailyRevenue);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setDailyRevenue(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const { dailyRevenues, isDailyRevenueSuccess, error } =
    useSelector(dailyRevenueSelector);

  console.log("dailyRevenues: ", dailyRevenues);
  console.log("isDailyRevenueSuccess: ", isDailyRevenueSuccess);
  console.log("error: ", error);

  const [dailyRevenue, setDailyRevenue] = useState<any>(null);

  useEffect(() => {
    // Dispatch getDailyRevenues if dailyRevenues is not available
    if (!dailyRevenues || dailyRevenues.length === 0) {
      console.log("are you dispatching?");
      dispatch(getDailyRevenues());
    }
  }, [dispatch, dailyRevenues]);

  useEffect(() => {
    // Log and set the state when dailyRevenues updates
    if (dailyRevenues && dailyRevenues.length > 0) {
      console.log("dailyRevenue: ", dailyRevenues);
      setDailyRevenue(dailyRevenues); // Assuming you want to set the first item or some specific item from the array
    }
  }, [dailyRevenues]);

  const handleDailyRevenueClick = useCallback(
    (arg: any) => {
      const dailyRevenue = arg;

      setDailyRevenue({
        id: dailyRevenue.id,
        project: dailyRevenue.name,
        dueDate: dailyRevenue.date,
        status: dailyRevenue.status,
        priority: dailyRevenue.priority,
        subItem: dailyRevenue.amount,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  //Column
  const columns = useMemo(
    () => [
      {
        header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        cell: (cell: any) => {
          return (
            <input
              type="checkbox"
              className="taskCheckBox form-check-input"
              value={cell.getValue()}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Date",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Date {...cell} />;
        },
      },
      {
        header: "Cash",
        enableColumnFilter: false,
        accessorKey: "cash",
        cell: (cell: any) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Credit",
        enableColumnFilter: false,
        accessorKey: "credit",
        cell: (cell: any) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Link",
        enableColumnFilter: false,
        accessorKey: "link",
        cell: (cell: any) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Others",
        enableColumnFilter: false,
        accessorKey: "others",
        cell: (cell: any) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Notes",
        enableColumnFilter: false,
        accessorKey: "notes",
        cell: (cell: any) => {
          return <Notes {...cell} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Status {...cell} />;
        },
      },
      {
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <div className="d-flex">
              <div className="hstack gap-2">
                <button
                  className="btn btn-sm btn-soft-info edit-list"
                  onClick={() => {
                    const dailyRevenueData = cellProps.row.original;
                    handleDailyRevenueClick(dailyRevenueData);
                  }}
                >
                  <i className="ri-pencil-fill align-bottom" />
                </button>
                <button
                  className="btn btn-sm btn-soft-danger remove-list"
                  onClick={() => {
                    const dailyRevenueData = cellProps.row.original;
                    onClickDelete(dailyRevenueData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill align-bottom" />
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    [checkedAll]
  );

  document.title = "Daily Revenue | Rio Brazil Salon Workspace";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteItem}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <DailyRevenueModal
          modal={modal}
          toggle={toggle}
          dailyRevenue={dailyRevenue}
          isEdit={isEdit}
          setModal={setModal}
        />

        <Container fluid>
          <BreadCrumb title="Daily Revenue" pageTitle="Daily Revenue" />
          <Row>
            <Col lg={12}>
              <Card id="dailyRevenue">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      DailyRevenues
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        {isMultiDeleteButton && (
                          <button
                            className="btn btn-primary me-1"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        )}
                        <Link
                          to="/apps-DailyRevenues-create"
                          className="btn btn-primary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create dailyRevenue
                        </Link>
                      </div>
                    </div>
                  </div>
                  <TableContainerHeader
                    title="DailyRevenues"
                    setDeleteModalMulti={setDeleteModalMulti}
                    PrimaryButtonText="Create dailyRevenue"
                    // HandlePrimaryButton={HandlePrimaryButton}
                  />
                </CardHeader>

                <CardBody className="pt-0">
                  <div>
                    {isDailyRevenueSuccess && dailyRevenues?.length ? (
                      <TableContainer
                        columns={columns}
                        data={dailyRevenues || []}
                        isGlobalFilter={true}
                        customPageSize={10}
                        isDailyRevenueListFilter={true}
                        theadClass="text-muted text-uppercase"
                        SearchPlaceholder="Search for customer, email, country, status or something..."
                      />
                    ) : (
                      <Loader error={error} />
                    )}
                    <ToastContainer closeButton={false} limit={1} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DailyRevenueList;
