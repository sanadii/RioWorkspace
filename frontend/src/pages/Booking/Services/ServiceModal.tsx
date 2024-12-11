import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Button,
  Form,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FormFields } from "Components/Common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { settingsSelector } from "Selectors";

import { addService, updateService } from "store/actions";

interface ServiceModalProps {
  isEdit: boolean;
  setModal: (modal: boolean) => void;
  modal: boolean;
  toggle: () => void;
  service: any; // Define a more specific type if possible
}

type PaidByOption = {
  id: string;
  name: string;
  // Add any other properties if necessary
};

type ServicesCategoryOption = {
  id: string;
  name: string;
  // Add any other properties if necessary
};


const ServiceModal = ({
  isEdit,
  setModal,
  modal,
  toggle,
  service,
}: ServiceModalProps) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const {
    // ServicesStatusOptions,
    // ServicesCategoryOptions,
    paidByOptions,
    error,
  } = useSelector(settingsSelector);

  document.title = "Create Service | Rio Brazil Salon - React Workspace";

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: (service && service.id) || null,
      date: (service && service.date) || "",
      notes: (service && service.notes) || "",
      amount: (service && service.amount) || 0,
      paidBy: (service && service.paidBy) || "sanad",
      category: (service && service.category) || "Utilities",
      status: (service && service.status) || "pending",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newService = {
        id: values.id || undefined, // If no ID, set it to undefined
        date: values.date,
        notes: values.notes,
        amount: values.amount,
        paidBy: values.paidBy,
        category: values.category,
        status: values.status,
      };
      if (newService.id) {
        dispatch(updateService(newService));
      } else {
        dispatch(addService(newService));
      }
      history("/expenses");
      validation.resetForm();
    },
  });

  const fields = [
    // Existing fields
    {
      id: "date-field",
      name: "date",
      label: "Date",
      type: "info",
      colSize: 12,
    },
    {
      id: "amount-field",
      name: "amount",
      label: "Amount",
      type: "text",
      colSize: 4,
    },
    {
      id: "paidBy-field",
      name: "paidBy",
      label: "Paid By",
      type: "select",
      colSize: 4,

      options: paidByOptions?.map((item: PaidByOption) => ({
        id: item.id,
        label: item.name,
        value: item.id,
      })),
    },
    // {
    //   id: "category-field",
    //   name: "category",
    //   label: "Category",
    //   type: "select",
    //   colSize: 4,
    //   options: ServicesCategoryOptions?.map((item: ServicesCategoryOption) => ({
    //     id: item.id,
    //     label: item.name,
    //     value: item.id,
    //   })),
    // },
    {
      id: "notes-field",
      name: "notes",
      label: "Notes",
      type: "textarea",
      colSize: 12,
    },
  ];

  return (
    <Modal
      isOpen={modal}
      centered
      size="lg"
      className="border-0"
      modalClassName="modal fadeInLeft zoomIn"
    >
      <ModalHeader className="p-3 bg-soft-danger" toggle={toggle}>
        {isEdit ? "Edit Service" : "Add Service"}
      </ModalHeader>
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <ModalBody className="modal-body">
          <Row className="g-3">
            {fields.map((field) => {
              return (
                <FormFields
                  key={field.id}
                  field={field}
                  validation={validation}
                  inLineStyle={false} // Add this prop or make it optional in FormFields component
                />
              );
            })}
          </Row>
        </ModalBody>
        <ModalFooter>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                type="button"
                onClick={() => {
                  setModal(false);
                }}
                className="btn-light"
              >
                Close
              </Button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {!!isEdit ? " Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ServiceModal;
