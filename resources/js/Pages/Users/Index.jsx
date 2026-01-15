import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { FaRegUser } from "react-icons/fa6";
import { IoEyeOutline, IoKeyOutline, IoPencilOutline } from "react-icons/io5";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/Table";
import MultiSelectComponent from "@/Components/MultiSelectComponent";
import Pagination from "@/Components/Pagination";
import usePermissions from "@/Hooks/usePermissions";
export default function Index({ auth, UserData, editData, isEditMode, roles }) {
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
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.close();
                        Swal.fire(
                            "Error!",
                            "There was an issue deleting your role.",
                            "error"
                        );
                    },
                });
            }
        });
    };
    const [editClick, setEditClick] = useState(isEditMode);
    const [passwordErrors, setPasswordErrors] = useState({
        confirm_password: null,
    });
    // Initialize form with safe defaults
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
        email: editData?.email || "",
        password: editData?.password || "",
        password_confirmation: "",
        role: ""
    });
    const handleEditClick = (item) => {
        setEditClick(true);
        router.visit(route("users.index", { id: item.id }), {
            preserveState: true,
            only: ["editData", "isEditMode"],
        });
    };

    // Update form data when editData changes
    useEffect(() => {
        if (editClick) {
            setData({
                id: editData?.id || "",
                name: editData?.name || "",
                email: editData?.email || "",
                role: editData?.roles?.map((person) => person.name) || []
            });
        } else {
            reset(); // Reset form for add new
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
                setSidebarState(false);
            },
            onError: () => { },
        });
    };
    // Submit handler
    const submit = (e) => {
        e.preventDefault();
        editData
            ? patch(route("users.update", editData?.id), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
                },
            })
            : post(route("users.store"), {
                onSuccess: () => {
                    reset();
                    setSidebarState(false);
                },
            });
    };
    const { can } = usePermissions();
    const [sidebarState, setSidebarState] = useState(false);
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Users" />
            <div>
                <div className="flex font-semibold items-center leading-tight text-primary text-xl justify-between mb-4">
                    <h2 className="text-primary dark:text-secondary sm:text-[22px] text-[20px] font-semibold capitalize">
                        All Users
                    </h2>
                    <div className="text-primary dark:text-secondary md:text-sm text-xs">
                        Per page {UserData.total}/
                        {UserData.to || UserData.length}
                        {can("users.create") && (
                            <label
                                onClick={(e) => {
                                    setEditClick(false);
                                    setSidebarState(true);
                                }}
                                className="inline-flex items-center ml-4 px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                            >
                                Add User
                            </label>
                        )}
                    </div>
                </div>
                <div className="bg-white p-[20px] rounded dark:bg-primary">
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
                                                    onClick={(e) => {
                                                        handleEditClick(item);
                                                        setSidebarState(true);
                                                    }}
                                                    className="text-primary dark:hover:text-white hover:bg-custgreen transition-all dark:bg-transparent dark:text-secondary dark:border border-gray-400 duration-500 hover:text-white dark:text-custgreen text-[18px] w-[30px] h-[30px] bg-[#f8f8fb] flex items-center justify-center rounded cursor-pointer dark:hover:bg-custgreen dark:hover:border-custgreen"
                                                >
                                                    <IoPencilOutline />
                                                </label>
                                            )}
                                            {can("users.show") && (
                                                <Link
                                                    href={route(
                                                        "users.show",
                                                        item.id
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
                                {editClick === true ? "Edit" : "Add New"} User
                            </h4>
                            <label
                                onClick={(e) => setSidebarState(false)}
                                className="w-[30px] text-custgreen h-[30px] border hover:text-white border-custgreen transition-all duration-500 hover:bg-custgreen rounded-full flex justify-center items-center cursor-pointer"
                            >
                                <MdOutlineClose className="w-4 h-4" />
                            </label>
                        </div>

                        <div className="collapse collapse-arrow border border-custbord mb-4">
                            <input
                                type="radio"
                                name="my-accordion-2"
                                className="!p-[2rem]"
                                defaultChecked
                            />
                            <div className="collapse-title text-primary font-medium text-[15px] border-b flex items-center dark:text-secondary gap-1 py-[12px]">
                                <FaRegUser className="w-[40px] h-[40px] border border-custbord rounded p-[10px] me-[6px]" />
                                User Info
                            </div>
                            <div className="collapse-content">
                                <form
                                    onSubmit={submit}
                                    className="grid grid-cols-1 items-center justify-center px-[15px] py-[20px]"
                                >
                                    <div className="grid grid-cols-12 gap-4 pt-4 items-center text-primary">
                                        <div className="col-span-12">
                                            <InputLabel
                                                htmlFor="name"
                                                value="Name"
                                            />
                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                isFocused
                                                autoComplete="name"
                                                type="text"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        </div>
                                        <div className="col-span-12">
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                autoComplete="username"
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.email}
                                            />
                                        </div>
                                        {!editClick === true && (
                                            <div className="col-span-12">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    className="mt-1 block w-full"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    autoComplete="username"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.password}
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
                                                value={data.role}
                                                onChange={(e) =>
                                                    setData("role", e)
                                                }
                                                options={roles}
                                                className="mt-1 block w-full text-gray-800"
                                                isMulti={true}
                                            />
                                            <InputError
                                                className="mt-2"
                                                message={errors.role}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4">
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
                                            <p className="text-sm text-gray-600">
                                                Add Brand
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {editClick === true && (
                            <div className="collapse collapse-arrow border border-custbord mb-4">
                                <input
                                    type="radio"
                                    name="my-accordion-2"
                                    className="!p-[2rem]"
                                />
                                <div className="collapse-title text-primary font-medium text-[15px] border-b flex items-center dark:text-secondary gap-1 py-[12px]">
                                    <IoKeyOutline className="w-[40px] h-[40px] border border-custbord rounded p-[10px] me-[6px]" />
                                    Change Password
                                </div>
                                <div className="collapse-content">
                                    <form
                                        onSubmit={changePassword}
                                        className="grid grid-cols-1 items-center justify-center px-[15px] py-[20px]"
                                    >
                                        <div className="grid grid-cols-12 gap-4 pt-4 items-center">
                                            <div className="col-span-12">
                                                <InputLabel
                                                    htmlFor="password"
                                                    value="Password"
                                                />
                                                <TextInput
                                                    id="password"
                                                    className="mt-1 block w-full"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    autoComplete="new-password"
                                                    type="password"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.password}
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <InputLabel
                                                    htmlFor="password_confirmation"
                                                    value="Confirm Password"
                                                />
                                                <TextInput
                                                    id="password_confirmation"
                                                    className="mt-1 block w-full"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    autoComplete="new-password"
                                                    type="password"
                                                />
                                                <InputError
                                                    className="mt-2"
                                                    message={
                                                        passwordErrors.password_confirmation
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-12">
                                                <PrimaryButton>
                                                    Change Password
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
