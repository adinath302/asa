import React, { useMemo } from 'react'

const PostCard = ({ displayData }) => {
    const PostCards = useMemo(() => {  // step 1

        if (displayData.length === 0) {   // convet the ternery operator into if/else 
            return (
                <div className='col-span-full text-center text-gray-500 font-semibold' >
                    No results found
                </div>
            );
        }

        return displayData.map((item) => (    // return 
            <div
                key={item.id}
                className='max-w-[300px] border p-2 bg-gray-200 rounded-md'
            >
                <div className='font-semibold text-[20px]'>{item.title}</div>
                <p className='font-light text-[13px]'>{item.body}</p>
            </div>
        ));
    }, [displayData]) // The dependency array contains `displayData`
    
    return (
        <>
            {PostCards}
        </>
    )

}
export default PostCard