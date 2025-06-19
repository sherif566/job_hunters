import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Welcome, {auth.user.name}!
                        </h1>

                        {/* ✅ Show Admin Section if is_admin === true */}
                        {auth.user.is_admin ? (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Admin Panel
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href={route('admin.pending.jobs')}
                                            className="text-teal-600 underline hover:text-teal-800"
                                        >
                                            Review Job Approvals
                                        </Link>
                                    </li>
                                    {/* Add more admin links here */}
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-700">
                                    You're logged in as a regular user. Browse jobs or create your own!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
