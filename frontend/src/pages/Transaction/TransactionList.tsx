import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CellProps } from 'react-table';

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
  TableFilters,
  TableContainerHeader,
} from "Components/Common";
import {
  CheckboxHeader,
  CheckboxCell,
  Id,
  Description,
  Date,
  Amount,
  Status,
} from "Components/Common/Table/TableColumns";

//Import Icons
import FeatherIcon from "feather-icons-react";
import {
  transactionTable,
  transactionWidgets,
} from "../../common/data/transactionList";
import { useDelete } from "Components/Hooks";

//Import actions
import {
  getTransactions as onGetTransactions,
  deleteTransaction,
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { transactionSelector } from "Selectors";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

type RowData = {
  _id: string;
  date: string; // or Date, if you're using Date objects
  amount: number;
};

const TransactionList = () => {
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
  } = useDelete(deleteTransaction);

  const selectLayoutState = (state: any) => state.Transaction;

  const selecttransactionProperties = createSelector(
    selectLayoutState,
    (state) => ({
      transactions: state.transactions,
      isTransactionSuccess: state.isTransactionSuccess,
      error: state.error,
    })
  );
  // Inside your component
  const { transactions, isTransactionSuccess, error } = useSelector(
    selecttransactionProperties
  );

  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (transactions && !transactions.length) {
      dispatch(onGetTransactions());
    }
  }, [dispatch, transactions]);

  useEffect(() => {
    setTransaction(transactions);
  }, [transactions]);

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
              className="transactionCheckBox form-check-input"
              value={cell.getValue()}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
        accessorKey: "_id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "DATE",
        accessorKey: "date",
        Cell: (cellProps: CellProps<RowData>) => <Date {...cellProps} />,
      },
      {
        header: "AMOUNT",
        accessorKey: "amount",
        Cell: (cellProps: CellProps<RowData>) => <Amount {...cellProps} />,
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
        <Container fluid>
          <BreadCrumb title="Daily Revenue" pageTitle="Daily Revenue" />
          <Row>
            <Col lg={12}>
              <Card id="transactionList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Transactions
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
                          to="/apps-transactions-create"
                          className="btn btn-primary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create Transaction
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {isTransactionSuccess && transactionTable.length ? (
                      <TableContainer
                        columns={columns}
                        data={transactionTable || []}
                        isGlobalFilter={true}
                        customPageSize={10}
                        isTransactionListFilter={true}
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

export default TransactionList;
