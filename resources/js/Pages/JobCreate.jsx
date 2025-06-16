import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

const JobCreate = () => {
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
        <div>
            <h1>Add a new job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Job Title</label> <br />
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>

                <div>
                    <label>Description</label><br />
                    <textarea value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <button type='submit'>Add Job</button>
            </form>
        </div>
    );
};
export default JobCreate;
