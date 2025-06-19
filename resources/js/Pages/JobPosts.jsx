import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

const JobPosts = ({ jobPosts }) => {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-bold text-gray-800">Job Posts</h2>
            }
        >
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                                Title
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jobPosts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-800">
                                    {post.id}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-800">
                                    {post.title}
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-800">
                                    {post.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobPosts;
