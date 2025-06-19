import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const JobCreate = () => {
    const { auth } = usePage().props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/job-posts', {
            title,
            description,
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-bold text-gray-800">Add New Job</h2>
            }
        >
            <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default JobCreate;
