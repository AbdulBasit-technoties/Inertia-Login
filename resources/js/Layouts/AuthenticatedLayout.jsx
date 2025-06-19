import { useEffect, useRef, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { CgWebsite } from "react-icons/cg";
import {
    FaBarsStaggered,
    FaChevronDown,
    FaCriticalRole,
} from "react-icons/fa6";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import SidebarLink from "@/Components/SidebarLink";
import { FaTachometerAlt } from "react-icons/fa";
import usePermissions from "@/Hooks/usePermissions";

export default function Authenticated({ auth, header, children }) {
    const { can } = usePermissions();

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

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [classAdd, setClassAdd] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setClassAdd(true);
            } else {
                setClassAdd(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleClass = () => {
        setClassAdd((prev) => !prev);
    };
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    const [isSubNavOpen, setSubNavOpen] = useState(null);
    const toggleSubNav = (txt) => {
        setSubNavOpen(isSubNavOpen === txt ? null : txt);
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="dark:bg-primary bg-secondary fixed top-0 w-full left-0 z-50">
                <div className="md:px-4 px-2">
                    <div className="flex justify-between flex-wrap py-2 items-center bg-secondary dark:bg-primary">
                        <div className="flex items-center justify-between w-[28%] md:py-0 md:w-[15.666667%]">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="md:pt-0 pt-4 flex items-center md:justify-end w-full md:w-fit justify-center gap-5 bg-white dark:bg-primary">
                            <label className="flex cursor-pointer gap-2 items-center  md:mb-0 mb-[20px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-all duration-500 text-black dark:text-white ${
                                        darkMode
                                            ? "opacity-100 -rotate-0"
                                            : "opacity-100 rotate-0"
                                    }`}
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>

                                {/* Toggle Button */}
                                <div className="relative w-10 h-5">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={() => setDarkMode(!darkMode)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-full h-full bg-gray-300 dark:bg-primary rounded-full peer-checked:bg-secondary/80 transition-colors"></div>
                                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white dark:bg-primary/80 rounded-full transition-transform peer-checked:translate-x-5"></div>
                                </div>

                                {/* Moon Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-all duration-500 text-black dark:text-white ${
                                        darkMode
                                            ? "opacity-100 rotate-0"
                                            : "opacity-100 rotate-0"
                                    }`}
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            </label>
                            <button
                                onClick={toggleClass}
                                className="block  md:mb-0 mb-[20px]"
                            >
                                <FaBarsStaggered className="text-xl dark:text-secondary text-primary" />
                            </button>
                            <Dropdown className="md:mb-0 mb-[20px]">
                                <Dropdown.Trigger>
                                    <button className=" px-3 py-2 font-medium rounded-md dark:text-blue  md:mb-0 mb-[20px]  dark:bg-secondary bg-blue/80 text-secondary">
                                        <IoSettings />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
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
            </nav>

            <main className="md:pt-0 pt-[50px]">
                <ToastContainer />
                <div className="transition-all duration-500">
                    <div
                        className={`
                                    ${
                                        classAdd
                                            ? ""
                                            : "transform -translate-x-full"
                                    }
                                    lg:fixed
                                    absolute
                                    z-40
                                    left-0
                                    md:top-[60px] top-[120px]
                                    h-[calc(100vh-70px)]
                                    bg-secondary
                                    dark:bg-primary
                                    overflow-y-auto
                                    p-4
                                    transition-transform
                                    duration-500
                                    xl:w-[330px] lg:w-[250px] md:w-[330px] w-[85%]
                                `}
                    >
                        <div className="flex items-center gap-[10px] bg-custbg rounded p-[10px]">
                            <img
                                src="/images/user.jpg"
                                alt="Image"
                                className="w-[36px] 2xl:w-[42px] rounded"
                            />
                            <h5 className="text-primary text-[15px] 2xl:text-[17px] font-medium">
                                Admin
                            </h5>
                        </div>
                        <ul>
                            <h6 className="text-custgray font-medium dark:text-secondary uppercase text-[13px] mb-3 mt-4">
                                Data
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
                    ? "text-blue"
                    : "dark:text-secondary text-primary group-hover:text-blue"
            }`}
                                    >
                                        <FaTachometerAlt className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded me-[8px] dark:text-primary" />{" "}
                                        Dashboard
                                    </span>
                                </SidebarLink>
                            </li>

                            {can("roles.index") && (
                                <li>
                                    <SidebarLink
                                        href={route("roles.index")}
                                        active={route().current("roles.index")}
                                    >
                                        <span
                                            className={`flex items-center gap-1 text-[15px] sm:text-[16px] font-medium transition-all duration-500 mb-[10px]
            ${
                route().current("roles.index")
                    ? "text-blue"
                    : "dark:text-secondary text-primary group-hover:text-blue"
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
                    route().current(profileName)
                ) || isSubNavOpen === "profile"
                    ? "text-blue"
                    : ""
            }`}
                                    onClick={() => toggleSubNav("profile")}
                                >
                                    <span
                                        className={`flex items-center gap-1 font-medium text-[15px] sm:text-[16px] group-hover:text-blue transition duration-500 ease-in-out
                ${
                    ["profile.edit"].some((profileName) =>
                        route().current(profileName)
                    ) || isSubNavOpen === "profile"
                        ? "text-blue"
                        : "dark:text-secondary text-primary"
                }`}
                                    >
                                        <IoSettingsOutline className="w-[26px] h-[26px] inline-block p-[5px] bg-custbg rounded dark:text-primary me-[8px]" />{" "}
                                        Settings
                                    </span>
                                    <FaChevronDown
                                        className={`transition-all duration-300 group-hover:text-blue w-[11px] sm:w-[13px]
                ${
                    ["profile.edit"].some((profileName) =>
                        route().current(profileName)
                    ) || isSubNavOpen === "profile"
                        ? "text-blue"
                        : "dark:text-secondary text-primary"
                }`}
                                    />
                                </div>
                                {isSubNavOpen === "profile" && (
                                    <ul className="sub-navigation text-sm mb-[10px] space-y-[10px]">
                                        <li className="ml-[25px] relative before:absolute before:w-[1px] before:-left-1 before:top-1 after:-left-[6px] before:h-[10px] after:absolute after:w-[6px] after:h-[6px] after:top-[20px] after:transform after:-translate-y-1/2 after:rounded-full after:bg-custgray after:dark:bg-white before:bg-custgray before:dark:bg-white">
                                            <SidebarLink
                                                href={route("profile.edit")}
                                                active={route().current(
                                                    "profile.edit"
                                                )}
                                            >
                                                <span
                                                    className={`ml-3 font-[500] text-[14px] sm:text-[15px] transition-all duration-500 
                            ${
                                route().current("profile.edit")
                                    ? "text-blue"
                                    : "dark:text-secondary text-primary group-hover:text-blue"
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
                                                    className={`ml-3 font-[500] text-[15px] text-primary dark:text-white group-hover:text-blue transition-all duration-500`}
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
                            classAdd ? "xl:ml-[310px] lg:ml-[230px]" : ""
                        } text-primary transition-all duration-500`}
                    >
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
