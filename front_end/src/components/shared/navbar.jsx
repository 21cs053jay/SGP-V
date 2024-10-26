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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);   // For mobile menu
    const [isJobsOpen, setIsJobsOpen] = useState(false);  // For Jobs dropdown
    const [isAboutOpen, setIsAboutOpen] = useState(false); // For About dropdown

    return (
        <nav className="sticky top-0 z-50 bg-white shadow w-full">
            <div className="flex items-center justify-between p-4">
                {/* Logo */}
                <div className='flex justify-start pl-4'>
                    <a href="/" className="text-2xl font-bold">
                        <span className='text-orange-500'>Job</span><span className="text-purple-600">Portal</span>
                    </a>
                </div>

                {/* Mobile menu button */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
                    >
                        <svg
                            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                        <svg
                            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>

                {/* Menu items (responsive for both mobile and desktop) */}
                <div className={`w-full block lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                    <div className="text-md lg:flex-grow lg:flex lg:items-center space-x-4">
                        <Link to="/" className="block mt-4 lg:mt-0 lg:inline-block w-20 py-2 rounded-full text-purple-500 transition duration-300">
                            Home
                        </Link>

                        {/* Jobs Dropdown (responsive for both mobile and desktop) */}
                        <div className="relative block mt-4 lg:mt-0 lg:inline-block">
                            <button 
                                onClick={() => setIsJobsOpen(!isJobsOpen)}
                                className="py-2 rounded-full text-purple-500 transition duration-300 w-20 flex flex-row justify-center items-center lg:inline-flex"
                            >
                                Jobs
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className={`absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-10 ${isJobsOpen ? "block" : "hidden"}`}>
                                <Link to="/Browsejobs" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                    Browse Jobs
                                </Link>
                                <Link to="/SubmitCV" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                    Submit Your CV
                                </Link>
                            </div>
                        </div>

                        {/* About Dropdown (responsive for both mobile and desktop) */}
                        <div className="relative block mt-4 lg:mt-0 lg:inline-block">
                            <button
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                                className="py-2 rounded-full text-purple-500 transition duration-300 w-20 flex flex-row justify-center items-center lg:inline-flex"
                            >
                                About
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div className={`absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-10 ${isAboutOpen ? "block" : "hidden"}`}>
                                <Link to="/clients" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                    Clients
                                </Link>
                                <Link to="/contact-us" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Login/Signup Dropdown */}
                    <div className="relative group block mt-4 lg:mt-0 lg:inline-block">
                        <button className="py-2 rounded-full text-purple-500 transition duration-300 w-28 flex flex-row justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12" stroke='currentColor'></line> 
                                <line x1="3" y1="6" x2="21" y2="6" stroke='currentColor'></line>
                                <line x1="3" y1="18" x2="21" y2="18" stroke='currentColor'></line>
                            </svg>
                        </button>
                        <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <Link to="/login" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                Login
                            </Link>
                            <Link to="/signup" className="block px-4 py-2 text-purple-500 hover:bg-blue-100 hover:text-blue-800">
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;


