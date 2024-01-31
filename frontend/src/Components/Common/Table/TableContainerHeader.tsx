import React from "react";
import { Row, Col, Button } from "reactstrap";

interface TableContainerHeaderProps {
  title?: string;
  HandlePrimaryButton?: () => void;
  HandleSecondaryButton?: () => void;
  HandleTertiaryButton?: () => void;
  PrimaryButtonText?: string;
  SecondaryButtonText?: string;
  TertiaryButtonText?: string;
  AddButtonText?: string;
  handleEntryClick?: () => void;
  handleAddButtonClick?: (modalType: string) => void;
  setDeleteModalMulti?: (value: boolean) => void;
}

const TableContainerHeader: React.FC<TableContainerHeaderProps> = ({
  title,
  HandlePrimaryButton,
  HandleSecondaryButton,
  HandleTertiaryButton,
  PrimaryButtonText,
  SecondaryButtonText,
  TertiaryButtonText,
  AddButtonText,
  handleEntryClick,
  handleAddButtonClick,
  setDeleteModalMulti,
}) => {
  return (
    <Row className="g-4 mb-4">
      <div className="d-flex align-items-center">
        <Col>
          <h4>
            <b>{title}</b>
          </h4>
        </Col>
        <div className="flex-shrink-0">
          <div className="d-flex flex-wrap gap-2">
            {HandlePrimaryButton && (
              <Button
                type="button"
                className="btn btn-primary add-btn me-1"
                onClick={() => {
                  HandlePrimaryButton();
                }}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                {PrimaryButtonText}
              </Button>
            )}

            {HandleSecondaryButton && (
              <Button
                className="btn btn-danger add-btn me-1"
                onClick={() => HandleSecondaryButton()}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                {SecondaryButtonText}
              </Button>
            )}
            {HandleTertiaryButton && (
              <Button
                className="btn btn-success add-btn me-1"
                onClick={() => HandleTertiaryButton()}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                {TertiaryButtonText}
              </Button>
            )}
            {handleEntryClick && (
              <Button
                type="button"
                className="btn btn-primary add-btn me-1"
                onClick={() => {
                  handleEntryClick();
                }}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                {AddButtonText}
              </Button>
            )}
            {handleAddButtonClick && (
              <Button
                className="btn btn-primary add-btn me-1"
                onClick={() => {
                  handleAddButtonClick("AddModal");
                }}
              >
                <i className="ri-add-line align-bottom me-1"></i>
                {AddButtonText}
              </Button>
            )}
            {setDeleteModalMulti && (
              <button
                className="btn btn-soft-danger"
                onClick={() => setDeleteModalMulti(true)}
              >
                <i className="ri-delete-bin-2-line"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </Row>
  );
};

export default TableContainerHeader;
