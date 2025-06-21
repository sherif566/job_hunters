import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function MyJobs() {
    const { auth, jobs } = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="text-xl font-bold">My Job Posts</h2>}
        >
            <Head title="My Jobs" />

            <div className="p-6">
                {jobs.length === 0 ? (
                    <p className="text-gray-600">
                        You have not posted any jobs yet.
                    </p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">
                                    Description
                                </th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="border px-4 py-2">
                                        {job.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {job.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {job.status === 'approved'
                                            ? '✅ Approved'
                                            : job.status === 'denied'
                                              ? '❌ Denied'
                                              : '🕓 Pending'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
