import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function Dashboard({ auth }) {

    let roles = auth.user?.roles?.[0]?.name || "Guest";
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
                                <h2 className="text-2xl font-semibold">
                                    Welcome, Team{" "}
                                    {roles === "Admin" ? "Admin" : "Member"}!
                                </h2>
                                <p className="mt-2 dark:text-white text-gray-600">
                                    Stay on top of your tasks and collaborate
                                    efficiently. Your success starts here!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
