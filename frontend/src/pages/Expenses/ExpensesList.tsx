import React, { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";

import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";

import { Link } from "react-router-dom";


import {
  Notes,
  Date,
  Amount,
  StatusExpenses as Status,
  Name,
} from "Components/Common/Table/TableColumns";

import { getExpenses, deleteExpense } from "store/actions";


//Import Components, Constants, Hooks.
import {
  Loader,
  DeleteModal,
  BreadCrumb,
  TableContainer,
  TableContainerHeader,
} from "Components/Common";

import ExpenseModal from "./ExpenseModal";

//Import actions

//redux
import { useSelector, useDispatch } from "react-redux";
import { expenseSelector } from "Selectors";
import { useDelete } from "Components/Hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseList = () => {
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
  } = useDelete(deleteExpense);

  const { expenses, isExpenseSuccess, error } = useSelector(expenseSelector);
  const [expense, setExpense] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  // Use the custom hook

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setExpense(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  useEffect(() => {
    // Dispatch getExpenses if expenses is not available
    if (!expenses || expenses.length === 0) {
      console.log("are you dispatching?");
      dispatch(getExpenses());
    }
  }, [dispatch, expenses]);

  useEffect(() => {
    // Log and set the state when expenses updates
    if (expenses && expenses.length > 0) {
      console.log("expense: ", expenses);
      setExpense(expenses); // Assuming you want to set the first item or some specific item from the array
    }
  }, [expenses]);

  const handleExpenseClick = useCallback(
    (arg: any) => {
      const expense = arg;

      setExpense({
        id: expense.id,
        date: expense.date,
        cash: expense.cash,
        credit: expense.credit,
        link: expense.link,
        other: expense.other,
        status: expense.status,
        notes: expense.notes,
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
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Date {...cell} />;
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
        header: "amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Paid By",
        accessorKey: "paidBy",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Name {...cell} />;
        },
      }, 
      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Name {...cell} />;
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
                    const expenseData = cellProps.row.original;
                    handleExpenseClick(expenseData);
                  }}
                >
                  <i className="ri-pencil-fill align-bottom" />
                </button>
                <button
                  className="btn btn-sm btn-soft-danger remove-list"
                  onClick={() => {
                    const expenseData = cellProps.row.original;
                    onClickDelete(expenseData);
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
        <ExpenseModal
          modal={modal}
          toggle={toggle}
          expense={expense}
          isEdit={isEdit}
          setModal={setModal}
        />

        <Container fluid>
          <BreadCrumb title="Daily Revenue" pageTitle="Daily Revenue" />
          <Row>
            <Col lg={12}>
              <Card id="expense">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Expenses</h5>
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
                          to="/apps-Expenses-create"
                          className="btn btn-primary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create expense
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  <div>
                    {isExpenseSuccess && expenses?.length ? (
                      <TableContainer
                        columns={columns}
                        data={expenses || []}
                        isGlobalFilter={true}
                        customPageSize={10}
                        // isExpenseListFilter={true}
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

export default ExpenseList;
