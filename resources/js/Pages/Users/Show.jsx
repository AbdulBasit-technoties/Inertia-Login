import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
export default function Show({ auth, user, activities }) {
    const [activeTab, setActiveTab] = useState("activities");
    return (
        <AuthenticatedLayout title="User Detail" auth={auth}>
            <Head title="User Detail" />
            <section>
                <div>
                    <div className="bg-custbg p-[10px] sm:p-[20px] rounded-[10px] dark:bg-primary mb-[20px]">
                        <div className="flex items-center justify-between flex-wrap gap-y-[10px]">
                            <div className="flex items-center gap-[15px]">
                                <h3 className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded dark:text-white flex items-center justify-center bg-secondary tracking-[5px] dark:bg-custdarkbg">
                                    {user.name
                                        ? user.name
                                              .substring(0, 2)
                                              .toUpperCase()
                                        : "N/A"}
                                </h3>
                                <div>
                                    <h5 className="font-semibold text-[16px] sm:text-[17px] dark:text-white text-custblack">
                                        {user.name || "N/A"}
                                    </h5>
                                    <span className="w-full font-normal text-[14px] sm:text-[15px] text-gray-500 inline-block mt-[3px] dark:text-secondary/60">
                                        {user?.email || "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-[10px]">
                                <Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.history.back();
                                    }}
                                    className="inline-flex items-center px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                                >
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-custbg p-[10px] sm:p-[20px] rounded-[10px] dark:bg-primary mb-[20px]">
                        <div>
                            <Box sx={{ width: "100%", typography: "body1" }}>
                                <TabContext value={activeTab}>
                                    <Box sx={{ borderColor: "divider" }}>
                                        <TabList
                                            onChange={(e, newValue) =>
                                                setActiveTab(newValue)
                                            }
                                            TabIndicatorProps={{
                                                style: { display: "none" },
                                            }}
                                            aria-label="Comments and Activities Tabs"
                                            className="bg-secondary dark:bg-custdarkbg rounded p-[10px]"
                                        >
                                            <Tab
                                                label="Activities"
                                                value="activities"
                                                className="!bg-custbg dark:!bg-primary dark:!text-secondary !rounded [&.Mui-selected]:!bg-custgreen [&.Mui-selected]:!text-white !text-custblack !font-semibold"
                                            />
                                        </TabList>
                                    </Box>
                                    <TabPanel
                                        value="activities"
                                        className="!px-0 !pb-0"
                                    >
                                        <div className="bg-secondary dark:bg-custdarkbg rounded">
                                            <div className="flex justify-between items-center py-[20px] border-custbord dark:border-darkbord border-b px-4">
                                                <h6 className="text-custblack font-medium text-[18px] dark:text-white">
                                                    Activities
                                                </h6>
                                                <div className="gap-2 flex items-center text-[14px]">
                                                    <select
                                                        value={
                                                            activities.per_page
                                                        }
                                                        onChange={(e) => {
                                                            router.get(
                                                                route(
                                                                    "users.show",
                                                                    user.id,
                                                                ),
                                                                {
                                                                    ...route()
                                                                        .params,
                                                                    activities_page: 1,
                                                                    activities_per_page:
                                                                        e.target
                                                                            .value,
                                                                    tab: "activities",
                                                                },
                                                                {
                                                                    preserveState: true,
                                                                    replace: true,
                                                                    preserveScroll: true,
                                                                },
                                                            );
                                                        }}
                                                        className="border-custgreen border-[1px] focus:border-custgreen ring-0 focus:ring-0 rounded-[6px] bg-transparent text-black dark:text-secondary"
                                                    >
                                                        <option
                                                            value="10"
                                                            className="bg-white text-black dark:bg-primary dark:text-secondary"
                                                        >
                                                            10
                                                        </option>
                                                        <option
                                                            value="20"
                                                            className="bg-white text-black dark:bg-primary dark:text-secondary"
                                                        >
                                                            20
                                                        </option>
                                                        <option
                                                            value="30"
                                                            className="bg-white text-black dark:bg-primary dark:text-secondary"
                                                        >
                                                            30
                                                        </option>
                                                    </select>
                                                    <span className="inline-block font-semibold text-custblack dark:text-secondary">
                                                        {activities.total > 0
                                                            ? `Per page ${activities.from} – ${activities.to} / ${activities.total}`
                                                            : "No records available"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="px-4 py-[20px] space-y-[15px]">
                                                {activities.data.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex gap-5 hover:!border-custgreen dark:bg-primary dark:border-transparent transition duration-500 ease border border-custbord p-4 xl:p-5 rounded"
                                                            >
                                                                <div className="flex items-center">
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .user
                                                                                .profile_image
                                                                                ? item
                                                                                      .user
                                                                                      .profile_image
                                                                                : "/image/no-image.webp"
                                                                        }
                                                                        className="w-[50px] h-[50px] rounded-full object-cover me-[8px]"
                                                                        alt=""
                                                                    />
                                                                    <h4 className="text-[15px] font-medium capitalize dark:text-white">
                                                                        {
                                                                            item.comment
                                                                        }
                                                                        <span className="text-[14px] text-gray-500 block">
                                                                            {new Date(
                                                                                item.created_at,
                                                                            )
                                                                                .toLocaleString(
                                                                                    "en-GB",
                                                                                    {
                                                                                        day: "2-digit",
                                                                                        month: "short",
                                                                                        year: "numeric",
                                                                                        hour: "numeric",
                                                                                        minute: "2-digit",
                                                                                        hour12: true,
                                                                                    },
                                                                                )
                                                                                .replace(
                                                                                    "am",
                                                                                    "AM",
                                                                                )
                                                                                .replace(
                                                                                    "pm",
                                                                                    "PM",
                                                                                )}
                                                                        </span>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                                <Pagination data={activities} />
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
