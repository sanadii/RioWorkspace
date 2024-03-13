import React from "react";
import { Col, Label, FormFeedback } from "reactstrap";

interface FormStructureRendererProps {
  formStructure: string;
  renderInputFields: () => JSX.Element;
  validation: {
    touched: { [key: string]: boolean };
    errors: { [key: string]: string };
  };
  colSize?: number;
  icon?: string;
  id: string;
  label: string;
  name: string;
}

const FormStructureRenderer: React.FC<FormStructureRendererProps> = ({
  formStructure,
  renderInputFields,
  validation,
  colSize,
  icon,
  id,
  label,
  name,
}) => {
  switch (formStructure) {
    case "table":
      return (
        <React.Fragment>
          {renderInputFields()}
          {validation.touched[name] && validation.errors[name] && (
            <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
          )}
        </React.Fragment>
      );
    default:
      return (
        <Col lg={colSize} className="mb-3">
          {!icon && (
            <Label htmlFor={id} className="form-label">
              {label}
            </Label>
          )}
          {renderInputFields()}
          {validation.touched[name] && validation.errors[name] && (
            <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
          )}
        </Col>
      );
  }
};

export default FormStructureRenderer;
