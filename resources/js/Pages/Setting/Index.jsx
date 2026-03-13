import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectComponent from "@/Components/SelectComponent";
import { IoIosInformationCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettings, IoShareSocial } from "react-icons/io5";
import { useState } from "react";
import TextArea from "@/Components/TextArea";
export default function Index({ auth, setting, countries }) {
    const { data, setData, patch, errors, progress, processing } = useForm({
        name: setting.name ?? "",
        email_primary: setting.email_primary ?? "",
        email_secondary: setting.email_secondary ?? "",
        phone_primary: setting.phone_primary ?? "",
        phone_secondary: setting.phone_secondary ?? "",
        country: setting.country ?? "",
        city: setting.city ?? "",
        state: setting.state ?? "",
        zip_code: setting.zip_code ?? "",
        address: setting.address ?? "",
        description: setting.description ?? "",
        meta_title: setting.meta_title ?? "",
        whatsapp_number: setting.whatsapp_number ?? "",
        facebook: setting.facebook ?? "",
        twitter: setting.twitter ?? "",
        instagram: setting.instagram ?? "",
        linkedin: setting.linkedin ?? "",
        youtube: setting.youtube ?? "",
        tiktok: setting.tiktok ?? "",
        mail_mailer: setting.mail_mailer ?? "",
        mail_host: setting.mail_host ?? "",
        mail_port: setting.mail_port ?? "",
        mail_username: setting.mail_username ?? "",
        mail_password: setting.mail_password ?? "",
        mail_encryption: setting.mail_encryption ?? "",
        mail_from_address: setting.mail_from_address ?? "",
        mail_from_name: setting.mail_from_name ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("settings.update", setting.id));
    };
    const [isTab, setIsTab] = useState("Logo");
    return (
        <AuthenticatedLayout title="Settings" auth={auth}>
            <Head title="Settings" />
            <section className="max-w-full">
                <div className="create-form">
                    <div className="dash-title mb-[20px]">
                        <h2 className="text-custblack text-[22px] dark:text-secondary">Overview</h2>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="xl:col-span-4 md:col-span-5 col-span-12">
                            <ul className="bg-custbg rounded-lg p-5 flex flex-col gap-5 dark:bg-primary">
                                <li
                                    className={`${isTab === "Logo"
                                        ? "bg-custgreen text-white"
                                        : ""
                                        } flex text-[16px] items-center gap-2 px-4 py-3 border-custgreen rounded-lg border cursor-pointer transition-all duration-200 hover:border-custgreen dark:text-secondary`}
                                    onClick={(e) => setIsTab("Logo")}
                                >
                                    <IoSettings
                                        className={`${isTab === "Logo"
                                            ? "text-white"
                                            : "text-custgreen"
                                            }`}
                                    />
                                    Logo & Favicon
                                </li>
                                <li
                                    className={`${isTab === "General"
                                        ? "bg-custgreen text-white"
                                        : ""
                                        } flex text-[16px] items-center gap-2 px-4 py-3 border-custgreen rounded-lg border cursor-pointer transition-all duration-200 hover:border-custgreen dark:text-secondary`}
                                    onClick={(e) => setIsTab("General")}
                                >
                                    <IoSettings
                                        className={`${isTab === "General"
                                            ? "text-white"
                                            : "text-custgreen"
                                            }`}
                                    />
                                    General
                                </li>
                                <li
                                    className={`${isTab === "Company Address"
                                        ? "bg-custgreen text-white"
                                        : ""
                                        } flex text-[16px] items-center gap-2 px-4 py-3 border-custgreen rounded-lg border cursor-pointer transition-all duration-200 hover:border-custgreen dark:text-secondary`}
                                    onClick={(e) => setIsTab("Company Address")}
                                >
                                    <IoSettings
                                        className={`${isTab === "Company Address"
                                            ? "text-white"
                                            : "text-custgreen"
                                            }`}
                                    />
                                    Company Address
                                </li>
                                <li
                                    className={`${isTab === "Social Links"
                                        ? "bg-custgreen text-white"
                                        : ""
                                        } flex text-[16px] items-center gap-2 px-4 py-3 border-custgreen rounded-lg border cursor-pointer transition-all duration-200 hover:border-custgreen dark:text-secondary`}
                                    onClick={(e) => setIsTab("Social Links")}
                                >
                                    <IoSettings
                                        className={`${isTab === "Social Links"
                                            ? "text-white"
                                            : "text-custgreen"
                                            }`}
                                    />
                                    Social Links
                                </li>
                                <li
                                    className={`${isTab === "Mail Setting"
                                        ? "bg-custgreen text-white"
                                        : ""
                                        } flex text-[16px] items-center gap-2 px-4 py-3 border-custgreen rounded-lg border cursor-pointer transition-all duration-200 hover:border-custgreen dark:text-secondary`}
                                    onClick={(e) => setIsTab("Mail Setting")}
                                >
                                    <IoSettings
                                        className={`${isTab === "Mail Setting"
                                            ? "text-white"
                                            : "text-custgreen"
                                            }`}
                                    />
                                    Mail Setting
                                </li>
                            </ul>
                        </div>
                        <div className="xl:col-span-8 md:col-span-7 col-span-12">
                            {isTab === "Logo" && (
                                <div className="bg-custbg rounded-lg p-5 items-center grid grid-cols-1 md:gap-5 gap-3 dark:bg-primary">
                                    <div className="form-heading col-span-12 pb-2 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                        <IoIosInformationCircleOutline className="text-[25px] text-primary dark:text-secondary" />
                                        <h2 className="text-black sm:text-[20px] font-semibold dark:text-secondary">
                                            Change Logo
                                        </h2>
                                    </div>
                                    <div className="col-span-12 items-center gap-2">
                                        <div className="grid xl:grid-cols-2 grid-cols-1">
                                            <div className="grid grid-cols-12 gap-2 items-center">
                                                <div className="col-span-4 md:mb-0 mb-2 border border-gray-200 p-2 rounded-md">
                                                    <img
                                                        src={
                                                            setting.logo
                                                                ? setting.logo
                                                                : "/images/logo-dummy.jpg"
                                                        }
                                                        alt="Company Logo"
                                                        className="w-full object-cover h-full"
                                                    />
                                                </div>
                                                <div className="col-span-8">
                                                    <TextInput
                                                        id="logo"
                                                        name="logo"
                                                        className="block w-full !rounded !text-black text-xs bg-white file:!bg-primary file:text-white md:file:px-3 md:file:py-2 py-1 file:rounded-md file:border-0 file:cursor-pointer file:hover:bg-primary file:text-xs !outline-0 !ring-0 !ring-offset-0"
                                                        isFocused
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target.files[0];
                                                            if (file) {
                                                                const formData =
                                                                    new FormData();
                                                                formData.append(
                                                                    "logo",
                                                                    file
                                                                );
                                                                formData.append(
                                                                    "setting_id",
                                                                    setting.id
                                                                );

                                                                router.post(
                                                                    route(
                                                                        "settings.image",
                                                                        setting.id
                                                                    ),
                                                                    formData,
                                                                    {
                                                                        forceFormData: true,
                                                                        onSuccess:
                                                                            () => { },
                                                                        onError: (
                                                                            errors
                                                                        ) => { },
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                        type="file"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-2 items-center">
                                                <div className="col-span-4 md:mb-0 mb-2 p-2 rounded-md">
                                                    <img
                                                        src={
                                                            setting.favicon
                                                                ? setting.favicon
                                                                : "/images/logo-dummy.jpg"
                                                        }
                                                        alt="Company Favicon"
                                                        className="w-[50px] mx-auto object-cover h-full"
                                                    />
                                                </div>
                                                <div className="col-span-8">
                                                    <TextInput
                                                        id="favicon"
                                                        name="favicon"
                                                        className="!block w-full !rounded !text-black text-xs bg-white file:!bg-primary file:text-white md:file:px-3 md:file:py-2 py-1 file:rounded-md file:border-0 file:cursor-pointer file:hover:bg-primary file:text-xs !outline-0 !ring-0 !ring-offset-0"
                                                        isFocused
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target.files[0];
                                                            if (file) {
                                                                const formData =
                                                                    new FormData();
                                                                formData.append(
                                                                    "favicon",
                                                                    file
                                                                );
                                                                formData.append(
                                                                    "setting_id",
                                                                    setting.id
                                                                );

                                                                router.post(
                                                                    route(
                                                                        "settings.favicon",
                                                                        setting.id
                                                                    ),
                                                                    formData,
                                                                    {
                                                                        forceFormData: true,
                                                                        onSuccess:
                                                                            () => { },
                                                                        onError: (
                                                                            errors
                                                                        ) => { },
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                        type="file"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                            <form onSubmit={submit} className="bg-custbg rounded-lg p-5 items-center dark:bg-primary">
                                {isTab === "General" && (
                                    <div className="grid grid-cols-12 md:gap-5 gap-3">
                                        <div className="form-heading col-span-12 pb-2 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                            <IoIosInformationCircleOutline className="text-[25px] text-primary dark:text-secondary" />
                                            <h2 className="text-black sm:text-[20px] font-semibold dark:text-secondary">
                                                General Setting
                                            </h2>
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">
                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="name"
                                                    value="Name"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="col-span-12  xl:col-span-6">
                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="email_primary"
                                                    value="Email Primary"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="email_primary"
                                                name="email_primary"
                                                type="email"
                                                value={data.email_primary}
                                                onChange={(e) =>
                                                    setData(
                                                        "email_primary",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.email_primary}
                                            />
                                        </div>

                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="email_secondary"
                                                    value="Secondary Email"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="email_secondary"
                                                name="email_secondary"
                                                type="email"
                                                value={data.email_secondary}
                                                onChange={(e) =>
                                                    setData(
                                                        "email_secondary",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.email_secondary}
                                            />
                                        </div>

                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="phone_primary"
                                                    value="Phone Primary"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
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
                                                name="phone_primary"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.phone_primary}
                                            />
                                        </div>

                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="phone_secondary"
                                                    value="Phone Secondary"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
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
                                                name="phone_secondary"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.phone_secondary}
                                            />
                                        </div>

                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="meta_title"
                                                    value="Meta Title"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="meta_title"
                                                name="meta_title"
                                                type="text"
                                                value={data.meta_title}
                                                onChange={(e) =>
                                                    setData(
                                                        "meta_title",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.meta_title}
                                            />
                                        </div>

                                        <div className="col-span-12">
                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="description"
                                                    value="Description"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextArea
                                                id="description"
                                                name="description"
                                                value={data.description || ""}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>
                                    </div>
                                )}
                                {isTab === "Company Address" && (
                                    <div className="grid grid-cols-12 md:gap-5 gap-3">
                                        <div className="form-heading col-span-12 pb-2 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                            <IoIosInformationCircleOutline className="text-[25px] text-primary dark:text-secondary" />
                                            <h2 className="text-black sm:text-[20px] font-semibold dark:text-secondary">
                                                Company Address
                                            </h2>
                                        </div>
                                      <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="country"
                                                    value="Country"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="country"
                                                name="country"
                                                type="text"
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "country",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError message={errors.country} />
                                        </div>
                                        
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="city"
                                                    value="City"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        "city",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError message={errors.city} />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="state"
                                                    value="State"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="state"
                                                name="state"
                                                type="text"
                                                value={data.state}
                                                onChange={(e) =>
                                                    setData(
                                                        "state",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.state}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="zip_code"
                                                    value="Zip Code"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="zip_code"
                                                name="zip_code"
                                                type="number"
                                                value={data.zip_code}
                                                onChange={(e) =>
                                                    setData(
                                                        "zip_code",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.zip_code}
                                            />
                                        </div>
                                        <div className="col-span-12">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="Address"
                                                    value="Address"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextArea
                                                id="address"
                                                name="address"
                                                value={data.address || ""}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.address}
                                            />
                                        </div>

                                    </div>
                                )}
                                {isTab === "Social Links" && (
                                    <div className="grid grid-cols-12 md:gap-5 gap-3">
                                        <div className="form-heading col-span-12 pb-2 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                            <IoShareSocial className="text-[25px] text-primary dark:text-secondary" />
                                            <h2 className="text-black sm:text-[20px] font-semibold dark:text-secondary">
                                                Company Social Links
                                            </h2>
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="facebook"
                                                    value="Facebook Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="facebook"
                                                type="url"
                                                value={data.facebook}
                                                name="facebook"
                                                onChange={(e) =>
                                                    setData(
                                                        "facebook",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.facebook}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="twitter"
                                                    value="Twitter Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="twitter"
                                                type="url"
                                                value={data.twitter}
                                                name="twitter"
                                                onChange={(e) =>
                                                    setData(
                                                        "twitter",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.twitter}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="linkedin"
                                                    value="Linkedin Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="linkedin"
                                                type="url"
                                                name="linkedin"
                                                value={data.linkedin}
                                                onChange={(e) =>
                                                    setData(
                                                        "linkedin",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.linkedin}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="instagram"
                                                    value="Instagram Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
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
                                                name="instagram"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.instagram}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="youtube"
                                                    value="Youtube Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="youtube"
                                                type="url"
                                                value={data.youtube}
                                                onChange={(e) =>
                                                    setData(
                                                        "youtube",
                                                        e.target.value
                                                    )
                                                }
                                                name="youtube"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.youtube}
                                            />
                                        </div>
                                        <div className="col-span-12  xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="tiktok"
                                                    value="Tiktok Link"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="tiktok"
                                                type="url"
                                                value={data.tiktok}
                                                onChange={(e) =>
                                                    setData(
                                                        "tiktok",
                                                        e.target.value
                                                    )
                                                }
                                                name="tiktok"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.tiktok}
                                            />
                                        </div>
                                        <div className="col-span-12">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="whatsapp_number"
                                                    value="Whatsapp Number"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="whatsapp_number"
                                                type="number"
                                                value={data.whatsapp_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "whatsapp_number",
                                                        e.target.value
                                                    )
                                                }
                                                name="whatsapp_number"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.whatsapp_number}
                                            />
                                        </div>
                                    </div>
                                )}
                                {isTab === "Mail Setting" && (
                                    <div className="grid grid-cols-12 md:gap-5 gap-3">
                                        <div className="form-heading col-span-12 pb-2 w-full flex items-center gap-2 border-b-2 border-[#E6EAED]">
                                            <IoShareSocial className="text-[25px] text-primary dark:text-secondary" />
                                            <h2 className="text-black sm:text-[20px] font-semibold dark:text-secondary">
                                                Mail Setting
                                            </h2>
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_mailer"
                                                    value="Mail Mailer"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_mailer"
                                                name="mail_mailer"
                                                type="text"
                                                value={data.mail_mailer}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_mailer",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_mailer}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_host"
                                                    value="Mail Host"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_host"
                                                name="mail_host"
                                                type="text"
                                                value={data.mail_host}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_host",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_host}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_port"
                                                    value="Mail Port"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_port"
                                                name="mail_port"
                                                type="text"
                                                value={data.mail_port}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_port",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_port}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_username"
                                                    value="Mail Username"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_username"
                                                name="mail_username"
                                                type="text"
                                                value={data.mail_username}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_username",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_username}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_password"
                                                    value="Mail Password"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_password"
                                                name="mail_password"
                                                type="text"
                                                value={data.mail_password}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_password",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_password}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_encryption"
                                                    value="Mail Encryption"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_encryption"
                                                name="mail_encryption"
                                                type="text"
                                                value={data.mail_encryption}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_encryption",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_encryption}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_from_address"
                                                    value="Mail From Address"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_from_address"
                                                type="text"
                                                value={data.mail_from_address}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_from_address",
                                                        e.target.value
                                                    )
                                                }
                                                name="mail_from_address"
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_from_address}
                                            />
                                        </div>
                                        <div className="col-span-12 xl:col-span-6">

                                            <div className="label-box flex justify-between items-center mb-2">
                                                <InputLabel
                                                    htmlFor="mail_from_name"
                                                    value="Mail From Name"
                                                />
                                                <IoMdInformationCircleOutline className="text-gray-500 text-lg" />
                                            </div>
                                            <TextInput
                                                id="mail_from_name"
                                                name="mail_from_name"
                                                type="text"
                                                value={data.mail_from_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "mail_from_name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full dark:!bg-custdarkbg"
                                            />
                                            <InputError
                                                message={errors.mail_from_name}
                                            />
                                        </div>

                                    </div>
                                )}
                                {isTab !== "Logo" && (
                                    <div className="flex items-center gap-4 mt-5">
                                        {progress && (
                                            <progress className="progress-primary" value={progress.percentage} max="100">
                                                {progress.percentage}%
                                            </progress>
                                        )}
                                        <PrimaryButton disabled={processing || progress}>
                                            {processing ? "Saving..." : "Save"}
                                        </PrimaryButton>
                                    </div>
                                )}
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}