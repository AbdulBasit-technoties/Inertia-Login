import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    auth,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            last_name: "",
            phone: "",
            country: "",
            city: "",
            state: "",
            zip_code: "",
            account: "",
            nic: "",
            dob: "",
            guardian_phone: "",
            address: "",
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update", auth.currentProfile));
    };

    let userRole = auth.user.roles[0].name;

    return (
        <section className={className}>
            <header>
                <h2 className="text-[18px] sm:text-[22px] font-medium text-gray-900 dark:text-white">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-secondary/90">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="name" value="First Name" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            type="text"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="phone" value="Phone" />

                        <TextInput
                            id="phone"
                            type="number"
                            className="mt-1 block w-full"
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
                        <InputLabel htmlFor="country" value="Country" />

                        <TextInput
                            id="country"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                            autoComplete="country"
                        />

                        <InputError className="mt-2" message={errors.country} />
                    </div>

                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="city" value="City" />

                        <TextInput
                            id="city"
                            type="text"
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
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
                            type="number"
                            className="mt-1 block w-full"
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
                    {userRole === "Client" ? (
                        ""
                    ) : (
                        <>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <InputLabel htmlFor="account" value="Account" />

                                <TextInput
                                    id="account"
                                    type="number"
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
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
                                    className="mt-1 block w-full"
                                    value={data.guardian_phone}
                                    onChange={(e) =>
                                        setData(
                                            "guardian_phone",
                                            e.target.value
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
                            className="mt-1 block w-full"
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
