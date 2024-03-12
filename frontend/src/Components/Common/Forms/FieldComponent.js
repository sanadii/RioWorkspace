import React, { useState, useEffect } from "react";
import { Col, Label, Input, Table, FormFeedback } from "reactstrap";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Flatpickr from "react-flatpickr";

import defaultAvatar from 'assets/images/users/default.jpg';
import config from '../../../config';

const { api } = config;

let mediaUrl = '';
if (api && api.MEDIA_URL) {
    mediaUrl = api.MEDIA_URL.endsWith('/') ? api.MEDIA_URL : `${api.MEDIA_URL}/`;
}


const FieldComponent = ({ field, validation, formStructure }) => {
    const { id, label, name, type, colSize, className, placeholder, isSearchable, isClearable, isDisabled, onChange, onInputChange, options, icon, iconBg } = field;
    const imageValue = validation.values.image;

    const [imageSrc, setImageSrc] = useState(defaultAvatar);

    useEffect(() => {
        if (imageValue) {
            if (typeof imageValue === 'string') {
                if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
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

    const handleImageSelect = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            validation.setFieldValue("image", selectedImage);
        }
    };

    // const dateformate = (e) => {
    //     const selectedDate = new Date(e);
    //     const formattedDate = `${selectedDate.getFullYear()}-${(
    //         "0" +
    //         (selectedDate.getMonth() + 1)
    //     ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;

    //     // Update the form field value directly with the formatted date
    //     validation.setFieldValue(name, formattedDate);
    // };

    const DateTimeFormat = (e) => {
        const updatedStartDate = new Date(e);
        // updatedStartDate.setHours(updatedStartDate.getHours() + 1);
        // selectedNewDate[1] = updatedStartDate.toISOString(); // Update the array with the new end date
        // console.log("selectedNewDate: ", selectedNewDate[0], "updatedEndDate: ", selectedNewDate[1]);

        console.log("e:  ", e)
        validation.setFieldValue(name, updatedStartDate);

        // const updatedEndDate = new Date(selectedNewDate[0]);
        // updatedEndDate.setHours(updatedEndDate.getHours() + 1);
        // selectedNewDate[1] = updatedEndDate.toISOString(); // Update the array with the new end date
        // console.log("selectedNewDate: ", selectedNewDate[0], "updatedEndDate: ", selectedNewDate[1]);

    }

    const renderInputFields = () => {
        switch (type) {
            case 'text':
            case 'tel':
            case 'email':
            case 'social':
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
                            type={type !== 'social' ? type : 'text'}
                            name={name}
                            id={id}
                            placeholder={`Enter ${label}`}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values[name] || ""}
                            invalid={validation.touched[name] && validation.errors[name]}
                        />
                    </div>
                );
            case 'textarea':
                return (
                    <Input
                        type="textarea"
                        name={name}
                        id={id}
                        placeholder={`اكتب ${label}`}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values[name] || ""}
                        invalid={validation.touched[name] && validation.errors[name]}
                    />
                );
            case 'select':
                return (
                    <Select
                        id={id}
                        name={name}

                        type="select"
                        className={className ? className : "form-select"}
                        isSearchable={isSearchable || false}
                        isClearable={isClearable || false}
                        // isDisabled={true}
                        options={options}

                        onChange={onChange}
                        onBlur={validation.handleBlur}
                        value={validation.values[id] || ""}
                        invalid={validation.touched[id] && validation.errors[id]}
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
            case 'select2':
                return (
                    <Select
                        id={id}
                        name={name}
                        classNamePrefix="select"
                        className={className || "form-select"}
                        isSearchable={true}
                        isClearable={true}

                        options={options}
                        onChange={onChange}

                        onBlur={validation.handleBlur}
                        value={options.find(option => option.value === validation.values[name]) || ""}
                    // Ensure you handle 'invalid' prop correctly
                    />
                );
            case 'creatableSelect':
                return (
                    <CreatableSelect
                        id={id}
                        name={name}
                        isSearchable={true}
                        isClearable={true}
                        // no auto complete
                        placeholder={placeholder}
                        options={options}
                        onChange={onChange}
                        onInputChange={onInputChange}

                        onBlur={validation.handleBlur}
                    // value={validation.values[name] || ""}
                    // Ensure you handle 'invalid' prop correctly
                    />
                );

            case 'date':
                return (
                    <Flatpickr
                        name={name}
                        id={id}
                        className="form-control"
                        placeholder={`اختر ${label}`}
                        options={{
                            enableTime: true,
                            dateFormat: "Y-m-d",
                        }}
                        onChange={(e) => DateTimeFormat(e)}
                        value={validation.values.start || ""}
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
                            <FormFeedback type="invalid">
                                {validation.errors[name]}
                            </FormFeedback>
                        )}
                    </div>
                );
            case 'password':
                return (
                    <Input
                        type="password"
                        name={name}
                        id={id}
                        placeholder={`Enter ${label}`}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values[name] || ""}
                        invalid={validation.touched[name] && validation.errors[name]}
                    />
                );
            // ... other cases
            default:
                return null;
        }
    };

    const renderFormStructure = ({ formStructure }) => {
        switch (formStructure) {
            case 'table':
                return (
                    <React.Fragment>
                        {renderInputFields()}
                        {validation.touched[name] && validation.errors[name] && (
                            <FormFeedback type="invalid">
                                {validation.errors[name]}
                            </FormFeedback>
                        )}
                    </React.Fragment>
                );
            default:
                return (
                    <Col lg={colSize} className="mb-3">
                        {!icon &&
                            <Label htmlFor={id} className="form-label">{label}</Label>
                        }
                        {renderInputFields()}
                        {validation.touched[name] && validation.errors[name] && (
                            <FormFeedback type="invalid">
                                {validation.errors[name]}
                            </FormFeedback>
                        )}
                    </Col>

                );
        }
    }

    return (
        <React.Fragment>
            {renderFormStructure({ formStructure })
            }
        </React.Fragment>
    );
};




export default FieldComponent;
