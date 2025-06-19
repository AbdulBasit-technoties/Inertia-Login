import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import usePermissions from "@/Hooks/usePermissions";
import InputError from "@/Components/InputError";
import { MdDelete, MdOutlineClose} from "react-icons/md";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { IoEyeOutline, IoPencilOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import ResetButton from "@/Components/ResetButton";
import PageHeader from "@/Components/PageHeader";
import DateFilter from "@/Components/DateFilter";
import SearchFilter from "@/Components/SearchFilter";

export default function Index({ auth, editData, isEditMode, roles }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("roles.destroy", id), {
                    onSuccess: () =>
                        Swal.fire(
                            "Deleted!",
                            "Your role has been deleted.",
                            "success"
                        ),
                    onError: () =>
                        Swal.fire(
                            "Error!",
                            "There was an issue deleting your role.",
                            "error"
                        ),
                });
            }
        });
    };
    const { can } = usePermissions();
    const [editClick, setEditClick] = useState(isEditMode);
    const {
        data,
        setData,
        post,
        patch,
        progress,
        recentlySuccessful,
        errors,
        reset,
    } = useForm({
        id: editData?.id || "",
        name: editData?.name || "",
    });
    const handleEditClick = (item) => {
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
                },
                onError: () => {},
            });
        } else {
            post(route("roles.store"), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
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
                    quick_range: "",
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
                from_date: "",
                to_date: "",
            },
            preserveState: true,
        });
    };
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Roles" />
            <div className="lg:py-[110px] sm:px-[30px] py-[150px] px-[15px]">
                <PageHeader
                    title="All roles"
                    total={roles.total}
                    perPage={roles.to || roles.data.length}
                    buttonLabel="Add Role"
                    onButtonClick={() => {
                        setEditClick(false);
                        setSidebarState(true);
                    }}
                />
                <div className="bg-white p-[20px] rounded dark:bg-primary">
                    <div className="flex justify-end xl:justify-between relative text-end mb-[20px] gap-4 2xl:gap-0 flex-wrap xl:flex-nowrap items-start">
                        <div className="flex gap-2 md:gap-4 w-full sm:w-auto lg:w-full xl:w-auto flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap">
                            <DateFilter
                                fromDate={fromDate}
                                toDate={toDate}
                                quickRange={quickRange}
                                onFromChange={setFromDate}
                                onToChange={setToDate}
                                onQuickRangeChange={handleQuickRange}
                            />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-3 sm:gap-0 justify-end sm:justify-normal items-center h-auto">
                            <SearchFilter
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onSearch={handleSearch}
                                placeholder="Search by name & email"
                            />
                            <ResetButton routeName="roles.index" />
                        </div>
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Name</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {roles.data.map((item, index) => (
                                <Tr key={item.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>
                                        <div className="flex gap-2">
                                            {can("roles.edit") && (
                                                <div
                                                    className="tooltip"
                                                    data-tip="Edit"
                                                >
                                                    <label
                                                        onClick={(e) => {
                                                            handleEditClick(
                                                                item
                                                            );
                                                            setSidebarState(
                                                                true
                                                            );
                                                        }}
                                                        className="text-primary dark:hover:text-white hover:bg-blue transition-all duration-500 hover:text-white dark:text-blue text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer"
                                                    >
                                                        <IoPencilOutline />
                                                    </label>
                                                </div>
                                            )}
                                            <div
                                                className="tooltip"
                                                data-tip="View"
                                            >
                                                <Link
                                                    href={route(
                                                        "roles.show",
                                                        item.id
                                                    )}
                                                    className="text-primary dark:hover:text-white hover:bg-blue transition-all duration-500 hover:text-white dark:text-blue text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer"
                                                >
                                                    <IoEyeOutline />
                                                </Link>
                                            </div>
                                            <div
                                                className="tooltip"
                                                data-tip="Delete"
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="text-primary dark:hover:text-white hover:bg-blue transition-all duration-500 hover:text-white dark:text-blue text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
                <Pagination meta={roles} />
            </div>
            <div
                className={`${
                    sidebarState === true
                        ? "visible opacity-1"
                        : "hidden opacity-0"
                } z-[50] fixed left-0 top-0 w-[100%] transition-all duration-500 ease overlay-box h-full bg-[#0000006b]`}
            ></div>

            <div
                onClick={(e) => {
                    setSidebarState(false);
                }}
                className={`${
                    sidebarState === true ? "right-0" : "-right-full"
                } fixed top-0 w-[100%] transition-all duration-500 ease z-50 h-full overflow-y-auto`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="side-inner w-[35%] ml-auto h-full"
                >
                    <ul className="bg-white min-h-full p-0 dark:bg-primary">
                        <div className="flex justify-between border-b px-[15px] py-[10px]">
                            <h4 className="text-gray-800 dark:text-secondary font-medium text-[18px]">
                                {editClick === true ? "Edit" : "Add New"} Role
                            </h4>
                            <label
                                onClick={(e) => {
                                    setSidebarState(false);
                                }}
                                className="w-[30px] text-blue h-[30px] border hover:text-white border-blue transition-all duration-500 hover:bg-blue rounded-full flex justify-center items-center cursor-pointer"
                            >
                                <MdOutlineClose className="w-4 h-4" />
                            </label>
                        </div>
                        <form
                            onSubmit={Datasubmit}
                            className="grid grid-cols-1 items-center justify-center px-[15px] py-[20px]"
                        >
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="col-span-12">
                                {progress && (
                                    <progress
                                        value={progress.percentage}
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
                                <PrimaryButton disabled={progress}>
                                    Save
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                ></Transition>
                            </div>
                        </form>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
