import React, { useState, useEffect } from "react";
import { Col, Label, Input, FormFeedback } from "reactstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Flatpickr from "react-flatpickr";

import defaultAvatar from "assets/images/users/default.jpg";
import config from "../../../config";

// Form
import FormStructureRenderer from "./FormStructureRenderer";
import SearchDropDown from "./SearchDropDown";

const { api } = config;

let mediaUrl = "";
if (api && api.MEDIA_URL) {
  mediaUrl = api.MEDIA_URL.endsWith("/") ? api.MEDIA_URL : `${api.MEDIA_URL}/`;
}

interface FieldOption {
  id: number;
  label: string;
  value: number;
  image?: string;
  onClick?: () => void;

  // text/number
  inputGroupText?: string;
}

interface Field {
  id: string;
  label: string;
  name: string;
  type: string;
  colSize?: number;
  icon?: string;
  iconBg?: string;
  options?: FieldOption[];

  // text/number
  // inputGroupText?: string;
}

interface Validation {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  touched: any;
  errors: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

interface FieldComponentProps {
  field: any;
  validation: Validation;
  selectedOption?: any;
  inLineStyle?: boolean;
  formStructure?: string;
}

// Update the FieldComponentProps interface to include all required properties

// Update the FieldComponent to handle the expected event signatures
const FieldComponent: React.FC<FieldComponentProps> = ({ field, validation, formStructure }) => {
  const {
    id,
    label,
    name,
    type,
    colSize,
    className,
    placeholder,
    isSearchable,
    isClearable,
    onChange,
    onInputChange,
    options,
    icon,
    iconBg,
  } = field;
  const imageValue = validation.values.image;

  const [imageSrc, setImageSrc] = useState(defaultAvatar);

  const onChangeHandler = (onChange && onChange) || validation.handleChange;
  const invalidHandler = !!(validation.touched[name] && validation.errors[name]);

  useEffect(() => {
    if (imageValue) {
      if (typeof imageValue === "string") {
        if (imageValue.startsWith("http://") || imageValue.startsWith("https://")) {
          // If the URL is absolute, use it as is
          setImageSrc(imageValue);
        } else {
          // If the URL is relative, prepend the media URL
          setImageSrc(`${mediaUrl}${imageValue}`);
        }
      } else if (imageValue instanceof File) {
        // If imageValue is a File object
        const objectUrl = URL.createObjectURL(imageValue);
        setImageSrc(objectUrl);
      }
    } else {
      setImageSrc(defaultAvatar);
    }
  }, [imageValue]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      validation.setFieldValue("image", selectedImage);
    }
  };

  const DateFormat = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const DateTimeFormat = (e, type) => {
    const updatedDate = e[0];
    if (type === "date") {
      // Format as date only
      validation.setFieldValue(name, DateFormat(updatedDate.toISOString()));
    } else {
      // Format as datetime
      validation.setFieldValue(name, updatedDate.toISOString());
    }
  };

  const renderInputFields = () => {
    switch (type) {
      case "text":
      case "tel":
      case "email":
      case "social":
        return (
          <div className="d-flex">
            {icon && (
              <div className="avatar-xs d-block flex-shrink-0 me-3">
                <span className={`avatar-title rounded-circle fs-16 ${iconBg}`}>
                  <i className={icon}></i>
                </span>
              </div>
            )}
            <Input
              type={type !== "social" ? type : "text"}
              name={name}
              id={id}
              placeholder={`Enter ${label}`}
              onChange={onChangeHandler}
              onBlur={validation.handleBlur}
              value={validation.values[name] || ""}
              invalid={invalidHandler}
            />
          </div>
        );
      case "searchDropdown":
        return (
          <div className="dropdown add-appt__customer-col">
            {icon && (
              <div className="avatar-xs d-block flex-shrink-0 me-3">
                <span className={`avatar-title rounded-circle fs-16 ${iconBg}`}>
                  <i className={icon}></i>
                </span>
              </div>
            )}
            <SearchDropDown validation={validation} field={field} onChangeHandler={onChangeHandler} />
          </div>
        );
      case "textarea":
        return (
          <Input
            type="textarea"
            name={name}
            id={id}
            placeholder={`Enter ${label}`}
            onChange={onChangeHandler}
            onBlur={validation.handleBlur}
            value={validation.values[name] || ""}
            invalid={invalidHandler}
          />
        );
      case "select":
        return (
          <Select
            id={id}
            name={name}
            type="select"
            className="form-select"
            // isSearchable={isSearchable || false}
            // isClearable={isClearable || false}
            // isDisabled={true}
            options={options}
            onChange={onChangeHandler}
            onBlur={validation.handleBlur}
            value={validation.values[id] || ""}
            invalid={!!(validation.touched[id] && validation.errors[id])}
          >
            {/* <option value="">-- Choose --</option> */}
            {field.options &&
              field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </Select>
        );
      case "select2":
        return (
          <Select
            id={id}
            name={name}
            classNamePrefix="select"
            className={className || "form-select"}
            isSearchable={true}
            isClearable={true}
            options={options}
            onChange={onChangeHandler}
            onBlur={validation.handleBlur}
            value={options.find((option) => option.value === validation.values[name]) || ""}
            // Ensure you handle 'invalid' prop correctly
          />
        );
      case "creatableSelect":
        return (
          <CreatableSelect
            id={id}
            name={name}
            isSearchable={true}
            isClearable={true}
            // no auto complete
            placeholder={placeholder}
            options={options}
            onChange={onChangeHandler}
            onInputChange={onInputChange}
            onBlur={validation.handleBlur}
            // value={validation.values[name] || ""}
            // Ensure you handle 'invalid' prop correctly
          />
        );
      case "date":
      case "dateTime":
        return (
          <Flatpickr
            name={name}
            id={id}
            className="form-control"
            placeholder={`Choose ${label}`}
            options={{
              enableTime: type === "dateTime",
              dateFormat: type === "dateTime" ? "Y-m-d H:i" : "Y-m-d",
            }}
            onChange={(e) => DateTimeFormat(e, type)}
            value={validation.values[name] || ""}
          />
        );
      case "image":
        return (
          <div className="profile-user position-relative d-inline-block mx-auto mb-4">
            <img
              src={imageSrc}
              className="rounded-circle avatar-xl img-thumbnail user-profile-image"
              alt="user-profile"
            />
            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
              <Input
                id={id}
                name={name}
                type="file"
                className="profile-img-file-input"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageSelect}
                onBlur={validation.handleBlur}
                invalid={validation.touched[name] && validation.errors[name] ? true : undefined}
              />
              <Label htmlFor={id} className="profile-photo-edit avatar-xs">
                <span className="avatar-title rounded-circle bg-light text-body">
                  <i className="ri-camera-fill"></i>
                </span>
              </Label>
            </div>
            {validation.touched[name] && validation.errors[name] && (
              <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
            )}
          </div>
        );
      case "password":
        return (
          <Input
            type="password"
            name={name}
            id={id}
            placeholder={`Enter ${label}`}
            onChange={onChangeHandler}
            onBlur={validation.handleBlur}
            value={validation.values[name] || ""}
            invalid={validation.touched[name] && validation.errors[name] ? true : undefined}
          />
        );
      // ... other cases
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <FormStructureRenderer
        formStructure={formStructure} // Pass the formStructure prop
        renderInputFields={renderInputFields} // Pass the renderInputFields function
        validation={validation} // Pass the validation prop
        colSize={colSize} // Pass any other props you need
        icon={icon}
        id={id}
        label={label}
        name={name}
      />
    </React.Fragment>
  );
};

export default FieldComponent;
