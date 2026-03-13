import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useState, useRef } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    user,
}) {
    const { setData, post, errors, progress, processing } = useForm({
        id: auth.user.id,
        nic_f: "",
        nic_b: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("user.image", { id: auth.user.id }));
    };
    const userRole = auth.user.roles.map((role) => role.name);

    const [nicFrontPreview, setNicFrontPreview] = useState(
        user?.nic_f ?? null,
    );

    const [nicBackPreview, setNicBackPreview] = useState(
        user?.nic_b ?? null,
    );

    const nicFrontRef = useRef();
    const nicBackRef = useRef();

    const fileInputRef = useRef();

    return (
        <AuthenticatedLayout
            auth={auth}
            title="Profile"
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="">
                <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
                    <h2 className="text-custblack text-[22px] dark:text-secondary capitalize">
                        Profile Information
                    </h2>
                    <p className="mt-1 text-sm text-custblack dark:text-secondary/90">
                        Update your account's profile information and email
                        address.
                    </p>
                </div>

                <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
                    <div className="flex items-center gap-6 mb-[20px]">
                        <input
                            type="file"
                            ref={fileInputRef}
                            id="profile_image"
                            name="profile_image"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const formData = new FormData();
                                    formData.append("profile_image", file);

                                    router.post(
                                        route("profileimage", {
                                            id: auth.user.id,
                                        }),
                                        formData,
                                        { forceFormData: true },
                                    );
                                }
                            }}
                        />

                        <div className="relative">
                            <div className="relative sm:w-28 sm:h-28 w-20 h-20 rounded-full overflow-hidden group">
                                <img
                                    src={
                                        auth.user.profile_image
                                            ? auth.user.profile_image
                                            : "/image/no-image.webp"
                                    }
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="absolute cursor-pointer bottom-[-2px] right-[-5px] sm:bottom-1 sm:right-1 bg-teal-500 p-2 rounded-full shadow-md group-hover:scale-110 transition"
                            >
                                <MdOutlineCameraAlt
                                    size={16}
                                    className="text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold dark:text-secondary">
                                {`${auth.user.name || ""}`}
                            </h2>
                            <p className="text-gray-500 text-sm dark:text-secondary">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>

                    <UpdateProfileInformationForm
                        user={user}
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>
                {!userRole.includes("Client") && (
                    <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
                        <header>
                            <h2 className="text-custblack text-[22px] dark:text-secondary capitalize">
                                Upload Your Nic Pictures
                            </h2>
                            <p className="mt-1 text-sm text-custblack dark:text-secondary/90">
                                Upload high-quality NIC images for identity
                                verification. Ensure all details are clearly
                                visible.
                            </p>
                        </header>
                        <form
                            onSubmit={submit}
                            className="mt-6 space-y-5"
                            encType="multipart/form-data"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                                <div className="py-3 w-full">
                                    <InputLabel value="CNIC Front" />

                                    <div
                                        onClick={() =>
                                            nicFrontRef.current.click()
                                        }
                                        className="mt-2 bg-secondary border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-custgreen transition h-[200px] sm:h-[300px] flex items-center justify-center dark:bg-custdarkbg"
                                    >
                                        {nicFrontPreview ? (
                                            <img
                                                src={nicFrontPreview}
                                                alt="CNIC Front"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div>
                                                <p className="font-semibold text-custblack dark:text-secondary">
                                                    Upload Your CNIC Front
                                                    Picture
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-secondary/90">
                                                    File size should not exceed
                                                    2MB
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        id="nic_f"
                                        name="nic_f"
                                        type="file"
                                        ref={nicFrontRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setData("nic_f", file);

                                            if (file) {
                                                setNicFrontPreview(
                                                    URL.createObjectURL(file),
                                                );
                                            }
                                        }}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.nic_f}
                                    />
                                </div>
                                <div className="py-3 w-full">
                                    <InputLabel value="CNIC Back" />

                                    <div
                                        onClick={() =>
                                            nicBackRef.current.click()
                                        }
                                        className="mt-2 bg-secondary border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-custgreen transition h-[200px] sm:h-[300px] flex items-center justify-center dark:bg-custdarkbg"
                                    >
                                        {nicBackPreview ? (
                                            <img
                                                src={nicBackPreview}
                                                alt="CNIC Back"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div>
                                                <p className="font-semibold text-custblack dark:text-secondary">
                                                    Upload Your CNIC Back
                                                    Picture
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-secondary/90">
                                                    File size should not exceed
                                                    2MB
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        id="nic_b"
                                        name="nic_b"
                                        ref={nicBackRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setData("nic_b", file);

                                            if (file) {
                                                setNicBackPreview(
                                                    URL.createObjectURL(file),
                                                );
                                            }
                                        }}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.nic_b}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    disabled={processing || progress}
                                >
                                    {processing ? "Saving..." : "Save"}
                                </PrimaryButton>
                                {progress && (
                                    <progress
                                        className="progress-primary"
                                        value={progress.percentage}
                                        max="100"
                                    >
                                        {progress.percentage}%
                                    </progress>
                                )}
                            </div>
                        </form>
                    </div>
                )}
                {userRole.includes("Admin") && (
                    <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
                        <UpdatePasswordForm />
                    </div>
                )}
                {userRole.includes("Admin") && (
                    <div className="bg-custbg p-[15px] sm:p-[20px] dark:bg-primary mb-[20px] relative rounded">
                        <DeleteUserForm className="" />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
