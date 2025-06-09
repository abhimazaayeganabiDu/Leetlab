import { Bookmark, Edit, Plus, TrashIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"

const ProblemTable = ({ problems, solvedByUser }) => {
    const { authUser } = useAuthStore()


    const [search, setSearch] = useState("")
    const [difficulty, setDifficulty] = useState("ALL")
    const [tags, setTags] = useState("ALL")
    const [currPage, setCurrPage] = useState(1)

    const difficulties = ["EASY", "MEDIUM", "HARD"]
    const allTags = useMemo(() => {
        if (!Array.isArray(problems)) return []

        const tagSet = new Set()
        problems.forEach((problem) => problem.tags?.forEach((tag) => tagSet.add(tag)))
        return Array.from(tagSet)
    }, [problems])

    // filter logic
    const filteredProblem = useMemo(() => {
        return (problems || [])
            .filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()))
            .filter((problem) => difficulty === "ALL" ? true : problem.difficulty === difficulty)
            .filter((problem) => tags === "ALL" ? true : problem.tags?.includes(tags))
    }, [problems, search, difficulty, tags])

    // pagination logic
    const itemsPerPage = 5;
    const totalPage = Math.ceil(filteredProblem.length / itemsPerPage)
    const paginatedProblem = useMemo(() => {
        return filteredProblem.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage)
    }, [filteredProblem, currPage])


    return (

        <div className='w-full max-w-6xl mx-auto mt-10'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'> Problems</h2>

                <button className='btn btn-primary gap-2' onClick={() => { }}>
                    <Plus className='w-4 h-4' />
                    Create Playlist
                </button>
            </div>

            <div className='flex flex-wrap justify-between items-center mb-6 gap-4'>
                <input type="text" placeholder='Search by title' className='input input-bordered w-full md:w-1/3 bg-base-200' value={search} onChange={(e) => setSearch(e.target.value)} />

                {/* Difficulty */}
                <select className='select select-bordered bg-base-200' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="ALL" >All Difficulties</option>
                    {difficulties.map((diff) => (
                        <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>

                {/* Tags */}
                <select className='select select-bordered bg-base-200 ' value={tags} onChange={(e) => setTags(e.target.value)}>
                    <option value="ALL">
                        All Tags
                    </option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>

            </div>

            <div className='overflow-x-auto rounded-md shadow-md'>
                <table className='table table-zebra tagle-lg bg-base-200 text-base-content'>
                    <thead className='bg-base-200'>
                        <tr>
                            <th>Solved</th>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Difficulty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProblem.length > 0
                            ?
                            (
                                paginatedProblem.map((problem) => {
                                    const isSolved = solvedByUser.some((ele) => ele.problemId === problem.id)
                                    // console.log("authUser", authUser.data.role);

                                    return (
                                        <tr key={problem.id}>
                                            <td>
                                                <input type="checkbox" checked={isSolved} readOnly className='checkbox checkbox-md rounded-2xl' />
                                            </td>
                                            <td>
                                                <Link to={`/problem/${problem.id}`} className='font-semibold hover:underline'>
                                                    {problem.title}
                                                </Link>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-1'>
                                                    {(problem.tags || []).map((tag, i) => (
                                                        <span key={i} className='badge badge-outline badge-warning text-xs font-bold'>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge font-semibold text-xs text-white ${problem.difficulty === "EASY" ? "badge-success" : problem.difficulty === "MEDIUM" ? "badge-warning" : "badge-error"}`}>
                                                    {problem.difficulty}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
                                                    {authUser.data.role === "ADMIN" && (
                                                        <div className='flex gap-2'>
                                                            <button onClick={() => { }} className='btn btn-sm  rounded-2xl'>
                                                                <Edit className='w-4 h-4 text-white' />
                                                            </button>
                                                            <button onClick={() => { }} className='btn btn-sm btn-error'>
                                                                <TrashIcon className='w-3 h-3 text-white' />
                                                            </button>
                                                        </div>
                                                    )}

                                                    <button className='btn btn-sm btn-outline flex gap-2 items-center' onClick={() => handleAddToPlaylist(problem.id)}>
                                                        <Bookmark className='w-4 h-4 ' />
                                                        <span className='hidden sm:inline'> Save to Playlist</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                            :
                            (
                                <tr>
                                    <td colSpan={5} className='text-center py-6 text-gray-500'>
                                        No Problem Found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            {/* Pagination  */}
            <div className='flex justify-center mt-6 gap-2'>
                <button className='btn btn-sm hover:cursor-pointer ' disabled={currPage === 1} onClick={() => setCurrPage((prev) => prev - 1)}>
                    Prev
                    <button>
                    </button>
                </button>
                <span className='btn btn-ghost btn-sm'>
                    {currPage} / {totalPage}
                </span>
                <button className='btn btn-sm hover:cursor-pointer ' disabled={currPage === totalPage} onClick={() => setCurrPage((prev) => prev - 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default ProblemTable