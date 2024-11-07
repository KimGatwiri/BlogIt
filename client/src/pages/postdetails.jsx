import { useParams } from 'react-router-dom';
import React from 'react'
import { API_BASE } from '../utils/apibase';
import { useQuery } from 'react-query';

function PostDetails() {
    const { id } = useParams();
    const { isLoading, isError, error, data } = useQuery({
        queryFn: async () => {
            const response = await fetch(`${API_BASE}/postDetails/${id}`);
            if (response.ok === false) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const data = await response.json();
            return data;
        }
    });

    if (isLoading) {
        return (<h2 className='text-3xl text-center font-semibold mt-5'>Loading... Please Wait..</h2>);
    }

    if (isError) {
        return (<h2 className='text-3xl text-center font-semibold mt-5 text-red-500'>{error.message}</h2>);
    }

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                    <p className="text-lg font-semibold">Author: {data.user.firstName} {data.user.lastName}</p>
                    <p className="text-sm text-gray-500">Last Updated: {new Date(data.updatedAt).toDateString()}</p>
                </div>

                <h2 className="text-4xl font-bold text-center text-blue-600 mb-5">{data.title}</h2>
                <p className="text-lg text-gray-700 mb-5">{data.excerpt}</p>
                
                <div className="prose lg:prose-xl text-gray-800 mb-8" dangerouslySetInnerHTML={{ __html: data.body }} />
            </div>
        </div>
    );
}

export default PostDetails;
