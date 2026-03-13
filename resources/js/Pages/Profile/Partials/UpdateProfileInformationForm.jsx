import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import SelectComponent from "@/Components/SelectComponent";
import TextArea from "@/Components/TextArea";
import { Gender } from "@/Components/Selection";

export default function UpdateProfileInformation({
    user,
    mustVerifyEmail,
    status,
}) {
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        progress,
        recentlySuccessful,
    } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        country: user.country ?? "",
        city: user.city ?? "",
        state: user.state ?? "",
        zip_code: user.zip_code ?? "",
        dob: user.dob ?? "",
        gender: user.gender ?? "",
        address: user.address ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update", user?.id));
    };

    return (
        <section>
            <form onSubmit={submit}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
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
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
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
                            name="phone"
                            type="number"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            autoComplete="phone"
                        />

                        <InputError className="mt-2" message={errors.phone} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="country" value="Country" />

                        <TextInput
                            id="country"
                            name="country"
                            type="text"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
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
                            name="city"
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
                            name="state"
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
                            name="zip_code"
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
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="dob" value="Date Of Birth" />

                        <TextInput
                            id="dob"
                            name="dob"
                            type="date"
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            value={data.dob}
                            onChange={(e) => setData("dob", e.target.value)}
                            autoComplete="dob"
                        />
                        <InputError className="mt-2" message={errors.dob} />
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <InputLabel htmlFor="gender" value="Gender" />
                        <SelectComponent
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={(e) => {
                                (setData("gender", e), setData("model_id", ""));
                            }}
                            options={Gender}
                            className="mt-1 block w-full text-gray-800"
                        />
                        <InputError message={errors.gender} />
                    </div>
                    <div className="col-span-12">
                        <InputLabel htmlFor="address" value="Address" />

                        <TextArea
                            id="address"
                            name="address"
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
