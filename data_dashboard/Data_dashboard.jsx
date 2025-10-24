import React, { useMemo, useState } from 'react'
import useApifetch from '../Custom__Hook/useApifetch';
import { Button, Dropdown } from 'bootstrap';
import { FaCaretDown, FaFileSignature } from 'react-icons/fa';
import { CgChevronUp } from "react-icons/cg";
import anime from '../../assets/anime.gif';
import Localstorage from '../Custom__Hook/Localstorage';
import PostCard from './PostCard';

const Data_dashboard = () => {
    const [search, setSearch] = Localstorage('search', '');  // custom hook
    const [opendrop, setOpendrop] = useState(false)
    const [sort, setSort] = useState(false);
    const [ItemPerPage, setItemPerPage] = Localstorage("Item", 10) // custom hook
    const [sortopen, setSortOpen] = useState(false);

    const { data, isLoading, error } = useApifetch("all_posts", `https://jsonplaceholder.typicode.com/posts?_limit=100`); // custom hook

    const FilterData = useMemo(() => {
        if (!data || !Array.isArray(data)) { // if the data is not array or data is null then return empty array
            return [];
        }
        return data.filter((item) =>  // search feature
            item.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    const SortedData = useMemo(() => { // Sort Method for the Data Title
        if (!sort) {
            return FilterData;
        }
        return [...FilterData].sort((a, b) => a.title.localeCompare(b.title)); // ilocalcompare is to sort the data in ascending order
    }, [FilterData, sort])

    if (isLoading) {
        return <p className='flex justify-center items-center h-screen'><img src={anime} alt="" /></p>
    }

    if (error) {
        return <span>Error: {error.message}</span>;
    }
    const Handlefilter = (num) => {
        setItemPerPage(num === 'all' ? 100 : num)
        setOpendrop(false);
    }

    const displayData = SortedData.slice(0, ItemPerPage);

    const HandleSortAZ = () => {
        setSort(true);
        setSortOpen(false);
    }

    const HandleSortReset = () => {
        setSort(false);
        setSortOpen(false);
    }

    const HandleSortOpen = () => {
        setSortOpen(!sortopen);
    }

    return (
        <div className='flex flex-col p-4 gap-2'>
            <div className='flex justify-between items-center gap-10'>
                <div>
                    <h4>User data</h4>
                </div>

                <div className='p-1 border rounded-full flex items-center justify-center px-2'>
                    <input
                        placeholder='Search...'
                        className='focus:outline-none'
                        type="text"
                        onChange={(event) => setSearch(event.target.value)}
                        value={search}
                    />
                    <div className='relative'>
                        <div className='cursor-pointer' onClick={() => setOpendrop(!opendrop)}>
                            {
                                opendrop
                                    ?
                                    <CgChevronUp />
                                    :
                                    <FaCaretDown />
                            }
                        </div>
                        <div>
                            {opendrop
                                &&
                                <div className='absolute border bg-gray-50 rounded-md'>
                                    <div
                                        className={`${ItemPerPage === 10 ? 'bg-gray-800 text-white' : ''} cursor-pointer border py-1 px-2`}
                                        onClick={() => Handlefilter(10)}>10</div>
                                    <div
                                        className={`${ItemPerPage === 20 ? 'bg-gray-800 text-white' : ""} cursor-pointer border py-1 px-2`}
                                        onClick={() => Handlefilter(20)}>20</div>
                                    <div
                                        className={` ${ItemPerPage === 50 ? 'bg-gray-800 text-white' : ""} cursor-pointer border  py-1 px-2`}
                                        onClick={() => Handlefilter(50)}>50</div>
                                    <div
                                        className={` ${ItemPerPage === "all" ? 'bg-gray-800 text-white' : ""} cursor-pointer border  py-1 px-2`}
                                        onClick={() => Handlefilter('all')}>all</div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {/* Sort Posts by Title */}
                    <div className='relative flex items-center justify-center gap-1'>
                        Sort By:
                        <div
                            className='cursor-pointer'
                            onClick={HandleSortOpen}
                        >
                            {sortopen ? <CgChevronUp /> : <FaCaretDown />}
                        </div>
                        <div className='absolute '>
                            {
                                sortopen
                                &&
                                <div className='absolute top-5  bg-gray-300 rounded-md'>
                                    <div
                                        onClick={HandleSortAZ}
                                        className={`${sort === true ? 'bg-gray-800 text-white' : ""} text-sm p-1 px-2 cursor-pointer`}>
                                        A→Z
                                    </div>
                                    <div
                                        onClick={HandleSortReset}
                                        className={` ${sort === false ? 'bg-gray-800 text-white' : ""} text-sm p-1 px-2 cursor-pointer`}>
                                        Reset
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                <PostCard displayData={displayData} />
            </div>
        </div >
    )
}

export default Data_dashboard;