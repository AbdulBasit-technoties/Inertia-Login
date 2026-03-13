import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
function View(props) {
    const { role, permissions, permissionsList } = props;
    const groupedPermissions = permissionsList.reduce((acc, permission) => {
        const [item, action] = permission.split('.');
        if (!acc[item]) acc[item] = [];
        acc[item].push({ action, permission });
        return acc;
    }, {});
    const [selectedPermissions, setSelectedPermissions] = useState(permissions);
    const handleCheckboxChange = (permission) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permission)) {
                return prev.filter((perm) => perm !== permission);
            } else {
                return [...prev, permission];
            }
        });
    };

    const handleSave = async () => {
        await router.put(route('roles.update', role.id), selectedPermissions);
    };
    return (
        <>
            <AuthenticatedLayout auth={props.auth}
                errors={props.errors}
                header={
                    <>
                        <div className='flex flex-col px-4 '>
                            <h2 className="font-semibold text-xl text-primary leading-tight">Role:
                                {role.name}</h2>
                        </div>
                    </>
                }
            >
                <Head title="Admin Dashboard" />
                <div>
                    <div className="col-span-4 bg-white dark:bg-primary dark:text-white p-6 text-primary rounded-2xl flex justify-between items-center">
                        <div className="">
                            <h3 className="text-lg font-medium">Manage Permissions for {role.name}</h3>
                            <label className="flex items-center mt-2 bg-white rounded-md py-2 pl-3">
                                <input
                                    type="checkbox"
                                    checked={permissionsList.length === selectedPermissions.length}
                                    onChange={(e) => {
                                        setSelectedPermissions(e.target.checked ? permissionsList : []);
                                    }}
                                    className='text-custgreen focus:ring-custgreen'
                                />
                                <span className="ml-2 text-primary">Select All</span>
                            </label>
                        </div>

                        <button
                            onClick={handleSave}
                            className="inline-flex items-center px-4 py-2 font-medium bg-custgreen border border-transparent rounded text-[14px] text-white capitalize hover:border-custgreen hover:bg-transparent hover:text-custgreen dark:hover:bg-transparent dark:hover:border-custgreen dark:hover:text-custgreen transition-all duration-500"
                        >
                            Save
                        </button>


                    </div>
                    <div className="py-6 gap-4 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1">

                        {Object.entries(groupedPermissions).map(([item, actions]) => (
                            <div key={item} className="bg-white dark:bg-primary dark:text-white text-primary p-6 rounded-2xl shadow-lg">
                                <h4 className="font-semibold capitalize flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={actions.every(({ permission }) =>
                                            selectedPermissions.includes(permission))}
                                        onChange={() => {
                                            const allPermissions = actions.map(({ permission }) =>
                                                permission);
                                            const allSelected = allPermissions.every((perm) =>
                                                selectedPermissions.includes(perm));
                                            setSelectedPermissions((prev) =>
                                                allSelected
                                                    ? prev.filter((perm) => !allPermissions.includes(perm))
                                                    : [...prev, ...allPermissions]
                                            );
                                        }}
                                        className='text-custgreen focus:ring-custgreen'
                                    />
                                    {item}
                                </h4>
                                <hr />
                                {actions.map(({ action, permission }) => (
                                    <label className="flex items-center mt-2" key={permission}>
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissions.includes(permission)}
                                            onChange={() => handleCheckboxChange(permission)}
                                            className='text-custgreen focus:ring-custgreen'
                                        />
                                        <span className="ml-2">{action} {item}</span>
                                    </label>
                                ))}

                            </div>
                        ))}

                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
export default View;