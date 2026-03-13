import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SidebarLink from "@/Components/SidebarLink";
import { ToastContainer, toast } from "react-toastify";
import { Link, router, usePage } from "@inertiajs/react";
import usePermissions from "@/Hooks/usePermissions";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown, FaCriticalRole, FaUsers } from "react-icons/fa6";
import {
    IoNotificationsOutline,
    IoSettingsOutline,
    IoSpeedometerOutline,
} from "react-icons/io5";
import { MdOutlineMenuOpen } from "react-icons/md";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
export default function Authenticated({ auth, children }) {
    const { flash } = usePage().props;
    const [classAdd, setClassAdd] = useState(window.innerWidth >= 1280);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setClassAdd(true);
            } else {
                setClassAdd(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [isSubNavOpen, setSubNavOpen] = useState(null);
    const { can } = usePermissions();
    const toggleSubNav = (txt) => {
        setSubNavOpen(isSubNavOpen === txt ? null : txt);
    };
    useEffect(() => {
        if (flash && flash.message) {
            toast.success(flash.message);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    const roles = auth.user.roles.map((role) => role.name);
    const toggleClass = () => {
        setClassAdd((prev) => !prev);
    };
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        root.classList.add("transition-all", "duration-500");
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);
    const menuRef = useRef(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const dropdownRef = useRef(null);
    const [notifications, setNotifications] = useState(
        usePage().props.notification || [],
    );
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        }

        if (showNotifications) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications]);

    useEffect(() => {
        if (!window.Echo || !auth?.user) return;

        const channel = window.Echo.private(
            `App.Models.User.${auth?.user?.id}`,
        );
        channel.listen(".main.notification", (e) => {
            const notifications = e.notifications || [];
            const messages = e.messages || [];

            notifications.forEach((notif, index) => {
                const formatted = {
                    ...notif,
                    created_at: notif.created_at || new Date().toISOString(),
                    receiver: notif.receiver || { photo_attached: null },
                    id: notif.id || Math.random().toString(36).substr(2, 9),
                    status: notif.status || "unread",
                };

                setNotifications((prev) => [formatted, ...prev]);

                toast.info(messages[index] || formatted.message);
            });
        });

        return () => {
            channel.stopListening(".main.notification");
            window.Echo.leave(`App.Models.User.${auth.user.id}`);
        };
    }, []);

    const handleClearAll = () => {
        const ids = notifications.map((n) => n.id);

        Swal.fire({
            title: "Are you sure?",
            text: "This will mark all notifications as read.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#15aba2", // Blue
            cancelButtonColor: "#15aba2", // Red
            confirmButtonText: "Yes, clear all!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.showLoading();

                router.post(
                    `/dashboard/notifications/read-all`,
                    { ids },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            Swal.fire(
                                "Cleared!",
                                "All notifications have been marked as read.",
                                "success",
                            );

                            setNotifications([]); // ✨ Clear from UI
                        },

                        onError: () =>
                            Swal.fire(
                                "Error!",
                                "Something went wrong while clearing notifications.",
                                "error",
                            ),
                    },
                );
            }
        });
    };

    const handleNotificationClick = (notificationId) => {
        router.post(
            `/dashboard/notifications/read/${notificationId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNotifications((prev) =>
                        prev.filter((n) => n.id !== notificationId),
                    );

                    setShowNotifications(false);
                },
            },
        );
    };

    return (
        <>
            <div className="min-h-screen dark:bg-custdarkbg">
                <nav className="dark:bg-primary bg-secondary fixed top-0 w-full left-0 !z-[60]">
                    <div className="flex items-center justify-between sm:gap-y-0 border-b border-[#e8e8e8] dark:border-[#e5e7eb3d]">
                        <div className="ham-menu md:hidden">
                            <button
                                onClick={toggleClass}
                                className="md:hidden pl-[15px] block"
                            >
                                <MdOutlineMenuOpen
                                    className={`${
                                        classAdd
                                            ? ""
                                            : "[transform:rotateY(180deg)]"
                                    } text-[24px] dark:text-secondary text-primary`}
                                />
                            </button>
                        </div>
                        <div className="">
                            <div className="flex items-center xl:gap-[91px] lg:gap-[10px] md:w-[300px] lg:w-[330px] xl:w-[280px] 2xl:w-[330px] md:justify-between lg:justify-auto md:border-r dark:border-[#e5e7eb3d] px-4 py-[15px] 2xl:py-[10px] justify-center">
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                                <button
                                    onClick={toggleClass}
                                    className="hidden md:block"
                                >
                                    <MdOutlineMenuOpen
                                        className={`${
                                            classAdd
                                                ? ""
                                                : "[transform:rotateY(180deg)]"
                                        } text-[24px] dark:text-secondary text-primary`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="head-tabs-main flex items-center gap-[15px] xl:gap-[0px] justify-end flex-wrap 2xl:flex-nowrap pe-3 sm:pe-5">
                            <div className="flex gap-3 sm:gap-0 sm:flex-nowrap flex-wrap items-center w-full lg:w-auto justify-end lg:justify-auto">
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={() =>
                                            setShowNotifications(
                                                !showNotifications,
                                            )
                                        }
                                        className="relative block"
                                    >
                                        <IoNotificationsOutline className="text-[18px] sm:text-2xl dark:text-secondary text-primary" />
                                        <span className="absolute w-[18px] h-[18px] bg-custgreen rounded-[50%] right-[-5px] top-[-10px] sm:top-[-8px] text-white flex items-center justify-center text-[10px]">
                                            {notifications.length}
                                        </span>
                                    </button>

                                    {/* Dropdown */}
                                    <div
                                        ref={dropdownRef}
                                        className={`absolute right-0 mt-2 w-96 bg-white dark:bg-primary border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-500 transform origin-top-right 
            ${
                showNotifications
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
                                    >
                                        <div className="border-b border-gray-200 dark:border-gray-600 pt-4 pb-3 px-4 font-semibold text-black dark:text-white text-[18px]">
                                            Notifications
                                        </div>
                                        <ul className="divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto h-[355px]">
                                            {notifications.map(
                                                (notification, index) => (
                                                    <li
                                                        onClick={() =>
                                                            handleNotificationClick(
                                                                notification.id,
                                                            )
                                                        }
                                                        className="p-4 hover:bg-gray-100 dark:hover:bg-secondary/30 flex gap-3"
                                                        key={index}
                                                    >
                                                        <div
                                                            className={`w-[11%] ${
                                                                notification.status ===
                                                                "unread"
                                                                    ? "relative before:absolute before:w-[10px] before:h-[10px] before:bg-c2 before:rounded-[50%] before:left-[-5px] before:top-[-5px]"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <img
                                                                src={
                                                                    notification
                                                                        .sender
                                                                        ?.profile_image
                                                                        ? notification
                                                                              ?.sender
                                                                              .profile_image
                                                                        : "/image/no-image.webp"
                                                                }
                                                                alt="Image"
                                                                className="w-[36px] h-[36px] rounded"
                                                            />
                                                        </div>
                                                        <div className="w-[89%]">
                                                            <p className="dark:text-white text-black font-semibold text-[15px] relative pr-[25px]">
                                                                {
                                                                    notification.title
                                                                }
                                                            </p>
                                                            <p className="dark:text-[#c1c1c1] text-[#6F6F6F] text-[13px] line-clamp-2">
                                                                {
                                                                    notification.message
                                                                }
                                                            </p>
                                                            <span className="dark:text-[#c1c1c1] inline-block text-[#6F6F6F] text-[11px]">
                                                                {new Date(
                                                                    notification.created_at,
                                                                ).toLocaleDateString()}{" "}
                                                                &nbsp;{" "}
                                                                {new Date(
                                                                    notification.created_at,
                                                                ).toLocaleTimeString()}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                        <div className="py-3 px-4 border-t dark:border-gray-700">
                                            <ul className="justify-between flex items-center">
                                                <li>
                                                    <button
                                                        onClick={handleClearAll}
                                                        className="text-sm text-custgreen hover:underline font-semibold"
                                                    >
                                                        Clear All
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            setShowNotifications(
                                                                false,
                                                            )
                                                        }
                                                        className="text-sm text-custgreen hover:underline font-semibold"
                                                    >
                                                        Close
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <label className="items-center gap-2 cursor-pointer mx-3 md:mx-5 hidden sm:flex">
                                    {/* Light Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`transition-all duration-500 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] ${
                                            darkMode
                                                ? "opacity-40"
                                                : "opacity-100"
                                        } text-primary dark:text-white`}
                                    >
                                        <circle cx="12" cy="12" r="5" />
                                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>

                                    {/* MUI Switch */}
                                    <Switch
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                        sx={{
                                            width: { xs: 36, sm: 40 },
                                            height: 20,
                                            padding: 0,
                                            "& .MuiSwitch-switchBase": {
                                                padding: "3px",
                                                "&.Mui-checked": {
                                                    transform: {
                                                        xs: "translateX(16px)",
                                                        sm: "translateX(20px)",
                                                    },
                                                    color: "#fff",
                                                    "& + .MuiSwitch-track": {
                                                        backgroundColor:
                                                            "#1785a0",
                                                        opacity: 1,
                                                    },
                                                },
                                            },
                                            "& .MuiSwitch-thumb": {
                                                width: 14,
                                                height: 14,
                                                boxShadow:
                                                    "0 2px 6px rgba(0,0,0,0.2)",
                                            },
                                            "& .MuiSwitch-track": {
                                                borderRadius: 20,
                                                backgroundColor: "#9ca3af",
                                                opacity: 1,
                                            },
                                        }}
                                    />

                                    {/* Dark Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`transition-all duration-500 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] ${
                                            darkMode
                                                ? "opacity-100"
                                                : "opacity-40"
                                        } text-primary dark:text-white`}
                                    >
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                </label>

                                <div className="flex items-center justify-center sm:justify-auto">
                                    <div className="flex items-center leading-1">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className=""
                                                    >
                                                        <img
                                                            src={
                                                                auth.user
                                                                    ?.profile_image
                                                                    ? auth
                                                                          .user
                                                                          ?.profile_image
                                                                    : "/image/no-image.webp"
                                                            }
                                                            className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-cover rounded-[50%]"
                                                        />
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>

                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>
                    <ToastContainer />
                    <div className="transition-all duration-500">
                        <div
                            className={`
                                    ${
                                        classAdd
                                            ? ""
                                            : "transform -translate-x-full"
                                    }
                                     xl:fixed
                                    absolute
                                    z-40
                                    left-0
                                    lg:top-[70px] xl:top-[69px] sm:top-[60px] top-[60px]
                                    h-[calc(100vh-70px)]
                                    bg-secondary
                                    dark:bg-primary
                                    overflow-y-auto
                                    px-4
                                    py-8
                                    transition-transform
                                    duration-500
                                    2xl:w-[330px] xl:w-[280px] lg:w-[330px] md:w-[300px] w-[100%]
                                    md:border-r md:border-[#e8e8e8] 
                                    dark:border-[#e5e7eb3d]
                                `}
                        >
                            <div className="flex-wrap flex items-center gap-[10px] bg-custbg rounded p-[10px] dark:bg-transparent dark:border-[#f3f4f64d] dark:border">
                                <img
                                    src={
                                        auth.user?.profile_image
                                            ? auth.user?.profile_image
                                            : "/image/no-image.webp"
                                    }
                                    alt="Image"
                                    className="w-[36px] h-[36px] 2xl:w-[42px] 2xl:h-[42px] object-cover rounded"
                                />
                                <h5 className="text-custblack text-[15px] dark:text-secondary 2xl:text-[16px] font-medium max-w-[190px] break-words">
                                    {auth.user?.name}
                                </h5>
                            </div>
                            <ul>
                                <h6 className="text-custgray font-medium dark:text-secondary uppercase text-[13px] mb-3 mt-4">
                                    Dashboard
                                </h6>
                                <li>
                                    <SidebarLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        <span
                                            className={`flex items-center gap-1 text-[15px] sm:text-[16px] font-medium transition-all duration-500 mb-[10px]
            ${
                route().current("dashboard")
                    ? "text-[#15ABA2]"
                    : "dark:text-secondary text-primary group-hover:text-[#15ABA2]"
            }`}
                                        >
                                            <IoSpeedometerOutline className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded me-[8px] dark:text-primary" />{" "}
                                            Dashboard
                                        </span>
                                    </SidebarLink>
                                </li>
                                {can("users.index") && (
                                    <li>
                                        <SidebarLink
                                            href={route("users.index")}
                                            active={route().current(
                                                "users.index",
                                            )}
                                        >
                                            <span
                                                className={`flex items-center gap-1 text-[15px] sm:text-[16px] font-medium transition-all duration-500 mb-[10px]
            ${
                route().current("users.index")
                    ? "text-[#15ABA2]"
                    : "dark:text-secondary text-primary group-hover:text-[#15ABA2]"
            }`}
                                            >
                                                <FaUsers className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded me-[8px] dark:text-primary" />{" "}
                                                Users
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                {can("roles.index") && (
                                    <li>
                                        <SidebarLink
                                            href={route("roles.index")}
                                            active={route().current(
                                                "roles.index",
                                            )}
                                        >
                                            <span
                                                className={`flex items-center gap-1 text-[15px] sm:text-[16px] font-medium transition-all duration-500 mb-[10px]
            ${
                route().current("roles.index")
                    ? "text-[#15ABA2]"
                    : "dark:text-secondary text-primary group-hover:text-[#15ABA2]"
            }`}
                                            >
                                                <FaCriticalRole className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded me-[8px] dark:text-primary" />{" "}
                                                Roles
                                            </span>
                                        </SidebarLink>
                                    </li>
                                )}
                                <h6 className="text-custgray font-medium dark:text-secondary uppercase text-[13px] mb-3 mt-4">
                                    Setting
                                </h6>
                                <li>
                                    <div
                                        className={`flex group items-center justify-between p-2 mb-2 rounded-sm cursor-pointer
            dark:text-secondary text-primary  
            ${
                ["profile.edit"].some((profileName) =>
                    route().current(profileName),
                ) || isSubNavOpen === "profile"
                    ? "text-[#15ABA2]"
                    : ""
            }`}
                                        onClick={() => toggleSubNav("profile")}
                                    >
                                        <span
                                            className={`flex items-center gap-1 font-medium text-[15px] sm:text-[16px] group-hover:text-[#15ABA2] transition duration-500 ease-in-out
                ${
                    ["profile.edit"].some((profileName) =>
                        route().current(profileName),
                    ) || isSubNavOpen === "profile"
                        ? "text-[#15ABA2]"
                        : "dark:text-secondary text-primary"
                }`}
                                        >
                                            <IoSettingsOutline className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded dark:text-primary me-[8px]" />{" "}
                                            Settings
                                        </span>
                                        <FaChevronDown
                                            className={`transition-all duration-300 group-hover:text-[#15ABA2] w-[11px] sm:w-[13px]
                ${
                    ["profile.edit"].some((profileName) =>
                        route().current(profileName),
                    ) || isSubNavOpen === "profile"
                        ? "text-[#15ABA2]"
                        : "dark:text-secondary text-primary"
                }`}
                                        />
                                    </div>
                                    {isSubNavOpen === "profile" && (
                                        <ul className="sub-navigation text-sm mb-[10px] space-y-[10px]">
                                            {roles.includes("Admin") && (
                                                <li className="ml-[25px] relative before:absolute before:w-[1px] before:-left-1 before:top-1 after:-left-[6px] before:h-[10px] after:absolute after:w-[6px] after:h-[6px] after:top-[20px] after:transform after:-translate-y-1/2 after:rounded-full after:bg-custgray after:dark:bg-white before:bg-custgray before:dark:bg-white">
                                                    <SidebarLink
                                                        href={route(
                                                            "settings.index",
                                                        )}
                                                        active={route().current(
                                                            "settings.index",
                                                        )}
                                                    >
                                                        <span
                                                            className={`ml-3 font-[500] text-[14px] sm:text-[15px] transition-all duration-500 
                            ${
                                route().current("settings.index")
                                    ? "text-[#15ABA2]"
                                    : "dark:text-secondary text-primary group-hover:text-[#15ABA2]"
                            }`}
                                                        >
                                                            Company Setting
                                                        </span>
                                                    </SidebarLink>
                                                </li>
                                            )}
                                            <li className="ml-[25px] relative before:absolute before:w-[1px] before:-left-1 before:top-1 after:-left-[6px] before:h-[10px] after:absolute after:w-[6px] after:h-[6px] after:top-[20px] after:transform after:-translate-y-1/2 after:rounded-full after:bg-custgray after:dark:bg-white before:bg-custgray before:dark:bg-white">
                                                <SidebarLink
                                                    href={route("profile.edit")}
                                                    active={route().current(
                                                        "profile.edit",
                                                    )}
                                                >
                                                    <span
                                                        className={`ml-3 font-[500] text-[14px] sm:text-[15px] transition-all duration-500 
                            ${
                                route().current("profile.edit")
                                    ? "text-[#15ABA2]"
                                    : "dark:text-secondary text-primary group-hover:text-[#15ABA2]"
                            }`}
                                                    >
                                                        Profile
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                            <li className="ml-[25px] relative before:absolute before:w-[1px] before:-left-1 before:top-1 after:-left-[6px] before:h-[10px] after:absolute after:w-[6px] after:h-[6px] after:top-[20px] after:transform after:-translate-y-1/2 after:rounded-full after:bg-custgray after:dark:bg-white before:bg-custgray before:dark:bg-white">
                                                <SidebarLink
                                                    href={route("logout")}
                                                    method="post"
                                                >
                                                    <span
                                                        className={`ml-3 font-[500] text-[15px] text-primary dark:text-white group-hover:text-[#15ABA2] transition-all duration-500`}
                                                    >
                                                        Log Out
                                                    </span>
                                                </SidebarLink>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div
                            className={`${
                                classAdd ? "2xl:ml-[330px] xl:ml-[280px]" : ""
                            } text-primary transition-all duration-500 py-[90px] sm:py-[100px] lg:py-[110px] px-[20px] sm:px-[20px] lg:px-[30px]`}
                        >
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
