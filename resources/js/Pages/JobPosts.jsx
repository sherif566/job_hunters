import { Link } from '@inertiajs/react';
const JobPosts = ({ jobPosts }) => {
    return (
        <div>
            <Link href="/job-posts/create">
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    Add a Job
                </button>{' '}
            </Link>
            <h1>Job Listings</h1>
            {jobPosts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
};

export default JobPosts;
