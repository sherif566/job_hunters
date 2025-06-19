import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);

    return (
                <>

            <nav className="border-b border-gray-200 bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* 🔹 Logo + Navigation Links */}
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="text-xl font-bold text-teal-600"
                            >
                                Job Hunters
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className="font-medium text-gray-700 hover:text-teal-600"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/job-posts"
                                className="font-medium text-gray-700 hover:text-teal-600"
                            >
                                Jobs
                            </Link>
                            <Link
                                href="/job-posts/create"
                                className="font-medium text-gray-700 hover:text-teal-600"
                            >
                                Add Job
                            </Link>
                        </div>

                        {/* 🔸 User dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <UserCircleIcon className="h-6 w-6 text-gray-600" />
                                <span className="text-sm text-gray-600">{user.name}</span>
                                <ChevronDownIcon
                                    className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                                        open ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </nav>

            <main className="py-6 px-4">{children}</main>
</>
    );
}
