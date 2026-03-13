import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { MdAdd, MdDelete, MdOutlineClose, MdRemove } from "react-icons/md";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { IoEyeOutline, IoFilter, IoPencilOutline } from "react-icons/io5";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect, useRef } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/Table";
import MultiSelectComponent from "@/Components/MultiSelectComponent";
import Pagination from "@/Components/Pagination";
import usePermissions from "@/Hooks/usePermissions";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Drawer,
    Typography,
} from "@mui/material";
import SearchInput from "@/Components/SearchInput";
import ResetLink from "@/Components/ResetLink";
import DateRangeFilter from "@/Components/DateRangeFilter";
import { HiChevronDoubleDown } from "react-icons/hi";
import SelectComponent from "@/Components/SelectComponent";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
export default function Index({
    auth,
    UserData,
    editData,
    isEditMode,
    roles,
    pagination,
    from,
    to,
    range,
    search,
}) {
    const handleDelete = (id) => {
        const swalInstance = Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#15aba2",
            cancelButtonColor: "#15aba2",
            confirmButtonText: "Yes, delete it!",
        });

        swalInstance.then((result) => {
            if (result.isConfirmed) {
                router.delete(route("users.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "Your order has been deleted.",
                            "success",
                        );
                    },
                    onError: () => {
                        Swal.close();
                        Swal.fire(
                            "Error!",
                            "There was an issue deleting your role.",
                            "error",
                        );
                    },
                });
            }
        });
    };
    const [open, setOpen] = useState(false);
    const [editClick, setEditClick] = useState(isEditMode);
    const [passwordErrors, setPasswordErrors] = useState({
        confirm_password: null,
    });
    const { data, setData, post, patch, progress, processing, errors, reset } =
        useForm({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "",
        });
    const handleEditClick = (item) => {
        setOpen(!open);
        setEditClick(true);
        router.visit(route("users.index", { id: item.id }), {
            preserveState: true,
            only: ["editData", "isEditMode"],
        });
    };

    const hasSetEditData = useRef(false);

    useEffect(() => {
        if (editData && editClick && !hasSetEditData.current) {
            setData({
                id: editData?.id || "",
                name: editData?.name || "",
                email: editData?.email || "",
                role: editData?.roles?.map((person) => person.name) || [],
            });
            hasSetEditData.current = true;
        } else {
            hasSetEditData.current = false;
        }
    }, [editData, editClick]);

    const changePassword = (e) => {
        e.preventDefault();
        if (data.password !== data.password_confirmation) {
            setPasswordErrors({
                password_confirmation: "Passwords do not match",
            });
            return;
        } else {
            setPasswordErrors({ password_confirmation: null });
        }

        patch(route("users.password", editData.id), {
            password: data.password,
            password_confirmation: data.password_confirmation,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: () => {},
        });
    };
    const [validationErrors, setValidationErrors] = useState(errors || {});
    const Datasubmit = (e) => {
        e.preventDefault();
        editData && editClick
            ? patch(route("users.update", editData?.id), {
                  onSuccess: () => {
                      reset();
                      setOpen(false);
                      hasSetEditData.current = true;
                      setEditClick(false);
                      setValidationErrors({});
                  },
                  onError: (errors) => {
                      setValidationErrors(errors);
                  },
              })
            : post(route("users.store"), {
                  onSuccess: () => {
                      reset();
                      setOpen(false);
                      setValidationErrors({});
                  },
                  onError: (errors) => {
                      setValidationErrors(errors);
                  },
              });
    };
    const { can } = usePermissions();
    const [expanded, setExpanded] = useState("panel1");
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [searchQuery, setSearchQuery] = useState(search);

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(
            route(
                "users.index",
                {
                    from_date: fromDate,
                    to_date: toDate,
                    quick_range: quickRange,
                    pagination: pagination,
                    search: searchQuery,
                },
                {
                    preserveState: true,
                    replace: true,
                    only: ["search", "UserData"],
                },
            ),
        );
    };

    const [fromDate, setFromDate] = useState(from);
    const [toDate, setToDate] = useState(to);
    const [quickRange, setQuickRange] = useState(range);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (fromDate && toDate) {
            router.visit(route("users.index"), {
                data: {
                    from_date: fromDate,
                    to_date: toDate,
                    pagination: pagination,
                    search: searchQuery,
                },
                preserveState: true,
                replace: true,
                only: ["from", "to", "UserData"],
            });
        }
    }, [fromDate, toDate]);
    const handleQuickRange = (value) => {
        setQuickRange(value);
        setFromDate("");
        setToDate("");

        router.visit(route("users.index"), {
            data: {
                quick_range: value,
                pagination: pagination,
                search: searchQuery,
            },
            preserveState: true,
            replace: true,
            only: ["range", "UserData"],
        });
    };

    const handlePagination = (value) => {
        router.visit(route("users.index"), {
            data: {
                from_date: fromDate,
                to_date: toDate,
                quick_range: quickRange,
                pagination: value,
                search: searchQuery,
            },
            preserveScroll: true,
            preserveState: true,
            replace: true,
            only: ["pagination", "UserData"],
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Users" />
            <div>
                <div className="flex items-center justify-between mb-[20px] flex-wrap sm:flex-nowrap">
                    <h2 className="text-custblack text-[22px] dark:text-secondary capitalize">
                        All Users
                    </h2>
                    <div className="text-primary dark:text-secondary md:text-sm text-xs w-full sm:w-auto text-end">
                        <span className="inline-block font-semibold text-custblack dark:text-secondary">
                            {UserData.total > 0
                                ? `Per page ${UserData.from} – ${UserData.to} / ${UserData.total}`
                                : "No records available"}
                        </span>
                        {can("users.create") && (
                            <label
                                onClick={(e) => {
                                    setEditClick(false);
                                    setOpen(!open);
                                }}
                                className="inline-flex items-center ml-4 px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                            >
                                Add User
                            </label>
                        )}
                    </div>
                </div>
                <div>
                    <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[40px] relative rounded">
                        <div className="mb-[20px] flex flex-wrap sm:flex-nowrap justify-between gap-[10px] sm:gap-0">
                            <h3 className="text-custblack text-[20px] md:text-[22px] dark:text-secondary capitalize flex items-center gap-[10px]">
                                <IoFilter />
                                Filters
                            </h3>
                            <div className="flex flex-wrap items-center gap-[10px] justify-end sm:justify-start">
                                <SearchInput
                                    placeholder="Search by name & email"
                                    value={searchQuery}
                                    onChange={(val) => setSearchQuery(val)}
                                    onSearch={handleSearch}
                                />

                                <ResetLink
                                    routeName="users.index"
                                    label="Reset Filters"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-[10px] mb-[10px]">
                            <DateRangeFilter
                                fromDate={fromDate}
                                toDate={toDate}
                                quickRange={quickRange}
                                setFromDate={setFromDate}
                                setToDate={setToDate}
                                handleQuickRange={handleQuickRange}
                                handlePagination={handlePagination}
                                pagination={pagination}
                                dayColumns="lg:!col-span-6"
                            />
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease
                            ${showAdvanced ? "max-h-[1000px] opacity-100 mt-[10px]" : "max-h-0 opacity-0"}`}
                        >
                            <div className="grid grid-cols-12 gap-[10px]">
                                <div className="text-left col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
                                    <span className="block text-[13px] sm:text-[14px] mb-[5px] font-medium text-custblack dark:text-secondary">
                                        Status
                                    </span>
                                    <SelectComponent
                                        id="status"
                                        name="status"
                                        value={status}
                                        onChange={(e) => {
                                            router.get(
                                                route("users.index"),
                                                {
                                                    from_date: fromDate,
                                                    to_date: toDate,
                                                    quick_range: quickRange,
                                                    search: searchQuery,
                                                    pagination: pagination,
                                                    status: e,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                    only: ["status", "users"],
                                                },
                                            );
                                        }}
                                        placeholder="Status"
                                        options={[
                                            {
                                                value: "active",
                                                label: "Active",
                                            },
                                            {
                                                value: "inactive",
                                                label: "Inactive",
                                            },
                                        ]}
                                        className="block w-full"
                                        darkBgClass="dark:!bg-custdarkbg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="cursor-pointer absolute right-[0px] top-[100%] flex items-center bg-custgreen rounded-bl-[7px] rounded-br-[7px] text-secondary px-[8px] py-[5px] gap-[6px]"
                        >
                            <span className="text-secondary text-[12px] transition-all duration-500 ease">
                                More Filters
                            </span>
                            <div className="flex justify-center transition-all duration-500">
                                <HiChevronDoubleDown
                                    className={`transition-all duration-500 text-[16px]
                                    ${showAdvanced ? "rotate-180" : "rotate-0"}`}
                                />
                            </div>
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Actions</Th>
                        </Thead>
                        <Tbody>
                            {UserData.data.map((item, index) => (
                                <Tr key={item.id}>
                                    <Td>
                                        {(UserData.current_page - 1) *
                                            UserData.per_page +
                                            (index + 1)}
                                    </Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>
                                        {item.roles.map((role, roleIndex) => (
                                            <span
                                                key={roleIndex}
                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1"
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </Td>
                                    <Td>
                                        <div className="flex gap-[10px] items-center">
                                            {can("users.edit") && (
                                                <label
                                                    onClick={(e) =>
                                                        handleEditClick(item)
                                                    }
                                                    className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                >
                                                    <IoPencilOutline />
                                                </label>
                                            )}
                                            {can("users.show") && (
                                                <Link
                                                    href={route(
                                                        "users.show",
                                                        item.id,
                                                    )}
                                                    className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                >
                                                    <IoEyeOutline />
                                                </Link>
                                            )}
                                            {roles.includes("Admin") && (
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                >
                                                    <MdDelete />
                                                </button>
                                            )}
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <Pagination data={UserData} />
            </div>
            <Drawer
                anchor="right"
                open={open}
                onClose={(event, reason) => {
                    if (reason === "backdropClick") return;
                    setOpen(false);
                }}
                PaperProps={{
                    className:
                        "custom-drawer-our md:rounded-s-[14px] !shadow-none",
                }}
                transitionDuration={{
                    enter: 700,
                    exit: 400,
                }}
                BackdropProps={{
                    className: "!bg-black/30",
                }}
            >
                <div className="side-inner 2xl:w-[881px] xl:w-[700px] lg:w-[700px] w-full ml-auto h-full">
                    <ul className="bg-white dark:bg-primary min-h-full md:rounded-s-xl p-0 ">
                        <div className="bg-custgreen flex justify-between items-center border-b dark:border-transparent px-[20px] py-[12px]">
                            <h4 className="text-secondary font-semibold text-[18px] sm:text-[17px]">
                                {editClick === true ? "Edit" : "Add New"} User
                            </h4>
                            <label
                                onClick={() => {
                                    setOpen(false);
                                    reset();
                                    hasSetEditData.current = false;
                                    setValidationErrors({});
                                }}
                                className=" text-secondary transition-all duration-500 cursor-pointer"
                            >
                                <MdOutlineClose className="text-2xl" />
                            </label>
                        </div>
                        <form
                            onSubmit={Datasubmit}
                            className="grid grid-cols-1 items-center justify-center px-[15px] sm:px-[25px] py-[25px]"
                        >
                            <div className="col-span-12">
                                <div className="w-full ">
                                    <Accordion
                                        expanded={expanded === "panel1"}
                                        onChange={handleChange("panel1")}
                                        className=" border border-[#e5e7eb] dark:border-transparent dark:bg-transparent transition-all duration-500 !rounded-xl !mb-[20px] !overflow-unset !shadow-none"
                                        sx={{
                                            "& .MuiAccordionDetails-root": {
                                                padding: "30px 20px",
                                                backgroundColor: "#F6F6F6",
                                                borderBottomRightRadius: "12px",
                                                borderBottomLeftRadius: "12px",
                                            },
                                        }}
                                    >
                                        <AccordionSummary
                                            className={`
                                                    transition-all duration-500 !min-h-12 !rounded-t-xl
                                                ${expanded === "panel1" ? "!bg-custgreen" : "!bg-custbg dark:!bg-custdarkbg"}
                                                `}
                                            sx={{
                                                "& .MuiAccordionSummary-content":
                                                    {
                                                        margin: 0,
                                                    },
                                                "& .MuiAccordionSummary-content.Mui-expanded":
                                                    {
                                                        margin: 0,
                                                    },
                                                "& .MuiCollapse-root": {
                                                    backgroundColor:
                                                        "#000 !important",
                                                    padding: "16px",
                                                },
                                                "& .MuiCollapse-entered": {
                                                    borderTop:
                                                        "1px solid #e5e7eb",
                                                },
                                            }}
                                        >
                                            <Typography
                                                component="div"
                                                className="flex justify-between w-full cust-font-inherit items-center"
                                            >
                                                <span
                                                    className={`font-semibold text-[15px] transition-colors
                                                        ${expanded === "panel1" ? "text-white" : "text-custblack dark:text-secondary"}
                                                        `}
                                                >
                                                    User Information
                                                </span>

                                                <span
                                                    className={`transition-colors flex items-center
                                                        ${expanded === "panel1" ? "text-white" : "text-custblack dark:text-secondary"}
                                                    `}
                                                >
                                                    {expanded === "panel1" ? (
                                                        <MdRemove size={20} />
                                                    ) : (
                                                        <MdAdd size={20} />
                                                    )}
                                                </span>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className="dark:!bg-custdarkbg">
                                            <Typography
                                                component="div"
                                                className="cust-font-inherit"
                                            >
                                                <div className="grid grid-cols-12 gap-4 items-center text-primary">
                                                    <div className="col-span-12">
                                                        <InputLabel
                                                            htmlFor="name"
                                                            value="Name"
                                                        />
                                                        <TextInput
                                                            id="name"
                                                            name="name"
                                                            className="mt-1 block w-full"
                                                            value={
                                                                data.name || ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "name",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            isFocused
                                                            autoComplete="name"
                                                            type="text"
                                                        />
                                                        <InputError
                                                            className="mt-2"
                                                            message={
                                                                validationErrors.name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-span-12">
                                                        <InputLabel
                                                            htmlFor="email"
                                                            value="Email"
                                                        />
                                                        <TextInput
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            className="mt-1 block w-full"
                                                            value={
                                                                data.email || ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                            autoComplete="username"
                                                        />
                                                        <InputError
                                                            className="mt-2"
                                                            message={
                                                                validationErrors.email
                                                            }
                                                        />
                                                    </div>
                                                    {!editClick === true && (
                                                        <div className="col-span-12">
                                                            <InputLabel
                                                                htmlFor="password"
                                                                value="Password"
                                                            />
                                                            <div className="relative">
                                                                <TextInput
                                                                    id="password"
                                                                    name="password"
                                                                    type={
                                                                        showPassword
                                                                            ? "text"
                                                                            : "password"
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    value={
                                                                        data.password ||
                                                                        ""
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "password",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    autoComplete="username"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            !showPassword,
                                                                        )
                                                                    }
                                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                                                                >
                                                                    {showPassword ? (
                                                                        <FaRegEye
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <FaRegEyeSlash
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <InputError
                                                                className="mt-2"
                                                                message={
                                                                    validationErrors.password
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="col-span-12">
                                                        <InputLabel
                                                            htmlFor="role"
                                                            value="Roles"
                                                        />
                                                        <MultiSelectComponent
                                                            id="role"
                                                            name="role"
                                                            value={
                                                                data.role || ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "role",
                                                                    e,
                                                                )
                                                            }
                                                            options={roles}
                                                            className="mt-1 block w-full text-gray-800"
                                                            isMulti={true}
                                                        />
                                                        <InputError
                                                            className="mt-2"
                                                            message={
                                                                validationErrors.role
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 col-span-12">
                                <PrimaryButton
                                    disabled={processing || progress}
                                >
                                    {processing ? "Saving..." : "Save"}
                                </PrimaryButton>
                                {progress && (
                                    <progress
                                        className="progress-primary"
                                        value={progress.percentage}
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>
                        </form>

                        {editClick === true && (
                            <form
                                onSubmit={changePassword}
                                className="grid grid-cols-1 items-center justify-center px-[15px] sm:px-[25px] py-[25px]"
                            >
                                <div className="col-span-12">
                                    <div className="w-full ">
                                        <Accordion
                                            expanded={expanded === "panel2"}
                                            onChange={handleChange("panel2")}
                                            className=" border border-[#e5e7eb] dark:border-transparent dark:bg-transparent transition-all duration-500 !rounded-xl !mb-[20px] !overflow-unset !shadow-none"
                                            sx={{
                                                "& .MuiAccordionDetails-root": {
                                                    padding: "30px 20px",
                                                    backgroundColor: "#F6F6F6",
                                                    borderBottomRightRadius:
                                                        "12px",
                                                    borderBottomLeftRadius:
                                                        "12px",
                                                },
                                            }}
                                        >
                                            <AccordionSummary
                                                className={`
                                                        transition-all duration-500 !min-h-12 !rounded-t-xl
                                                    ${expanded === "panel2" ? "!bg-custgreen" : "!bg-custbg dark:!bg-custdarkbg"}
                                                    `}
                                                sx={{
                                                    "& .MuiAccordionSummary-content":
                                                        {
                                                            margin: 0,
                                                        },
                                                    "& .MuiAccordionSummary-content.Mui-expanded":
                                                        {
                                                            margin: 0,
                                                        },
                                                    "& .MuiCollapse-root": {
                                                        backgroundColor:
                                                            "#000 !important",
                                                        padding: "16px",
                                                    },
                                                    "& .MuiCollapse-entered": {
                                                        borderTop:
                                                            "1px solid #e5e7eb",
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    component="div"
                                                    className="flex justify-between w-full cust-font-inherit items-center"
                                                >
                                                    <span
                                                        className={`font-semibold text-[15px] transition-colors
                                                            ${expanded === "panel2" ? "text-white" : "text-custblack dark:text-secondary"}
                                                            `}
                                                    >
                                                        Change Password
                                                    </span>

                                                    <span
                                                        className={`transition-colors flex items-center
                                                            ${expanded === "panel2" ? "text-white" : "text-custblack dark:text-secondary"}
                                                        `}
                                                    >
                                                        {expanded ===
                                                        "panel2" ? (
                                                            <MdRemove
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <MdAdd size={20} />
                                                        )}
                                                    </span>
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className="dark:!bg-custdarkbg">
                                                <Typography
                                                    component="div"
                                                    className="cust-font-inherit"
                                                >
                                                    <div className="grid grid-cols-12 gap-4 pt-4 items-center">
                                                        <div className="col-span-12">
                                                            <InputLabel
                                                                htmlFor="password"
                                                                value="Password"
                                                            />
                                                            <div className="relative">
                                                                <TextInput
                                                                    id="password"
                                                                    className="mt-1 block w-full"
                                                                    value={
                                                                        data.password
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "password",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    required
                                                                    autoComplete="new-password"
                                                                    type={
                                                                        showPassword
                                                                            ? "text"
                                                                            : "password"
                                                                    }
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            !showPassword,
                                                                        )
                                                                    }
                                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                                                                >
                                                                    {showPassword ? (
                                                                        <FaRegEye
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <FaRegEyeSlash
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <InputError
                                                                className="mt-2"
                                                                message={
                                                                    errors.password
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-span-12">
                                                            <InputLabel
                                                                htmlFor="password_confirmation"
                                                                value="Confirm Password"
                                                            />
                                                            <div className="relative">
                                                                <TextInput
                                                                    id="password_confirmation"
                                                                    className="mt-1 block w-full"
                                                                    value={
                                                                        data.password_confirmation
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "password_confirmation",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    required
                                                                    autoComplete="new-password"
                                                                    type={
                                                                        showConfirmPassword
                                                                            ? "text"
                                                                            : "password"
                                                                    }
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setShowConfirmPassword(
                                                                            !showConfirmPassword,
                                                                        )
                                                                    }
                                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                                                                >
                                                                    {showConfirmPassword ? (
                                                                        <FaRegEye
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <FaRegEyeSlash
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <InputError
                                                                className="mt-2"
                                                                message={
                                                                    passwordErrors.password_confirmation
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 col-span-12">
                                    <PrimaryButton
                                        disabled={processing || progress}
                                    >
                                        {processing ? "Saving..." : "Save"}
                                    </PrimaryButton>
                                    {progress && (
                                        <progress
                                            className="progress-primary"
                                            value={progress.percentage}
                                            max="100"
                                        >
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                </div>
                            </form>
                        )}
                    </ul>
                </div>
            </Drawer>
        </AuthenticatedLayout>
    );
}
