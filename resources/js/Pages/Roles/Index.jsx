import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState, useEffect } from "react";
import usePermissions from "@/Hooks/usePermissions";
import InputError from "@/Components/InputError";
import { MdOutlineClose } from "react-icons/md";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoEyeOutline, IoFilter, IoPencilOutline } from "react-icons/io5";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/Table";
import ResetLink from "@/Components/ResetLink";
import SearchInput from "@/Components/SearchInput";
import DateRangeFilter from "@/Components/DateRangeFilter";
import Pagination from "@/Components/Pagination";
import { Drawer } from "@mui/material";
export default function Index({
    auth,
    editData,
    isEditMode,
    roles,
    pagination,
}) {
    const { can } = usePermissions();
    const [editClick, setEditClick] = useState(isEditMode);
    const {
        data,
        setData,
        post,
        patch,
        progress,
        recentlySuccessful,
        processing,
        errors,
        reset,
    } = useForm({
        id: editData?.id || "",
        name: editData?.name || "",
    });
    const [open, setOpen] = useState(false);
    const handleEditClick = (item) => {
        setOpen(!open);
        setEditClick(true);
        router.visit(route("roles.index", { id: item.id }), {
            preserveState: true,
            only: ["editData", "isEditMode"],
        });
    };

    useEffect(() => {
        if (editData && editClick) {
            setData({
                id: editData?.id || "",
                name: editData?.name || "",
            });
        } else {
            reset();
        }
    }, [editData, editClick]);

    // Submit handler
    const Datasubmit = (e) => {
        e.preventDefault();
        if (editData) {
            patch(route("roles.update", editData?.id), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
                    setEditClick(false);
                    setOpen(false);
                },
                onError: () => {},
            });
        } else {
            post(route("roles.store"), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
                    setOpen(false);
                },
                onError: () => {},
            });
        }
    };
    const [sidebarState, setSidebarState] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(route("roles.index", { search: searchQuery }));
    };

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [quickRange, setQuickRange] = useState("");
    useEffect(() => {
        if (fromDate && toDate) {
            router.visit(route("roles.index"), {
                data: {
                    from_date: fromDate,
                    to_date: toDate,
                },
                preserveState: true,
            });
        }
    }, [fromDate, toDate]);
    const handleQuickRange = (value) => {
        setQuickRange(value);
        setFromDate("");
        setToDate("");

        router.visit(route("roles.index"), {
            data: {
                quick_range: value,
            },
            preserveState: true,
        });
    };

    const handlePagination = (value) => {
        router.visit(route("roles.index"), {
            data: {
                pagination: value,
                from_date: fromDate,
                to_date: toDate,
                quick_range: quickRange,
                search: searchQuery,
            },
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Roles" />
            <div>
                <div className="flex items-center justify-between mb-[20px] flex-wrap sm:flex-nowrap">
                    <h2 className="text-custblack text-[22px] dark:text-secondary capitalize">
                        All Roles
                    </h2>
                    <div className="text-primary dark:text-secondary md:text-sm text-xs w-full sm:w-auto text-end">
                        <span className="inline-block font-semibold text-custblack dark:text-secondary">
                            {roles.total > 0
                                ? `Per page ${roles.from} – ${roles.to} / ${roles.total}`
                                : "No records available"}
                        </span>
                        {can("roles.create") && (
                            <label
                                onClick={(e) => {
                                    setEditClick(false);
                                    setOpen(!open);
                                }}
                                className="inline-flex items-center ml-4 px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                            >
                                Add Role
                            </label>
                        )}
                    </div>
                </div>
                <div>
                    <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
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
                                    routeName="roles.index"
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
                    </div>
                    <Table>
                        <Thead>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th>Actions</Th>
                        </Thead>
                        <Tbody>
                            {roles.data.map((item, index) => (
                                <Tr key={item.id}>
                                    <Td>
                                        {(roles.current_page - 1) *
                                            roles.per_page +
                                            (index + 1)}
                                    </Td>
                                    <Td>{item.name}</Td>
                                    <Td>
                                        <div className="flex gap-[10px] items-center">
                                            {can("roles.edit") && (
                                                <div
                                                    className="tooltip"
                                                    data-tip="Edit"
                                                >
                                                    <label
                                                        onClick={(e) => {
                                                            handleEditClick(
                                                                item,
                                                            );
                                                            setSidebarState(
                                                                true,
                                                            );
                                                        }}
                                                        className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                    >
                                                        <IoPencilOutline />
                                                    </label>
                                                </div>
                                            )}
                                            {can("roles.show") && (
                                                <div
                                                    className="tooltip"
                                                    data-tip="View"
                                                >
                                                    <Link
                                                        href={route(
                                                            "roles.show",
                                                            item.id,
                                                        )}
                                                        className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                    >
                                                        <IoEyeOutline />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <Pagination data={roles} />
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
                                {editClick === true ? "Edit" : "Add New"} Role
                            </h4>
                            <label
                                onClick={() => {
                                    setOpen(false);
                                    reset();
                                }}
                                className=" text-secondary transition-all duration-500 cursor-pointer"
                            >
                                <MdOutlineClose className="text-2xl" />
                            </label>
                        </div>
                        <form
                            onSubmit={Datasubmit}
                            className="px-[15px] sm:px-[25px] py-[25px]"
                        >
                            <div className="grid grid-cols-12 gap-5 items-center dark:bg-custdarkbg bg-custbg py-[30px] px-[20px]">
                                <div className="col-span-12">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name || ""}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {!editClick === true && (
                                <div className="flex items-center gap-4 col-span-12 mt-[20px]">
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
                            )}
                        </form>
                    </ul>
                </div>
            </Drawer>
        </AuthenticatedLayout>
    );
}
