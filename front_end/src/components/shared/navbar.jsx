// import React from 'react'


// const Navbar = () => {
//     const { user } = useSelector(store => store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setUser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }
//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
//                 <div>
//                     <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
//                 </div>
//                 <div className='flex items-center gap-12'>
//                     <ul className='flex font-medium items-center gap-5'>
//                         {
//                             user && user.role === 'recruiter' ? (
//                                 <>
//                                     <li><Link to="/admin/companies">Companies</Link></li>
//                                     <li><Link to="/admin/jobs">Jobs</Link></li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li><Link to="/">Home</Link></li>

//                                     {/* Dropdown for Jobs */}
//                                     <li>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 <Button variant="link">Jobs</Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="p-2">
//                                                 <ul className="flex flex-col gap-2">
//                                                     <li><Link to="/jobs">Browse Jobs</Link></li>
//                                                     <li><Link to="/submit-cv">Submit Your CV</Link></li>
//                                                 </ul>
//                                             </PopoverContent>
//                                         </Popover>
//                                     </li>

//                                     <li><Link to="/browse">Browse</Link></li>
//                                 </>
//                             )
//                         }
//                     </ul>
//                     {
//                         !user ? (
//                             <div className='flex items-center gap-2'>
//                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-80">
//                                     <div className=''>
//                                         <div className='flex gap-2 space-y-2'>
//                                             <Avatar className="cursor-pointer">
//                                                 <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
//                                             </Avatar>
//                                             <div>
//                                                 <h4 className='font-medium'>{user?.fullname}</h4>
//                                                 <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
//                                             </div>
//                                         </div>
//                                         <div className='flex flex-col my-2 text-gray-600'>
//                                             {
//                                                 user && user.role === 'student' && (
//                                                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                         <User2 />
//                                                         <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
//                                                     </div>
//                                                 )
//                                             }

//                                             <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                                                 <LogOut />
//                                                 <Button onClick={logoutHandler} variant="link">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar
import React from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow w-full">
            <div className="flex flex-row items-center justify-between py-4">
                {/* Logo */}
                <div className='flex justify-start pl-4'>
                    <a href="/" className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </a>
                </div>
                <div className='md:flex flex-row justify-end items-center w-1/2'>
                    {/* Links */}
                    <div className="md:flex flex-row items-center space-x-4">
                        <Link to="/home" className="border border-blue-600 hover:bg-blue-600 w-20 py-2 rounded-full hover:text-white text-blue-600 transition duration-300">
                            Home
                        </Link>

                        {/* Dropdown */}
                        <div className="relative group">
                            <button className="border border-blue-600 hover:bg-blue-600 py-2 rounded-full hover:text-white text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
                                Jobs
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Link to="/Browsejobs" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Browse Jobs
                                </Link>
                                <Link to="/SubmitCV" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Submit Your CV
                                </Link>
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="relative group">
                            <button className="border border-blue-600 hover:bg-blue-600 py-2 rounded-full hover:text-white text-blue-600 transition duration-300 w-20 flex flex-row justify-center items-center">
                                About
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <Link to="/clients" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Clients
                                </Link>
                                <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    About Us
                                </Link>
                                <Link to="/contact-us" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Login and Signup Buttons */}
                    <div className="flex flex-row justify-center items-center space-x-4 pl-4 pr-4">
                        <Link to="/login" className="w-20 py-2 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-full transition duration-300">
                            Login
                        </Link>
                        <Link to="/signup" className="border border-blue-600 hover:bg-blue-100 w-20 py-2 rounded-full hover:text-blue-600 text-blue-600 transition duration-300">
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MyNavbar;

