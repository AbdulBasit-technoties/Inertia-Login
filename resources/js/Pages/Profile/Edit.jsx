import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}) {
    const { data, setData, post, errors, progress, recentlySuccessful } =
        useForm({
            id: auth.user.pid,
            nic_f: "",
            nic_b: "",
        });
    const submit = (e) => {
        e.preventDefault();
        post(route("profile.image", { id: auth.user.pid }));
    };
    const userRole = auth.user.roles.map((role) => role.name);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        auth={auth}
                        className="max-w-full"
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5">
                    <header>
                        <h2 className="text-[18px] sm:text-[22px] font-medium text-gray-900 dark:text-white">
                            Upload Your Profile Pictures here
                        </h2>
                    </header>
                    <div className="mt-6 space-y-6">
                        <div className="py-3 w-full">
                            <InputLabel
                                htmlFor="profile_image"
                                value="Profile Image"
                            />
                            <TextInput
                                id="profile_image"
                                className="mt-1 block w-full"
                                isFocused
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const formData = new FormData();
                                        formData.append(
                                            "profile_image",
                                            file
                                        );
                                        router.post(
                                            route("profileimage", {
                                                id: auth.currentProfile,
                                            }),
                                            formData,
                                            {
                                                forceFormData: true,
                                                onSuccess: () => {
                                                    toast.dismiss(
                                                        loadingToast
                                                    );
                                                    toast.success(
                                                        "Profile photo updated successfully!"
                                                    );
                                                },
                                                onError: (errors) => {
                                                    toast.dismiss(
                                                        loadingToast
                                                    );
                                                    toast.error(
                                                        errors.profile_image ||
                                                        "Error uploading photo"
                                                    );
                                                },
                                            }
                                        );
                                    }
                                }}
                                type="file"
                            />
                        </div>
                        <div className="w-[200px] h-[200px] object-contain dark:text-white">
                            <img
                                src={
                                    auth.user.profile_image
                                        ? auth.user.profile_image
                                        : "/image/no-image.webp"
                                }
                                alt="Payment Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                {!userRole.includes('Client') && (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5">
                        <header>
                            <h2 className="text-[18px] sm:text-[22px] font-medium text-gray-900 dark:text-white">
                                Upload Your Nic Pictures
                            </h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-secondary/90">
                                Upload high-quality NIC images for identity
                                verification. Ensure all details are clearly
                                visible.
                            </p>
                        </header>
                        <form
                            onSubmit={submit}
                            className="mt-6 space-y-6"
                            encType="multipart/form-data"
                        >
                            <div className="py-3 w-full">
                                <InputLabel
                                    htmlFor="nic_f"
                                    value="Nic Front"
                                />

                                <input
                                    id="nic_f"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nic_f", e.target.files[0])
                                    }
                                    type="file"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.nic_f}
                                />
                            </div>

                            <div className="py-3 w-full">
                                <InputLabel
                                    htmlFor="nic_b"
                                    value="Nic Back"
                                />

                                <input
                                    id="nic_b"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nic_b", e.target.files[0])
                                    }
                                    type="file"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.nic_b}
                                />
                            </div>
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
                                    <p className="text-sm text-gray-600">
                                        Add Brand
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                )}
                {userRole.includes('Admin') && (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5">
                        <UpdatePasswordForm />
                    </div>
                )}
                {userRole.includes('Admin') && (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
