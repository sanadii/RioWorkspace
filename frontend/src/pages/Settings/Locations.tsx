import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getClientSearch } from "store/actions";
import { settingsSelector } from "Selectors";

// Form and Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

import { Fields } from "@syncfusion/ej2-react-dropdowns";
import { Row, Col, Label, Form, Input } from "reactstrap";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const { settingOptions } = useSelector(settingsSelector);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      businessName: settingOptions?.businessName || null,
      websiteUrl: settingOptions?.websiteUrl || null,
      contactTelephone: settingOptions?.contactTelephone || null,
      firstName: settingOptions?.firstName || null,
      lastName: settingOptions?.lastName || null,
      businessCategory: settingOptions?.businessCategory || null,
      updateBillingDetails: settingOptions?.updateBillingDetails || false,
      countryCode: settingOptions?.countryCode || null,
      currencyCode: settingOptions?.currencyCode || null,
      timeZoneLocaleId: settingOptions?.timeZoneLocaleId || null,
      dateFormatId: settingOptions?.dateFormatId || null,
      timeFormatId: settingOptions?.timeFormatId || null,
      businessDescription: settingOptions?.businessDescription || null,
      businessLogo: settingOptions?.businessLogo || null,
      twitterAccount: settingOptions?.twitterAccount || null,
      instagramAccount: settingOptions?.instagramAccount || null,
      facebookUrl: settingOptions?.facebookUrl || null,
      // Add more fields here if necessary
    },

    validationSchema: Yup.object({
      businessName: Yup.string().required("Business Name is required"),
      websiteUrl: Yup.string().url("Enter a valid URL").required("Website URL is required"),
      contactTelephone: Yup.string().required("Business phone number is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      businessCategory: Yup.string().required("Business Category is required"),
      updateBillingDetails: Yup.boolean(),
      countryCode: Yup.string().required("Country is required"),
      currencyCode: Yup.string().required("Currency is required"),
      timeZoneLocaleId: Yup.string().required("Time Zone is required"),
      dateFormatId: Yup.string().required("Date Format is required"),
      timeFormatId: Yup.string().required("Time Format is required"),
      businessDescription: Yup.string(),
      businessLogo: Yup.string(),
      twitterAccount: Yup.string().matches(/^@\w+$/, "Enter a valid Twitter handle"),
      instagramAccount: Yup.string().matches(/^@\w+$/, "Enter a valid Instagram handle"),
      facebookUrl: Yup.string().url("Enter a valid Facebook URL"),
      // Add more validation as per your requirement
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const fields = [
    {
      header: "Details",
      subHeader: "Basic information about you and your business.",
      items: [
        {
          id: "BusinessName",
          name: "businessName",
          label: "Business name",
          placeholder: "Your business name",
          type: "text",
        },
        {
          id: "WebsiteUrl",
          name: "websiteUrl",
          label: "Business website",
          type: "url",
          prefixSelect: {
            id: "WebsiteUrlSchema",
            options: ["http://", "https://"],
          },
        },
        {
          id: "ContactTelephone",
          name: "contactTelephone",
          label: "Business phone number",
          placeholder: "Your business phone number",
          type: "tel",
        },
        {
          id: "FirstName",
          name: "firstName",
          label: "Your first name",
          placeholder: "Enter your first name",
          type: "text",
        },
        {
          id: "LastName",
          name: "lastName",
          label: "Your last name",
          placeholder: "Enter your last name",
          type: "text",
        },
        {
          id: "BusinessCategoryId",
          name: "businessCategory",
          label: "Business category",
          type: "select",
          options: [
            /* populate with business categories options */
          ],
        },
        {
          id: "UpdateBillingDetails",
          name: "updateBillingDetails",
          label: "Update billing details",
          type: "checkbox",
          additionalInfo: "Update my Timely billing details with these settings",
        },
      ],
    },

    // Next Section
    {
      header: "Regional settings",
      subHeader: "Specify region specific settings for your business.",
      items: [
        {
          id: "CountryCode",
          name: "countryCode",
          label: "Country",
          type: "select",
          options: [
            /* populate with country options */
          ],
        },
        {
          id: "CurrencyCode",
          name: "currencyCode",
          label: "Currency",
          type: "select",
          options: [
            /* populate with currency options */
          ],
        },
        {
          id: "TimeZoneLocaleId",
          name: "timeZoneLocaleId",
          label: "Time zone",
          type: "select",
          options: [
            /* populate with time zone options */
          ],
        },
        {
          id: "DateFormatId",
          name: "dateFormatId",
          label: "Date format",
          type: "select",
          options: [
            { value: "1", label: "31 Mar 2024" },
            { value: "2", label: "Mar 31, 2024" },
          ],
        },
        {
          id: "TimeFormatId",
          name: "timeFormatId",
          label: "Time format",
          type: "select",
          options: [
            { value: "1", label: "9:04PM" },
            { value: "2", label: "21:04" },
          ],
        },
      ],
    },

    //   Business description
    {
      header: "Business description",
      subHeader:
        "Enter an optional description of your business for use on your mini-website. The use of Scripting tags, and HTML formatting in the business description field is no longer supported by Timely.",
      items: [
        {
          id: "BusinessDescription",
          name: "businessDescription",
          label: "Business Description",
          type: "textarea",
          placeholder: "Describe your business",
          content: "Brazilian Salon",
        },
      ],
    },

    {
      header: "Business logo",
      subHeader: "Upload a logo to appear on your emails, invoices and mini-website.",
      items: [
        {
          id: "BusinessLogo",
          name: "businessLogo",
          type: "image",
          imageUrl:
            "https://app.gettimely.com/azure/timely-images/3d2b731b-55a9-4d4b-9d0a-78413b3eafab.jpg?width=250&height=150&quality=100",
          altText: "Business Logo",
        },
      ],
    },
    {
      header: "Get social!",
      subHeader: "Enter your social networking accounts and we'll help you promote your business.",
      items: [
        {
          id: "TwitterAccount",
          name: "twitterAccount",
          label: "Twitter account",
          prefix: "@",
          type: "text",
          placeholder: "Your Twitter handle",
          value: "RioBrazilSalon",
        },
        {
          id: "InstagramAccount",
          name: "instagramAccount",
          label: "Instagram account",
          prefix: "@",
          type: "text",
          placeholder: "Your Instagram handle",
          value: "RioBrazilSalonkw",
        },
        {
          id: "FacebookUrl",
          name: "facebookUrl",
          label: "Facebook page",
          type: "text",
          placeholder: "Your Facebook page URL",
          value: "http://www.facebook.com/RioBrazilSalon",
        },
      ],
    },
  ];

  return (
    <Form
      className="tablelist-form"
      on={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <div className="t-settings-head affix-top" data-spy="affix" data-offset-top="75">
        <h1>Business details</h1>
        <div className="t-settings-head__actions">
          <button type="submit" className="btn btn-primary btn-padded">
            Save
          </button>
        </div>
        <hr />
      </div>
      {fields.map((field) => (
        <Row>
          <div className="t-sidebar__content">
            <div className="t-settings-head affix-top" data-spy="affix" data-offset-top="75">
              <h1>Locations</h1>
              <div className="t-settings-head__actions">
                <a href="/Setup/Locations/LocationAdd" className="btn btn-primary btn-padded">
                  Add location
                </a>
              </div>
              <hr />
            </div>

            <div className="rg-row">
              <div className="col-md-12 ">
                <ul className="card__list card__list--hidden-child unstyled sortable ui-sortable">
                  <li className="card__list-item">
                    <div className="card card--locations  location-148566" data-id="148566">
                      <div className="card__thumb">
                        <i className="fa fa-home"></i>
                      </div>

                      <div className="card__body">
                        <h3 className="card__title">Rio Brazil Salon</h3>

                        <ul className="name-value-list horizontal-list unbordered">
                          <li className="full-width">
                            <h3>Block 3, Street 2, Building 6, Floor 2, Number 4, Salmiya</h3>
                          </li>
                        </ul>
                      </div>

                      <div className="card__actions">
                        <a
                          href="/Setup/Locations/Location/148566?tab=details"
                          data-output-className="location-148566"
                          className="btn btn-secondary"
                        >
                          Edit
                        </a>

                        <a
                          className="pop btn btn-sm btn-secondary-light"
                          href="javascript:void(0);"
                          data-original-title="Delete this location?"
                          data-content="This location has future appointments or classes and cannot be deleted until these appointments or classes are assigned to another location."
                        >
                          <i className="fa fa-trash-o"></i>
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="new-location card__list-item"></li>
                </ul>
              </div>
            </div>
          </div>{" "}
          {/* <Col lg={4}>
            <h2>{field.header}</h2>
            <p>{field.subHeader}</p>
          </Col>
          <Col lg={8}>
            {field.items.map((item) => (
              <div key={item.id}>
                <FieldComponent formStructure="table" field={item} validation={validation} />
              </div>
            ))}
          </Col> */}
        </Row>
      ))}
      <div className="rg-row">
        <div className="col-md-12">
          <div className="Form-actions text-right">
            <button type="submit" className="btn btn-primary btn-padded">
              Save
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default BusinessDetails;
