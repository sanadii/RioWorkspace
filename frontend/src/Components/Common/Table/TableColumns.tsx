import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// Component, Constants & Hooks
import { StatusOptions } from "Components/constants";

const handleValidDate = (dueDate: string): string => {
  return moment(dueDate).format("YYYY-MM-DD");
};

// CheckBox props
type CheckboxHeaderProps = {
  checkedAll: () => void;
};

const CheckboxHeader: React.FC<CheckboxHeaderProps> = ({ checkedAll }) => (
  <input
    type="checkbox"
    id="checkBoxAll"
    className="form-check-input"
    onClick={checkedAll}
  />
);

// CheckBox props
type CheckboxCellProps = {
  row: {
    original: {
      id: string;
    };
  };
  deleteCheckbox: () => void;
};

const CheckboxCell: React.FC<CheckboxCellProps> = ({ row, deleteCheckbox }) => (
  <input
    type="checkbox"
    className="checkboxSelector form-check-input"
    value={row.original.id}
    onChange={deleteCheckbox}
  />
);

// Id props
type IdProps = {
  row: {
    original: {
      id: string;
      slug: string;
    };
  };
};
const Id: React.FC<IdProps> = ({ row }) => (
  <Link
    to={`/dashboard/elections/${row.original.slug}`}
    className="fw-medium link-primary"
  >
    {row.original.id}
  </Link>
);

// Name props & value
type NameProps = {
  row: {
    original: {
      value: string;
    };
  };
};

const Name: React.FC<NameProps> = ({ row }) => <b>{row.original.value}</b>;

// Description props & value
type DescriptionProps = {
  row: {
    original: {
      value: string;
    };
  };
};

const Description: React.FC<DescriptionProps> = ({ row }) => (
  <b>{row.original.value}</b>
);

type AmountProps = {
  row: {
    original: {
      value: number;
    };
  };
};

const Amount: React.FC<AmountProps> = ({ row }) => <b>{row.original.value}</b>;

type DateProps = {
  row: {
    original: {
      dueDate: string;
    };
  };
};

const DateComponent: React.FC<DateProps> = ({ row }) => (
  <span>{handleValidDate(row.original.dueDate)}</span>
);

type StatusOption = {
  id: number;
  name: string;
  badgeClass: string;
};




type StatusProps = {
  row: {
    original: {
      status: string;
    };
  };
};


const Status: React.FC<StatusProps> = ({ row }) => {
  const statusMapping = StatusOptions.reduce((acc: Record<string, StatusOption>, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const { name, badgeClass } = statusMapping[row.original.status] || {
    name: "Unknown",
    badgeClass: "badge bg-primary",
  };

  return <span className={`${badgeClass} text-uppercase`}>{name}</span>;
};


type CreateByProps = {
  value: string;
};

const CreateBy: React.FC<CreateByProps> = ({ value }) => <span>{value}</span>;

type ActionsProps = {
  cell: {
    value: string;
    row: {
      original: any; // Replace 'any' with a more specific type if possible
    };
  };
  handleElectionClick: (electionData: any) => void; // Replace 'any' with a more specific type if possible
  onClickDelete: (electionData: any) => void; // Replace 'any' with a more specific type if possible
};

const Actions: React.FC<ActionsProps> = ({
  cell,
  handleElectionClick,
  onClickDelete,
}) => {
  return (
    <div className="d-flex">
      <div className="flex-grow-1 elections_name">{cell.value}</div>
      <div className="hstack gap-2">
        <button
          className="btn btn-sm btn-soft-info edit-list"
          onClick={() => {
            const electionData = cell.row.original;
            handleElectionClick(electionData);
          }}
        >
          <i className="ri-pencil-fill align-bottom" />
        </button>
        <button
          className="btn btn-sm btn-soft-danger remove-list"
          onClick={() => {
            const electionData = cell.row.original;
            onClickDelete(electionData);
          }}
        >
          <i className="ri-delete-bin-5-fill align-bottom" />
        </button>
      </div>
    </div>
  );
};

export {
  Id,
  CheckboxHeader,
  CheckboxCell,
  Name,
  Description,
  DateComponent as Date,
  Status,
  CreateBy,
  Amount,
  Actions,
};
