import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function Login_Admin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    document.getElementById("my_modal_admin").close(); // Close modal on successful form submission
  };

  const handleCloseModal = (event) => {
    event.preventDefault(); // Prevent form submission
    document.getElementById("my_modal_admin").close(); // Close modal
  };

  return (
    <div>
      <dialog id="my_modal_admin" className="modal">
  <div className="modal-box  dark:bg-slate-900 dark:text-white">
  <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      {/*<Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> document.getElementById("my_modal_admin").showModal()}>✕</Link>*/}
      {/*<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>*/}
      <button
              type="button"
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={handleCloseModal}
            >
              ✕
            </button>
    
  <h3 className="font-bold text-lg cursor-default">Admin Login</h3>

    <div className='mt-4 space-y-2'>
      <span>Admin-Name</span>
      <br/>
      <input 
      type='text'
      placeholder='Enter Admin-name'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'{...register("text", { required: true })}/>
      <br/>
      {errors.text && <span className="text-sm text-red-500">This field is required</span>}
    </div>

    <div className='mt-4 space-y-2'>
      <span>Admin-ID</span>
      <br/>
      <input 
      type='text'
      placeholder='Enter Admin-id'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'{...register("text1", { required: true })}/>
      <br/>
      {errors.text1 && <span className="text-sm text-red-500">This field is required</span>}
    </div>

    <div className='mt-4 space-y-2'>
      <span>Password</span>
      <br/>
      <input 
      type='password'
      placeholder='Enter Password'
      className='w-80 px-3 py-1 border rounded-md outline-none dark:text-slate-900'{...register("password", { required: true })}/>
      <br/>
      {errors.password && <span className="text-sm text-red-500">This field is required</span>}
    </div>

    <div className='flex justify-around mt-4'>
    <button className='bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-300 cursor-pointer'>Login</button>
    
</div>
</form>
  </div>
</dialog>
    </div>
  );
}

export default Login_Admin;
