import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { useRef, useState } from "react";
import usePermissions from "@/Hooks/usePermissions";
import InputError from "@/Components/InputError";
import {
    MdOutlineClose,
    MdRefresh,
} from "react-icons/md";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import {
    IoEyeOutline,
    IoPencilOutline,
} from "react-icons/io5";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/Table";
import ResetLink from "@/Components/ResetLink";
import SearchInput from "@/Components/SearchInput";
import DateRangeFilter from "@/Components/DateRangeFilter";
import Pagination from "@/Components/Pagination";
export default function Index({ auth, editData, isEditMode, roles, pagination }) {
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
                onError: () => { },
            });
        } else {
            post(route("roles.store"), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
                },
                onError: () => { },
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
            <div >
                <div className="flex font-semibold items-center leading-tight focus:ring-black text-primary text-xl justify-between mb-4">
                    <h2 className="text-primary dark:text-secondary sm:text-[22px] text-[20px] font-semibold capitalize">
                        All roles
                    </h2>
                    <div className="text-primary dark:text-secondary md:text-sm text-xs">
                        Per page {roles.total}/
                        {roles.to || roles.length}
                        {can("roles.create") && (
                            <label
                                onClick={(e) => {
                                    setEditClick(false);
                                    setSidebarState(true);
                                }}
                                className="inline-flex items-center ml-4 px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                            >
                                Add Role
                            </label>
                        )}
                    </div>
                </div>
                <div className="bg-white p-[20px] rounded dark:bg-primary">
                    <div className="flex justify-end xl:justify-between relative text-end mb-[20px] gap-4 2xl:gap-0 flex-wrap xl:flex-nowrap items-start">
                        <div className="flex justify-end gap-2 md:gap-4 w-full sm:w-auto lg:w-full xl:w-auto flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap">
                            <DateRangeFilter
                                fromDate={fromDate}
                                toDate={toDate}
                                quickRange={quickRange}
                                setFromDate={setFromDate}
                                setToDate={setToDate}
                                handleQuickRange={handleQuickRange}
                                handlePagination={handlePagination}
                                pagination={pagination}
                            />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-3 sm:gap-0 justify-end sm:justify-normal items-center h-auto">
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
                    <Table>
                        <Thead>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th>
                                Actions
                            </Th>
                        </Thead>
                        <Tbody>
                            {roles.data.map((item, index) => (
                                <Tr
                                    key={item.id}
                                >
                                    <Td>
                                        {(roles.current_page - 1) *
                                            roles.per_page +
                                            (index + 1)}
                                    </Td>
                                    <Td>
                                        {item.name}
                                    </Td>
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
                                                                item
                                                            );
                                                            setSidebarState(
                                                                true
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
                                                            item.id
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
            <div
                className={`${sidebarState === true
                    ? "visible opacity-1"
                    : "hidden opacity-0"
                    } z-[70] fixed left-0 top-0 w-[100%] transition-all duration-500 ease overlay-box h-full bg-[#0000006b]`}
            ></div>

            <div
                className={`${sidebarState === true ? "right-0" : "-right-full"
                    } fixed top-0 w-[100%] transition-all duration-500 ease z-[80] h-full overflow-y-auto`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="side-inner 2xl:w-[35%] xl:w-[45%] lg:w-[50%] sm:w-[75%] w-[100%] ml-auto h-full"
                >
                    <ul className="bg-white min-h-full p-0 dark:bg-primary">
                        <div className="flex justify-between border-b px-[15px] py-[10px]">
                            <h4 className="text-gray-800 dark:text-secondary font-medium text-[18px]">
                                {editClick === true ? "Edit" : "Add New"}{" "}
                                Role
                            </h4>
                            <label
                                onClick={(e) => {
                                    setSidebarState(false)
                                }}
                                className="w-[30px] text-custgreen h-[30px] border hover:text-white border-custgreen transition-all duration-500 hover:bg-custgreen rounded-full flex justify-center items-center cursor-pointer"
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
                            {!editClick === true && (
                                <div className="flex items-center gap-4">
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
                                    >
                                    </Transition>
                                </div>
                            )}
                        </form>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
