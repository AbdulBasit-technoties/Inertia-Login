import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, Stack } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { FaArrowTrendUp } from "react-icons/fa6";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const data = [
  { label: 'Group A', value: 400, color: '#09637E' },
  { label: 'Group B', value: 300, color: '#088395' },
  { label: 'Group C', value: 300, color: '#7AB2B2' },
  { label: 'Group D', value: 200, color: '#1A3263' },
];

const margin = { right: 24 };
const tData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const lData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const lLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function Dashboard({ auth }) {
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
                <div className="dash-overview">
                    <div className="dash-title mb-[20px]">
                        <h2 className="text-custblack text-[22px] dark:text-secondary">
                            Overview
                        </h2>
                    </div>
                    <div className="grid grid-cols-12 gap-[14px] mb-[30px]">
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="bg-[#e6f1fd] py-[20px] px-[30px] rounded-[15px] flex items-end justify-between transition-all duration-500 hover:translate-y-[-2px] dark:bg-primary">
                                <div>
                                    <span className="inline-block text-[15px] font-semibold mb-[4px] dark:text-secondary">
                                        Views
                                    </span>
                                    <h3 className="text-custblack dark:text-secondary text-[24px]">
                                        7,265
                                    </h3>
                                </div>
                                <div className="flex items-center gap-[10px] mb-[10px]">
                                    <span className="inline-block text-[15px] font-semibold dark:text-secondary">
                                        +11.01%
                                    </span>
                                    <FaArrowTrendUp className="dark:text-secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="bg-[#edeefc] py-[20px] px-[30px] rounded-[15px] flex items-end justify-between transition-all duration-500 hover:translate-y-[-2px] dark:bg-primary">
                                <div>
                                    <span className="inline-block text-[15px] font-semibold mb-[4px] dark:text-secondary">
                                        Visits
                                    </span>
                                    <h3 className="text-custblack dark:text-secondary text-[24px]">
                                        3,671
                                    </h3>
                                </div>
                                <div className="flex items-center gap-[10px] mb-[10px]">
                                    <span className="inline-block text-[15px] font-semibold dark:text-secondary">
                                        -0.03%
                                    </span>
                                    <FaArrowTrendUp className="dark:text-secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="bg-[#e6f1fd] py-[20px] px-[30px] rounded-[15px] flex items-end justify-between transition-all duration-500 hover:translate-y-[-2px] dark:bg-primary">
                                <div>
                                    <span className="inline-block text-[15px] font-semibold mb-[4px] dark:text-secondary">
                                        New Users
                                    </span>
                                    <h3 className="text-custblack dark:text-secondary text-[24px]">
                                        256
                                    </h3>
                                </div>
                                <div className="flex items-center gap-[10px] mb-[10px]">
                                    <span className="inline-block text-[15px] font-semibold dark:text-secondary">
                                        +15.03%
                                    </span>
                                    <FaArrowTrendUp className="dark:text-secondary" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-3">
                            <div className="bg-[#edeefc] py-[20px] px-[30px] rounded-[15px] flex items-end justify-between transition-all duration-500 hover:translate-y-[-2px] dark:bg-primary">
                                <div>
                                    <span className="inline-block text-[15px] font-semibold mb-[4px] dark:text-secondary">
                                        Active Users
                                    </span>
                                    <h3 className="text-custblack dark:text-secondary text-[24px]">
                                        2,318
                                    </h3>
                                </div>
                                <div className="flex items-center gap-[10px] mb-[10px]">
                                    <span className="inline-block text-[15px] font-semibold dark:text-secondary">
                                        +6.08%
                                    </span>
                                    <FaArrowTrendUp className="dark:text-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-[14px]">
                        <div className="col-span-12 xl:col-span-8 bg-custbg rounded-[15px] pt-[20px] dark:bg-primary">
                            <Box sx={{ width: '100%', height: 300 }}>
                                <BarChart
                                    series={[
                                    { data: pData, label: 'pv', id: 'pvId', color: '#088395' },
                                    { data: uData, label: 'uv', id: 'uvId', color: '#1A3263' },
                                    ]}
                                    xAxis={[{ data: xLabels, height: 28 }]}
                                    yAxis={[{ width: 50 }]}
                                    sx={{
                                        ".dark & .MuiChartsLegend-label": {
                                        fill: "white",
                                        color: "white",
                                        },
                                        ".dark & .MuiChartsAxis-tickLabel": {
                                        fill: "white",
                                        },
                                        ".dark & .MuiChartsTooltip-root": {
                                        color: "white",
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-custbg rounded-[15px] flex items-center dark:bg-primary">
                            <Stack width="100%" height={300} direction="row">
                                <PieChart
                                    series={[
                                    {
                                        paddingAngle: 5,
                                        innerRadius: '60%',
                                        outerRadius: '90%',
                                        data,
                                    },
                                    ]}
                                    hideLegend
                                    sx={{
                                        ".dark & .MuiChartsLegend-label": {
                                        fill: "white",
                                        color: "white",
                                        },
                                        ".dark & .MuiChartsAxis-tickLabel": {
                                        fill: "white",
                                        },
                                        ".dark & .MuiChartsTooltip-root": {
                                        color: "white",
                                        },
                                    }}
                                />
                            </Stack>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-custbg rounded-[15px] flex items-center dark:bg-primary">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { value: 10, label: 'Circle', color: '#088395' },
                                            { value: 15, label: 'Diamond', color: '#7AB2B2' },
                                            { value: 20, label: 'Star', color: '#09637E' },
                                        ],
                                    },
                                ]}
                                width={250}
                                height={250}
                                className="!w-[90%] sm:!w-[250px]"
                                sx={{
                                    ".dark & .MuiChartsLegend-label": {
                                    fill: "white",
                                    color: "white",
                                    },
                                    ".dark & .MuiChartsAxis-tickLabel": {
                                    fill: "white",
                                    },
                                    ".dark & .MuiChartsTooltip-root": {
                                    color: "white",
                                    },
                                }}
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-8 bg-custbg rounded-[15px] pt-[20px] dark:bg-primary">
                            <Box sx={{ width: '100%', height: 300 }}>
                                <LineChart
                                    series={[
                                    {
                                        data: tData,
                                        label: 'pv',
                                        shape: 'cross',
                                        color: '#1A3263',
                                        showMark: ({ index }) => index % 2 === 0,
                                    },
                                    {
                                        data: lData,
                                        label: 'uv',
                                        shape: 'diamond',
                                        color: '#088395',
                                        showMark: ({ index }) => index % 2 === 0,
                                    },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: lLabels, height: 28 }]}
                                    yAxis={[{ width: 50 }]}
                                    margin={margin}
                                    sx={{
                                        ".dark & .MuiChartsLegend-label": {
                                        fill: "white",
                                        color: "white",
                                        },
                                        ".dark & .MuiChartsAxis-tickLabel": {
                                        fill: "white",
                                        },
                                        ".dark & .MuiChartsTooltip-root": {
                                        color: "white",
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
