import React, { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";

import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";

import { Link } from "react-router-dom";


import {
  Notes,
  Date,
  Amount,
  Name,
} from "Components/Common/Table/TableColumns";

import { getServices, deleteService } from "store/actions";


//Import Components, Constants, Hooks.
import {
  Loader,
  DeleteModal,
  BreadCrumb,
  TableContainer,
  TableContainerHeader,
} from "Components/Common";

import ServiceModal from "./ServiceModal";

//Import actions

//redux
import { useSelector, useDispatch } from "react-redux";
import { servicesSelector } from "Selectors";
import { useDelete } from "Components/Hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceList = () => {
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
  } = useDelete(deleteService);

  const { services, isServiceSuccess, error } = useSelector(servicesSelector);
  const [service, setService] = useState<any>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  // Use the custom hook

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setService(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  useEffect(() => {
    // Dispatch getServices if services is not available
    if (!services || services.length === 0) {
      console.log("are you dispatching?");
      dispatch(getServices());
    }
  }, [dispatch, services]);

  useEffect(() => {
    // Log and set the state when services updates
    if (services && services.length > 0) {
      console.log("service: ", services);
      setService(services); // Assuming you want to set the first item or some specific item from the array
    }
  }, [services]);

  const handleServiceClick = useCallback(
    (arg: any) => {
      const service = arg;

      setService({
        id: service.id,
        date: service.date,
        cash: service.cash,
        credit: service.credit,
        link: service.link,
        other: service.other,
        notes: service.notes,
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
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell: any) => {
          return <Name {...cell} />;
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
        header: "Action",
        cell: (cellProps: any) => {
          return (
            <div className="d-flex">
              <div className="hstack gap-2">
                <button
                  className="btn btn-sm btn-soft-info edit-list"
                  onClick={() => {
                    const serviceData = cellProps.row.original;
                    handleServiceClick(serviceData);
                  }}
                >
                  <i className="ri-pencil-fill align-bottom" />
                </button>
                <button
                  className="btn btn-sm btn-soft-danger remove-list"
                  onClick={() => {
                    const serviceData = cellProps.row.original;
                    onClickDelete(serviceData);
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
        <ServiceModal
          modal={modal}
          toggle={toggle}
          service={service}
          isEdit={isEdit}
          setModal={setModal}
        />

        <Container fluid>
          <BreadCrumb title="Daily Revenue" pageTitle="Daily Revenue" />
          <Row>
            <Col lg={12}>
              <Card id="service">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Services</h5>
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
                          to="/apps-Services-create"
                          className="btn btn-primary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i>{" "}
                          Create service
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  <div>
                    {isServiceSuccess && services?.length ? (
                      <TableContainer
                        columns={columns}
                        data={services || []}
                        isGlobalFilter={true}
                        customPageSize={10}
                        // isServiceListFilter={true}
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

export default ServiceList;
