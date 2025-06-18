import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
       <div className="flex min-h-screen w-full">
            <img
                src="/logo.png"
                alt="Job Hunters Logo"
                className="absolute left-1/2 top-[20%] z-10 h-[400px] -translate-x-1/2 -translate-y-1/2 transform drop-shadow-xl"
            />
            {/* left part of the login page */}
            <div className="flex w-1/2 flex-col items-center justify-center bg-white">
                <h2 className="mb-2 text-3xl font-bold text-gray-800">
                    Create your account
                </h2>

                <div className="mb-6 flex w-full max-w-xs items-center">
                    <hr className="flex-grow border border-gray-300" />
                </div>

                <form onSubmit={submit} className="w-full max-w-xs">
                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-teal-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-teal-400"
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-teal-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password Confirmation"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-teal-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mb-2 w-full rounded-md bg-teal-500 py-2 font-semibold text-white transition duration-200 hover:bg-teal-600"
                    >
                        Sign Up
                    </button>
                </form>


            </div>

            {/* right part of the login page */}
            <div className="flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-green-400 to-teal-500 p-12 text-white">
                <h2 className="mb-4 text-3xl font-bold"> Welcome to Job Hunters !</h2>

                <p className="mb-6 px-6 text-center text-sm">
                    If you already have an account, just log in. We've missed you !
                </p>

                <a
                    className="rounded-full bg-white px-6 py-2 font-semibold text-teal-500 shadow transition duration-200 hover:bg-gray-100"
                    href="/login"
                >
                    Login
                </a>
            </div>
        </div>
    );
}
