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
import { useDispatch } from "react-redux";
import { addRevenue, updateRevenue } from "store/actions";

interface RevenueModalProps {
  isEdit: boolean;
  setModal: (modal: boolean) => void;
  modal: boolean;
  toggle: () => void;
  dailyRevenue: any; // Define a more specific type if possible
}

const RevenueModal = ({
  isEdit,
  setModal,
  modal,
  toggle,
  dailyRevenue,
}: RevenueModalProps) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  document.title =
    "Create Revenue | Velzon - React Admin & Dashboard Template";

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: (dailyRevenue && dailyRevenue.id) || null,
      date: (dailyRevenue && dailyRevenue.date) || "",
      cash: (dailyRevenue && dailyRevenue.cash) || 0,
      credit: (dailyRevenue && dailyRevenue.credit) || 0,
      link: (dailyRevenue && dailyRevenue.link) || 0,
      others: (dailyRevenue && dailyRevenue.others) || 0,
      notes: (dailyRevenue && dailyRevenue.notes) || "",
      status: (dailyRevenue && dailyRevenue.status) || "pending",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newRevenue = {
        id: values.id || undefined, // If no ID, set it to undefined
        date: values.date,
        cash: values.cash,
        credit: values.credit,
        link: values.link,
        others: values.others,
        notes: values.notes,
        status: values.status ,
      };
      if (newRevenue.id) {
        dispatch(updateRevenue(newRevenue));
      } else {
        dispatch(addRevenue(newRevenue));
      }
      history("/apps-Revenues-list");
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
      id: "cash-field",
      name: "cash",
      label: "Cash",
      type: "text",
      colSize: 3,
    },
    {
      id: "credit-field",
      name: "credit",
      label: "Credit",
      type: "text",
      colSize: 3,
    },
    {
      id: "link-field",
      name: "link",
      label: "Link",
      type: "text",
      colSize: 3,
    },
    {
      id: "others-field",
      name: "others",
      label: "Others",
      type: "text",
      colSize: 3,
    },
    {
      id: "notes-field",
      name: "notes",
      label: "Notes",
      type: "text",
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
        {isEdit ? "Edit Daily Revenue" : "Add Daily Revenue"}
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
                {!!isEdit ? " Update Revenue" : "Add Revenue"}
              </button>
            </div>
          </div>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default RevenueModal;
