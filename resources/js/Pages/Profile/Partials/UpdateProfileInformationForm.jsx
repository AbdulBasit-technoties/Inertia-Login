import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";

export default function UpdateProfileInformation({
    profile,
    mustVerifyEmail,
    status,
    countries,
    auth,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        progress,
        recentlySuccessful,
    } = useForm({
        name: profile?.first_name ?? user.name ?? "",
        last_name: profile?.last_name ?? "",
        phone: profile?.phone ?? "",
        country_id: profile?.country_id ?? "",
        city: profile?.city ?? "",
        state: profile?.state ?? "",
        zip_code: profile?.zip_code ?? "",
        account: profile?.account ?? "",
        nic: profile?.nic ?? "",
        dob: profile?.dob ?? "",
        guardian_phone: profile?.guardian_phone ?? "",
        address: profile?.address ?? "",
        email: profile?.email ?? user.email ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update", auth.user?.profile.id));
    };

    const roles = auth.user.roles.map((role) => role.name);

    return (
        <section className={className}>
            <form onSubmit={submit}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="name" value="First Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.name}
                            type="text"
                            onChange={(e) => setData("name", e.target.value)}
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.last_name}
                            type="text"
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            isFocused
                            autoComplete="last_name"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.last_name}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="phone" value="Phone" />

                        <TextInput
                            id="phone"
                            type="number"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            autoComplete="phone"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.password}
                        />
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="country_id" value="Country" />

                        <SelectComponent
                            id="country_id"
                            value={data.country_id}
                            onChange={(e) => setData("country_id", e)}
                            options={countries}
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            darkBgClass="dark:!bg-custdarkbg"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.country_id}
                        />
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="city" value="City" />

                        <TextInput
                            id="city"
                            type="text"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                            autoComplete="city"
                        />

                        <InputError className="mt-2" message={errors.city} />
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="state" value="State" />

                        <TextInput
                            id="state"
                            type="text"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.state}
                            onChange={(e) => setData("state", e.target.value)}
                            autoComplete="state"
                        />

                        <InputError className="mt-2" message={errors.state} />
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="zip_code" value="Zip Code" />

                        <TextInput
                            id="zip_code"
                            type="text"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.zip_code}
                            onChange={(e) =>
                                setData("zip_code", e.target.value)
                            }
                            autoComplete="zip_code"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.zip_code}
                        />
                    </div>
                    {roles.includes("Client") ? (
                        ""
                    ) : (
                        <>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <InputLabel htmlFor="account" value="Account" />

                                <TextInput
                                    id="account"
                                    type="number"
                                    className="mt-1 block w-full dark:!bg-custdarkbg"
                                    value={data.account}
                                    onChange={(e) =>
                                        setData("account", e.target.value)
                                    }
                                    autoComplete="account"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.account}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <InputLabel htmlFor="nic" value="Cnic" />

                                <TextInput
                                    id="nic"
                                    type="number"
                                    className="mt-1 block w-full dark:!bg-custdarkbg"
                                    value={data.nic}
                                    onChange={(e) =>
                                        setData("nic", e.target.value)
                                    }
                                    autoComplete="nic"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.nic}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <InputLabel
                                    htmlFor="dob"
                                    value="Date Of Birth"
                                />

                                <TextInput
                                    id="dob"
                                    type="date"
                                    className="mt-1 block w-full dark:!bg-custdarkbg"
                                    value={data.dob}
                                    onChange={(e) =>
                                        setData("dob", e.target.value)
                                    }
                                    autoComplete="dob"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.dob}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <InputLabel
                                    htmlFor="guardian_phone"
                                    value="Guardian Phone"
                                />

                                <TextInput
                                    id="guardian_phone"
                                    type="number"
                                    className="mt-1 block w-full dark:!bg-custdarkbg"
                                    value={data.guardian_phone}
                                    onChange={(e) =>
                                        setData(
                                            "guardian_phone",
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="guardian_phone"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.guardian_phone}
                                />
                            </div>
                        </>
                    )}

                    <div className="col-span-12">
                        <InputLabel htmlFor="address" value="Address" />

                        <TextArea
                            id="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                        />
                        <InputError className="mt-2" message={errors.address} />
                    </div>
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 mt-5">
                    <PrimaryButton disabled={processing || progress}>
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

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease"
                        enterFrom="opacity-0"
                        leave="transition ease"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
