import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import { Transition } from '@headlessui/react';
export default function Show({ auth , roles }) {
    const { data, setData, post, errors, progress, recentlySuccessful } = useForm({
        name: null,
        email: null,
        password: null,
        role: null,
    });
    console.log(roles)
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('brands.store'));
    };
  return (
    <AuthenticatedLayout auth={auth}>
      <Head title="Show User" />

      <section className="max-w-xl mt-24">
        <div className="bg-white rounded-md p-6">
        <header>
            <h2 className="text-lg font-medium text-gray-900">Add User</h2>
            <p className="mt-1 text-sm text-gray-600">
                Show your user here
            </p>
        </header>
        <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        type="text"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="password"
                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="Role" />

                    <select
                        id="role"
                        type="role"
                        className="mt-1 block w-full"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        required
                        isFocused
                        autoComplete="role"
                    >
                        <option disabled selected>Select Role</option>
                        {roles && roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.role} />
                </div>

                <div className="flex items-center gap-4">
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                    <PrimaryButton disabled={progress}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Add Brand</p>
                    </Transition>
                </div>
            </form>
            </div>
        </section>
    </AuthenticatedLayout>
  );
}
