import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import { DeleteModal } from "Components/Common";
import SimpleBar from "simplebar-react";

//redux
import { settingsSelector } from "Selectors";

import { useSelector, useDispatch } from "react-redux";

//import action
import { getSettingOptions } from "store/actions";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { FieldComponent } from "Components/Common";

import { Link } from "react-router-dom";

const Settings = () => {
  document.title = "File Manager | Velzon - React Admin & Dashboard Template";

  const { settingOptions } = useSelector(settingsSelector);

  // Map over settingOptions to create a new array with the desired structure
  const formattedOptions = settingOptions.map((option) => ({
    id: option.id,
    name: option.name,
    label: "Staff",
    type: "text",
    value: option.name,
  }));

  const dispatch: any = useDispatch();

  // const [settingOptions, setSettingOptions] = useState<any>(null);

  useEffect(() => {
    dispatch(getSettingOptions());
  }, [dispatch]);

  // useEffect(() => {
  //   setSettingOptions(settingOptions);
  // }, [settingOptions]);

  // const folderToggle = useCallback(() => {
  //   if (modalFolder) {
  //     setModalFolder(false);
  //     setFolder(null);
  //   } else {
  //     setModalFolder(true);
  //   }
  // }, [modalFolder]);

  // // Update Folder
  // const handleFolderClick = useCallback(
  //   (arg: any) => {
  //     const folder: any = arg;

  //     setFolder({
  //       id: folder.id,
  //       folderName: folder.folderName,
  //       folderFile: folder.folderFile,
  //       size: folder.size,
  //     });

  //     setIsEdit(true);
  //     folderToggle();
  //   },
  //   [folderToggle]
  // );

  // // Add Folder
  // const handleFolderClicks = () => {
  //   setFolder("");
  //   setModalFolder(!modalFolder);
  //   setIsEdit(false);
  //   folderToggle();
  // };

  // // Delete Folder
  // const onClickFolderDelete = (folder: any) => {
  //   setFolder(folder);
  //   setDeleteModal(true);
  // };

  // const handleDeleteFolder = () => {
  //   if (deleteAlt) {
  //     if (folder) {
  //       // dispatch(deleteSettingOption(folder.id));
  //       setDeleteModal(false);
  //       setDeleteAlt(false);
  //     }
  //   } else {
  //     if (file) {
  //       // dispatch(onDeleteFile(file.id));
  //       setDeleteModal(false);
  //       sidebarClose("file-detail-show");
  //     }
  //   }
  // };

  // // Files
  // const [file, setFile] = useState<any>(null);
  // const [modalFile, setModalFile] = useState(false);

  // const [fileList, setFileList] = useState(files);

  // useEffect(() => {
  //   // dispatch(getSettingOptions());
  // }, [dispatch]);

  // useEffect(() => {
  //   setFile(files);
  //   setFileList(files);
  // }, [files]);

  // const fileToggle = useCallback(() => {
  //   if (modalFile) {
  //     setModalFile(false);
  //     setFile(null);
  //   } else {
  //     setModalFile(true);
  //   }
  // }, [modalFile]);

  // // Update File
  // const handleFileClick = useCallback(
  //   (arg: any) => {
  //     const file = arg;

  //     setFile({
  //       id: file.id,
  //       fileName: file.fileName,
  //       fileItem: file.fileItem,
  //       size: file.size,
  //     });

  //     setIsEdit(true);
  //     fileToggle();
  //   },
  //   [fileToggle]
  // );

  // // Add File
  // const handleFileClicks = () => {
  //   setFile("");
  //   setModalFile(!modalFile);
  //   setIsEdit(false);
  //   fileToggle();
  // };

  // // Delete File
  // const onClickFileDelete = (file: any) => {
  //   setFile(file);
  //   setDeleteModal(true);
  // };

  // const [sidebarData, setSidebarData] = useState<any>("");

  // const [filterActive, setFilterActive] = useState<any>("");

  // const fileCategory = (e: any, ele: any) => {
  //   setFilterActive(ele);
  //   var folderList = document.getElementById("folder-list") as HTMLElement;
  //   folderList.style.display = "none";
  //   setFileList(files.filter((item: any) => item.fileType === e));
  // };

  // // SideBar Open
  // function sidebarOpen(value: any) {
  //   const element = document.getElementsByTagName("body")[0];
  //   element.classList.add(value);
  // }

  // // SideBar Close
  // function sidebarClose(value: any) {
  //   const element = document.getElementsByTagName("body")[0];
  //   element.classList.remove(value);
  // }

  // useEffect(() => {
  //   sidebarOpen("file-detail-show");
  // }, []);

  // const FavoriteeBtn = (ele: any) => {
  //   if (ele.closest("button").classList.contains("active")) {
  //     ele.closest("button").classList.remove("active");
  //   } else {
  //     ele.closest("button").classList.add("active");
  //   }
  // };

  // const fileSidebar = () => {
  //   var folderOverview = document.getElementById("folder-overview") as HTMLElement;
  //   folderOverview.style.display = "none";
  //   var fileOverview = document.getElementById("file-overview") as HTMLElement;
  //   fileOverview.style.display = "block";
  // };

  // // Folder validation
  // const folderValidation: any = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     folderName: (folder && folder.folderName) || "",
  //     folderFile: (folder && folder.folderFile) || "",
  //     size: (folder && folder.size) || "",
  //   },
  //   validationSchema: Yup.object({
  //     folderName: Yup.string().required("Please Enter Folder Name"),
  //     folderFile: Yup.number().required("Please Enter Files"),
  //     size: Yup.number().required("Please Enter Size"),
  //   }),
  //   onSubmit: (values: any) => {
  //     if (isEdit) {
  //       const updateFolder = {
  //         id: folder ? folder.id : 0,
  //         folderName: values.folderName,
  //         folderFile: values.folderFile,
  //         size: values.size,
  //       };
  //       // save edit Folder
  //       // dispatch(updateSettingOption(updateFolder));
  //       folderValidation.resetForm();
  //     } else {
  //       const newFolder = {
  //         id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
  //         folderName: values["folderName"],
  //         folderFile: values["folderFile"],
  //         size: values["size"],
  //       };
  //       // save new Folder
  //       // dispatch(AddSettingOption(newFolder));
  //       folderValidation.resetForm();
  //     }
  //     folderToggle();
  //   },
  // });

  // const dateFormat = () => {
  //   let d = new Date(),
  //     months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   return (d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear()).toString();
  // };

  // // File validation
  // const fileValidation: any = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     fileName: (file && file.fileName) || "",
  //     fileItem: (file && file.fileItem) || "",
  //     size: (file && file.size) || "",
  //   },
  //   validationSchema: Yup.object({
  //     fileName: Yup.string().required("Please Enter File Name"),
  //   }),
  //   onSubmit: (values) => {
  //     if (isEdit) {
  //       const updateFile = {
  //         id: file ? file.id : 0,
  //         fileName: values.fileName,
  //         fileItem: values.fileItem,
  //         size: values.size,
  //         iconClass: "secondary",
  //         icon: "ri-file-text-fill",
  //         createDate: dateFormat(),
  //         fileType: "Documents",
  //       };
  //       // save edit File
  //       // dispatch(updateSettingOption(updateFile));
  //       fileValidation.resetForm();
  //     } else {
  //       const newFile = {
  //         id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
  //         fileName: values.fileName + ".txt",
  //         fileItem: "0",
  //         icon: "ri-file-text-fill",
  //         iconClass: "secondary",
  //         fileType: "Documents",
  //         size: "0 KB",
  //         createDate: dateFormat(),
  //       };
  //       // save new File
  //       // dispatch(onAddNewFile(newFile));
  //       fileValidation.resetForm();
  //     }
  //     fileToggle();
  //   },
  // });

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="file-manager-sidebar border">
              <div className="p-3 d-flex flex-column h-100">
                <div className="mb-3">
                  <h5 className="mb-0 fw-semibold">Business details</h5>
                </div>
                <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
                  <ul className="list-unstyled file-manager-menu">
                    <li>
                      <a
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="true"
                        aria-controls="collapseExample"
                      >
                        <i className="ri-folder-2-line align-bottom me-2"></i>{" "}
                        <span className="file-list-link">My Drive</span>
                      </a>
                      <div className="collapse show" id="collapseExample">
                        <ul className="sub-menu list-unstyled">
                          <li>
                            <a href="#!">Assets</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </SimpleBar>
              </div>
            </div>

            <div className="file-manager-content bg-transparent w-100 p-3 py-0 border">
              <div className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                <div id="folder-list" className="mb-2">
                  <Row className="justify-content-beetwen g-2 mb-3">
                    <Col>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-2 d-block d-lg-none">
                          <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn">
                            <i className="ri-menu-2-fill align-bottom"></i>
                          </button>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-16 mb-0">Folders</h5>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="d-flex gap-2 align-items-start">
                        <select className="form-control" name="choices-single-default" id="file-type">
                          <option value="">File Type</option>
                          <option value="All" defaultValue="">
                            All
                          </option>
                          <option value="Video">Video</option>
                          <option value="Images">Images</option>
                          <option value="Music">Music</option>
                          <option value="Documents">Documents</option>
                        </select>

                        <button
                          className="btn btn-primary text-nowrap create-folder-modal flex-shrink-0"
                          // onClick={() => handleFolderClicks()}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Create Folders
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <Row id="folderlist-data">
                    {formattedOptions.map((option) => (
                      <div key={option.id}>
                        <label>{option.label}: </label>
                        <input type={option.type} value={option.value} />
                      </div>
                    ))}
                  </Row>
                </div>
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">
                      Recent File
                    </h5>
                    <div className="flex-shrink-0">
                      {/* <button className="btn btn-primary createFile-modal" onClick={() => handleFileClicks()}>
                        <i className="ri-add-line align-bottom me-1"></i> Create File
                      </button> */}
                    </div>
                  </div>

                  <ul id="pagination" className="pagination pagination-lg"></ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
