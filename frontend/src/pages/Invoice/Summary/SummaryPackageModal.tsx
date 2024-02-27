// import React, { useState } from "react";
// import { Modal, Form, ModalHeader, ModalBody, Button } from "reactstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { FormFields } from "Components/Common";
// import { Package, SummaryPackageModalProps } from "../../../interfaces/InvoiceInterfaces"; // Adjust the path as necessary

// const SummaryPackageModal: React.FC<SummaryPackageModalProps> = ({
//   modal,
//   setModal,
//   toggle,
//   selectedPackage,
//   packageList,
//   staff,
//   setPackageList,
//   selectedIndex,
//   discountOptions,
// }) => {
//   const bookableStaff = staff.filter((staffMember) => staffMember.bookable);

//   const handleRemovePackage = () => {
//     if (selectedIndex !== null) {
//       const updatedPackageList = [...packageList];
//       updatedPackageList.splice(selectedIndex, 1);
//       setPackageList(updatedPackageList);
//     }
//     setModal(false);
//   };

//   console.log("selectedIndex: ", selectedIndex)
//   const validation = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       id: selectedPackage?.id || null,
//       package: selectedPackage?.package || null,
//       name: selectedPackage?.name || "",
//       duration: selectedPackage?.duration || null,
//       staff: selectedPackage?.staff || null,
//       price: selectedPackage?.price || 0,
//       discount: selectedPackage?.discount || 0,
//     },
//     validationSchema: Yup.object({
//       staff: Yup.number().integer("Staff must be an integer").nullable().required("Staff is required"),
//       price: Yup.number().positive("Price must be a positive number").nullable().required("Price is required"),
//     }),
//     onSubmit: (values) => {
//       const updatedPackage = {
//         id: values.id,
//         package: values.package,
//         name: values.name,
//         staff: values.staff,
//         price: parseFloat(values.price),
//         discount: values.discount,
//       };

//       if (selectedIndex !== null) {
//         const updatedPackageList = [...packageList];
//         updatedPackageList[selectedIndex] = updatedPackage;
//         setPackageList(updatedPackageList);
//       } else {
//         setPackageList([...packageList, updatedPackage]);
//       }

//       validation.resetForm();
//       toggle();
//     },
//   });

//   const fields = [
//     {
//       id: "price-field",
//       name: "price",
//       label: "Price",
//       type: "number",
//       inputGroupText: "KD",
//     },
//     {
//       id: "staff-field",
//       name: "staff",
//       label: "Staff",
//       type: "select",
//       options: bookableStaff.map((item) => ({
//         id: item.id, // This should already be a number
//         label: item.name,
//         value: item.id.toString(), // Convert to string if necessary
//         image: item.image,
//       })),
//     },
//     {
//       id: "discount-field",
//       name: "discount",
//       label: "Discount",
//       type: "select",
//       options: discountOptions.map((item) => ({
//         id: item.id,
//         label: item.name,
//         value: item.value.toString(),
//       })),
//     },
//   ];

//   return (
//     <Modal id="showModal" size="md" className="sale__modal" isOpen={modal} toggle={toggle} centered>
//       <div className="sale__modal-head">{selectedPackage?.name}</div>
//       <div className="sale__modal-body sale__modal-body--grey sale__edit-line-item">
//         <Form
//           className="tablelist-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             validation.handleSubmit();
//             return false;
//           }}
//         >
//           {fields.map((field) => (
//             <FormFields key={field.id} field={field} validation={validation} />
//           ))}

//           <div className="hstack flex-wrap gap-2">
//             <button
//               type="submit"
//               className="btn-primary-charcoal btn sale__button button-module_btn-width-fit__Q4Slu button-module_btn-primary-charcoal__2P0M6"
//               id="add-btn"
//             >
//               Update
//             </button>
//             <button className="sale__button-remove" onClick={handleRemovePackage}>
//               Remove
//             </button>
//             {/* <Button type="submit" className="btn btn-danger" id="add-btn">
//               Delete
//             </Button> */}
//           </div>
//         </Form>
//       </div>
//     </Modal>
//   );
// };

// export default SummaryPackageModal;
