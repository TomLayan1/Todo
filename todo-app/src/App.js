import React, { useEffect, useState } from 'react'

const App = () => {

  // Get listData from localStorage
  // If listData array is empty, return an empty array
  const [listData, setListData] = useState(() => {
    const savedList = localStorage.getItem('listData');
    return savedList ? JSON.parse(savedList) : []
  });

  // Save listData to localStorage
  useEffect(() => {
    localStorage.setItem('listData', JSON.stringify(listData))
  }, [listData])

  const [list, setList] = useState( {task: '', dueDate: ''} );

  // To get input values
  const handleChange = (e) => {
    setList(prevList => ({...prevList, [e.target.name]: e.target.value}));
  }

  // The initial state of list is { task: '', dueDate: '' }
  // When handleAddingList is called, it immediately adds this empty state to the toDoData array before any inputs are filled out.
  // Add a check to ensure that both task and dueDate are not empty before adding the item to the list.
  const handleAddingList = (e) => {
    e.preventDefault();
    if(list.task.trim() && list.dueDate.trim()) {
      setListData(prevData => ([...prevData, list]));
      setList({task: '', dueDate: ''});
    }
  }

  // To remove list
  const handleDelete = (index) => {
    setListData(prevData => prevData.filter((_, i) => i !== index))
  }

  return (
    <div className='py-7 px-7 bg-slate-900 w-[45%]'>
      <h1 className='text-gray-400 text-3xl font-bold text-center mb-6'>TODO LIST</h1>
      <div className='w-full'>
        <form className='w-full m-auto' onSubmit={handleAddingList}>
          <div className='w-full flex items-center gap-6 mb-5'>
            <input
              onChange={handleChange}
              type='text'
              name='task'
              value={list.task}
              placeholder='Enter List'
              className='border border-slate-700 rounded-lg w-[320px] py-2 px-1 text-sm'
            />

            <input
              onChange={handleChange}
              type='date'
              name='dueDate'
              value={list.dueDate}
              className='border border-slate-700 rounded-lg w-[120px] py-2 px-1 text-sm'  
            />
            <button className='bg-green-700 text-base w-[100px] py-2 rounded-lg'>Add</button>
          </div>
        </form>
        <p className='text-gray-400 text-sm mb-1'>Lists</p>
        <div>
        {listData.map((listData, index) => {
          return (
            <div key={index} className='border border-slate-700 w-full flex items-start gap-6 mb-5'>
              <p className='text-gray-400 text-base w-[320px] py-2 px-1'>{listData.task}</p>
              <p className='text-gray-400 text-base w-[120px] py-2 px-1'>{listData.dueDate}</p>
              <button onClick={() => handleDelete(index)} className='bg-red-700 text-base w-[100px] py-2 px-4 rounded-lg'>Delete</button>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}

export default App