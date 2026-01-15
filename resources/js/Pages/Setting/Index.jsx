import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectComponent from "@/Components/SelectComponent";
import { Transition } from "@headlessui/react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSettings, IoShareSocial } from "react-icons/io5";
import { useState } from "react";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, setting }) {
    const { data, setData, post, errors, recentlySuccessful } = useForm({
        name: setting?.name ?? "",
        email_primary: setting?.email_primary ?? "",
        email_secondary: setting?.email_secondary ?? "",
        phone_primary: setting?.phone_primary ?? "",
        phone_secondary: setting?.phone_secondary ?? "",
        address: setting?.address ?? "",
        state: setting?.state ?? "",
        city: setting?.city ?? "",
        zip_code: setting?.zip_code ?? "",
        country: setting?.country ?? "",
        description: setting?.description ?? "",
        active_status: setting?.active_status ?? "",
        instagram: setting?.instagram ?? "",
        whatsapp: setting?.whatsapp ?? "",
        twitter: setting?.twitter ?? "",
        linkedin: setting?.linkedin ?? "",
        skype: setting?.skype ?? "",
        facebook: setting?.facebook ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("settings.store"));
    };
    const [isTab, setIsTab] = useState("General");
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Settings" />
            <section>
                <header>
                    <h2 className="text-primary dark:text-secondary sm:text-[22px] text-[20px] font-semibold capitalize">
                        Settings
                    </h2>
                </header>
                <div className="grid grid-cols-12 gap-5 mt-8">
                    <div className="xl:col-span-4 col-span-12">
                        <ul className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary">
                            <li
                                className={`${
                                    isTab === "General"
                                        ? "bg-custgreen text-white"
                                        : ""
                                } flex text-[16px] items-center gap-2 px-4 py-2 transition-all duration-200 hover:border-cusbg-custgreen rounded-sm`}
                                onClick={(e) => setIsTab("General")}
                            >
                                <IoSettings
                                    className={`${
                                        isTab === "General"
                                            ? "text-white"
                                            : "text-cusbg-custgreen"
                                    }`}
                                />
                                General
                            </li>
                        </ul>
                    </div>
                    {isTab === "General" && (
                        <div className="xl:col-span-8 col-span-12">
                            <div>
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary">
                                    <div className="form-heading col-span-12 pb-2 mb-3 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                        <IoIosInformationCircleOutline className="text-[25px] text-custgreen" />
                                        <h2 className="text-black text-[18px] sm:text-[20px] font-semibold dark:text-white">
                                            Change Logo
                                        </h2>
                                    </div>

                                    <div className="md:flex md:flex-row flex-col gap-5 items-center">
                                        <div className="md:w-[120px] md:h-[120px] w-[100px] md:mb-0 mb-2 border border-gray-200 p-2 rounded-md">
                                            <img
                                                src={
                                                    setting?.logo
                                                        ? setting?.logo
                                                        : "/image/no-image.webp"
                                                }
                                                alt="Setting Logo"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="">
                                            <input
                                                type="file"
                                                name="logo"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files[0];
                                                    console.log(
                                                        "selected file:",
                                                        file
                                                    );
                                                    if (!file) return;

                                                    const formData =
                                                        new FormData();
                                                    formData.append(
                                                        "logo",
                                                        file
                                                    );
                                                    formData.append(
                                                        "_method",
                                                        "PATCH"
                                                    );
                                                    if (setting?.id) {
                                                        router.post(
                                                            route(
                                                                "settings.update",
                                                                setting?.id
                                                            ),
                                                            formData,
                                                            {
                                                                forceFormData: true,
                                                                onSuccess: () =>
                                                                    console.log(
                                                                        "Logo uploaded success"
                                                                    ),
                                                                onError: (
                                                                    errors
                                                                ) =>
                                                                    console.error(
                                                                        "upload errors:",
                                                                        errors
                                                                    ),
                                                            }
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={submit}>
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5 grid grid-cols-12 gap-5">
                                    <div className="form-heading col-span-12 pb-2 mb-3 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                        <IoIosInformationCircleOutline className="text-[25px] text-custgreen" />
                                        <h2 className="text-black text-[18px] sm:text-[20px] font-semibold dark:text-white">
                                            General Setting
                                        </h2>
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="email_primary"
                                            value="Email Primary"
                                        />
                                        <TextInput
                                            id="email_primary"
                                            type="email"
                                            value={data.email_primary}
                                            onChange={(e) =>
                                                setData(
                                                    "email_primary",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError
                                            message={errors.email_primary}
                                        />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="email_secondary"
                                            value="Email Secondary"
                                        />
                                        <TextInput
                                            id="email_secondary"
                                            type="email"
                                            value={data.email_secondary}
                                            onChange={(e) =>
                                                setData(
                                                    "email_secondary",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError
                                            message={errors.email_secondary}
                                        />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="phone_primary"
                                            value="Phone Primary"
                                        />
                                        <TextInput
                                            id="phone_primary"
                                            type="tel"
                                            value={data.phone_primary}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_primary",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError
                                            message={errors.phone_primary}
                                        />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="phone_secondary"
                                            value="Phone Secondary"
                                        />
                                        <TextInput
                                            id="phone_secondary"
                                            type="tel"
                                            value={data.phone_secondary}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_secondary",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError
                                            message={errors.phone_secondary}
                                        />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="country"
                                            value="Country"
                                        />
                                        <TextInput
                                            id="country"
                                            type="text"
                                            value={data.country}
                                            onChange={(e) =>
                                                setData("country", e.target.value)
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.country} />
                                    </div>
                                    {/* Email */}
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="city"
                                            value="City"
                                        />
                                        <TextInput
                                            id="city"
                                            type="text"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.city} />
                                    </div>
                                    {/* Phone */}
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="state"
                                            value="State"
                                        />
                                        <TextInput
                                            id="state"
                                            type="text"
                                            value={data.state}
                                            onChange={(e) =>
                                                setData("state", e.target.value)
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.state} />
                                    </div>

                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="zip_code"
                                            value="Zip Code"
                                        />
                                        <TextInput
                                            id="zip_code"
                                            type="number"
                                            value={data.zip_code}
                                            onChange={(e) =>
                                                setData(
                                                    "zip_code",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.zip_code} />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="active_status"
                                            value="Status"
                                        />
                                        <SelectComponent
                                            id="active_status"
                                            value={data.active_status}
                                            onChange={(e) =>
                                                setData("active_status", e)
                                            }
                                            options={[
                                                {
                                                    label: "Active",
                                                    value: "active",
                                                },
                                                {
                                                    label: "Inactive",
                                                    value: "inactive",
                                                },
                                            ]}
                                            placeholder="Select Status"
                                        />
                                        <InputError
                                            message={errors.active_status}
                                        />
                                    </div>
                                    {/* Company Name */}

                                    <div className="col-span-12">
                                        <InputLabel
                                            htmlFor="address"
                                            value="Street Address"
                                        />
                                        <TextArea
                                            id="address"
                                            value={data.address || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full "
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5 grid grid-cols-12 gap-5">
                                    <div className="form-heading col-span-12 pb-2 mb-3 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                        <IoShareSocial className="text-[25px] text-custgreen" />
                                        <h2 className="text-black text-[18px] sm:text-[20px] font-semibold dark:text-white">
                                            Company Social Links
                                        </h2>
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="facebook"
                                            value="Facebook Link"
                                        />
                                        <TextInput
                                            id="facebook"
                                            type="url"
                                            value={data.facebook}
                                            onChange={(e) =>
                                                setData(
                                                    "facebook",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.facebook} />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="twitter"
                                            value="Twitter Link"
                                        />
                                        <TextInput
                                            id="twitter"
                                            type="url"
                                            value={data.twitter}
                                            onChange={(e) =>
                                                setData(
                                                    "twitter",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.twitter} />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="linkedin"
                                            value="Linkedin Link"
                                        />
                                        <TextInput
                                            id="linkedin"
                                            type="url"
                                            value={data.linkedin}
                                            onChange={(e) =>
                                                setData(
                                                    "linkedin",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.linkedin} />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="instagram"
                                            value="Instagram Link"
                                        />
                                        <TextInput
                                            id="instagram"
                                            type="url"
                                            value={data.instagram}
                                            onChange={(e) =>
                                                setData(
                                                    "instagram",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError
                                            message={errors.instagram}
                                        />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="skype"
                                            value="Skype"
                                        />
                                        <TextInput
                                            id="skype"
                                            type="url"
                                            value={data.skype}
                                            onChange={(e) =>
                                                setData("skype", e.target.value)
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.skype} />
                                    </div>
                                    <div className="col-span-12  xl:col-span-6">
                                        <InputLabel
                                            htmlFor="whatsapp"
                                            value="Whatsapp"
                                        />
                                        <TextInput
                                            id="whatsapp"
                                            type="number"
                                            value={data.whatsapp}
                                            onChange={(e) =>
                                                setData(
                                                    "whatsapp",
                                                    e.target.value
                                                )
                                            }
                                            className="focus:ring-0 border border-[#E6EAED] rounded-md w-full transition-all duration-500"
                                        />
                                        <InputError message={errors.whatsapp} />
                                    </div>
                                </div>

                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-primary mt-5 grid grid-cols-12 gap-5">
                                    <div className="form-heading col-span-12 pb-2 mb-3 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                        <IoIosInformationCircleOutline className="text-[25px] text-custgreen" />
                                        <h2 className="text-black text-[18px] sm:text-[20px] font-semibold dark:text-white">
                                            Company Description
                                        </h2>
                                    </div>
                                    {/* desc */}
                                    <div className="col-span-12">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />
                                        <TextArea
                                            id="description"
                                            value={data.description || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full "
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="flex items-center gap-4 mt-5">
                                    <PrimaryButton auth={auth}>
                                        Save
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    ></Transition>
                                    <PrimaryButton
                                        auth={auth}
                                        onClick={() =>
                                            router.visit(route("dashboard"))
                                        }
                                    >
                                        Cancel
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
