import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function JobApprovals() {
    const { auth, jobs } = usePage().props;
    const [jobList, setJobList] = useState(jobs);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [denyReason, setDenyReason] = useState('');

    const handleApprove = async (id) => {
        await axios.post(`/admin/jobs/${id}/approve`);
        setJobList((prev) => prev.filter((job) => job.id !== id));
    };
    const handleDisapprove = async (id) => {
        await axios.post(`/admin/jobs/${id}/disapprove`);
        setJobList((prev) => prev.filter((job) => job.id !== id));
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
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setShowModal(true);
                                            }}
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
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-[400px] rounded bg-white p-6 shadow-md">
                            <h3 className="mb-2 text-lg font-semibold">
                                Reason for Denial
                            </h3>
                            <textarea
                                value={denyReason}
                                onChange={(e) => setDenyReason(e.target.value)}
                                className="mb-4 w-full rounded border px-2 py-1"
                                rows="4"
                                placeholder="Enter reason..."
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="rounded bg-gray-300 px-3 py-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        await axios.post(
                                            `/admin/jobs/${selectedJob.id}/disapprove`,
                                            {
                                                title: selectedJob.title,
                                                description:
                                                    selectedJob.description,
                                                reason: denyReason,
                                            },
                                        );
                                        setJobList((prev) =>
                                            prev.filter(
                                                (job) =>
                                                    job.id !== selectedJob.id,
                                            ),
                                        );
                                        setShowModal(false);
                                        setDenyReason('');
                                        setSelectedJob(null);
                                    }}
                                    className="rounded bg-red-600 px-3 py-1 text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
