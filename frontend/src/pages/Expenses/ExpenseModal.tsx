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

import { addExpense, updateExpense } from "store/actions";

interface ExpenseModalProps {
  isEdit: boolean;
  setModal: (modal: boolean) => void;
  modal: boolean;
  toggle: () => void;
  expense: any; // Define a more specific type if possible
}

type PaidByOption = {
  id: string;
  name: string;
  // Add any other properties if necessary
};

type ExpensesCategoryOption = {
  id: string;
  name: string;
  // Add any other properties if necessary
};


const ExpenseModal = ({
  isEdit,
  setModal,
  modal,
  toggle,
  expense,
}: ExpenseModalProps) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const {
    ExpensesStatusOptions,
    ExpensesCategoryOptions,
    PaidByOptions,
    error,
  } = useSelector(settingsSelector);

  document.title = "Create Expense | Rio Brazil Salon - React Workspace";

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: (expense && expense.id) || null,
      date: (expense && expense.date) || "",
      notes: (expense && expense.notes) || "",
      amount: (expense && expense.amount) || 0,
      paidBy: (expense && expense.paidBy) || "sanad",
      category: (expense && expense.category) || "Utilities",
      status: (expense && expense.status) || "pending",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newExpense = {
        id: values.id || undefined, // If no ID, set it to undefined
        date: values.date,
        notes: values.notes,
        amount: values.amount,
        paidBy: values.paidBy,
        category: values.category,
        status: values.status,
      };
      if (newExpense.id) {
        dispatch(updateExpense(newExpense));
      } else {
        dispatch(addExpense(newExpense));
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

      options: PaidByOptions?.map((item: PaidByOption) => ({
        id: item.id,
        label: item.name,
        value: item.id,
      })),
    },
    {
      id: "category-field",
      name: "category",
      label: "Category",
      type: "select",
      colSize: 4,
      options: ExpensesCategoryOptions?.map((item: ExpensesCategoryOption) => ({
        id: item.id,
        label: item.name,
        value: item.id,
      })),
    },
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
        {isEdit ? "Edit Expense" : "Add Expense"}
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
                {!!isEdit ? " Update Expense" : "Add Expense"}
              </button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ExpenseModal;
