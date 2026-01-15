import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ auth, props = {} }) {
    const [selectedPipeline, setSelectedPipeline] = useState("all");
    const [selectedTimeframe, setSelectedTimeframe] = useState("30");

    const stageData = {
        labels: [
            "In Pipeline",
            "Follow Up",
            "Schedule",
            "Conversation",
            "Won",
            "Lost",
        ],
        datasets: [
            {
                label: "Number of Deals",
                data: [12, 8, 15, 10, 5, 3],
                backgroundColor: "rgb(20, 184, 166)",
                borderColor: "rgb(13, 148, 136)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Deals by Stage",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    const totalPayment = Number(props?.totalPayment || 0); // Ensure it's a number
    const formattedPayment = totalPayment.toFixed(2); // Now it's safe

    const {
        totalUser = 0,
        totalLead = 0,
        totalBrand = 0,
        totalOrder = 0,
        brands = [],
    } = props;
    let userRole = auth.user?.roles?.[0]?.name || "Guest";
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div>
                <div className="mb-[28px]">
                    <div className="w-full">
                        <div className="bg-white dark:bg-primary overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-white text-center">
                                {userRole === "Client" ? (
                                    <>
                                        <h2 className="text-2xl font-semibold">
                                            Welcome, Valued Client!
                                        </h2>
                                        <p className="mt-2 dark:text-white text-gray-600 ">
                                            Access your services, track
                                            progress, and stay connected with
                                            us.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-semibold">
                                            Welcome, Team{" "}
                                            {userRole === "Admin"
                                                ? "Admin"
                                                : "Member"}
                                            !
                                        </h2>
                                        <p className="mt-2 dark:text-white text-gray-600">
                                            Stay on top of your tasks and
                                            collaborate efficiently. Your
                                            success starts here!
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-7">
                    <div className="bg-white dark:bg-primary overflow-hidden shadow-sm sm:rounded-lg p-6 col-span-12 xl:col-span-6">
                        <div className="flex flex-wrap gap-y-[10px] justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold dark:text-white">
                                Deals by Stage
                            </h3>
                            <div className="flex gap-[10px] items-center">
                                <select
                                    className="bg-white border rounded-md px-3 py-1 text-sm dark:border-custgreen dark:bg-transparent dark:text-white"
                                    value={selectedPipeline}
                                    onChange={(e) =>
                                        setSelectedPipeline(e.target.value)
                                    }
                                >
                                    <option
                                        className="dark:text-primary"
                                        value="all"
                                    >
                                        All Pipelines
                                    </option>
                                    <option
                                        className="dark:text-primary"
                                        value="sales"
                                    >
                                        Sales Pipeline
                                    </option>
                                    <option
                                        className="dark:text-primary"
                                        value="marketing"
                                    >
                                        Marketing Pipeline
                                    </option>
                                </select>
                                <select
                                    className="bg-white border rounded-md px-3 py-1 text-sm dark:border-custgreen dark:bg-transparent dark:text-white"
                                    value={selectedTimeframe}
                                    onChange={(e) =>
                                        setSelectedTimeframe(e.target.value)
                                    }
                                >
                                    <option
                                        className="dark:text-primary"
                                        value="30"
                                    >
                                        Last 30 days
                                    </option>
                                    <option
                                        className="dark:text-primary"
                                        value="60"
                                    >
                                        Last 60 days
                                    </option>
                                    <option
                                        className="dark:text-primary"
                                        value="90"
                                    >
                                        Last 90 days
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="h-[300px]">
                            <Bar data={stageData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-primary overflow-hidden shadow-sm sm:rounded-lg p-6 col-span-12 xl:col-span-6">
                        <div className="flex flex-wrap gap-y-[10px] justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold dark:text-white">
                                Recently Created Deals
                            </h3>
                            <div className="relative">
                                <select className="bg-white border rounded-md px-3 py-1 text-sm dark:border-custgreen dark:bg-transparent dark:text-white">
                                    <option className="dark:text-primary">
                                        Last 30 days
                                    </option>
                                    <option className="dark:text-primary">
                                        Last 12 days
                                    </option>
                                    <option className="dark:text-primary">
                                        Last 15 days
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 dark:bg-primary">
                                    <tr className="border-none">
                                        <th className="px-6 py-3 text-left text-xs dark:text-white font-medium text-gray-500 uppercase tracking-wider">
                                            Deal Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs dark:text-white font-medium text-gray-500 uppercase tracking-wider">
                                            Stage
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs dark:text-white font-medium text-gray-500 uppercase tracking-wider">
                                            Deal Value
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs dark:text-white font-medium text-gray-500 uppercase tracking-wider">
                                            Probability
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs dark:text-white font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-primary divide-y divide-gray-200">
                                    <tr className="border-none">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white font-medium text-gray-900">
                                            Collins
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            Conversation
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            $04,51,000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            85%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Lost
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-none">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white font-medium text-gray-900">
                                            Konopelski
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            Pipeline
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            $14,51,000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            56%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Won
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-none">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white font-medium text-gray-900">
                                            Adams
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            Won
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            $12,51,000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-white text-gray-500">
                                            15%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Won
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-none">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                            Schumm
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            Lost
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            $51,000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            45%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Lost
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-none">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                            Wisozk
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            Follow Up
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            $67,000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                                            5%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Won
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
