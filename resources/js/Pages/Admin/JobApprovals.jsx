import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function JobApprovals() {
    const { auth, jobs } = usePage().props;
    const [jobList, setJobList] = useState(jobs);



   const handleApprove = async (id) => {
    await axios.post(`/admin/jobs/${id}/approve`);
    setJobList(prev => prev.filter(job => job.id !== id));
};
    const handleDisapprove = async (id) => {
    await axios.post(`/admin/jobs/${id}/disapprove`);
    setJobList(prev => prev.filter(job => job.id !== id));
};
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-bold">Pending Job Approvals</h2>
            }
        >
            <Head title="Admin - Job Approvals" />

            <div className="p-6">
               {jobList.length === 0 ? (
                    <p className="text-gray-600">No pending jobs found.</p>
                ) : (
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">
                                    Description
                                </th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobList.map((job) => (

                                <tr key={job.id}>
                                    <td className="border px-4 py-2">
                                        {job.id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {job.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {job.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() =>
                                                handleApprove(job.id)
                                            }
                                            className="mx-2 rounded bg-teal-500 px-3 py-1 text-white hover:bg-teal-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDisapprove(job.id)
                                            }
                                            className="mx-2 rounded bg-red-700 px-3 py-1 text-white hover:bg-teal-700"
                                        >
                                            Deny
                                        </button>
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
