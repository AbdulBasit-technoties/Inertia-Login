import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState, useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, progress } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    return (
        <section className={className}>
            <header>
                <h2 className="text-custblack text-[22px] dark:text-secondary capitalize">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-custblack dark:text-secondary/90">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-5">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />
                    <div className="relative">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type={showPassword ? "text" : "password"}
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                        >
                            {showPassword ? (
                                <FaRegEye size={18} />
                            ) : (
                                <FaRegEyeSlash size={18} />
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type={showConfirmPassword ? "text" : "password"}
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                        >
                            {showConfirmPassword ? (
                                <FaRegEye size={18} />
                            ) : (
                                <FaRegEyeSlash size={18} />
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type={showNewPassword ? "text" : "password"}
                            className="mt-1 block w-full dark:!bg-custdarkbg"
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary dark:text-secondary"
                        >
                            {showNewPassword ? (
                                <FaRegEye size={18} />
                            ) : (
                                <FaRegEyeSlash size={18} />
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
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
                </div>
            </form>
        </section>
    );
}
