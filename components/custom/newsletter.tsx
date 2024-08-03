"use server";

const Newsletter = () => {
    return (
        <div className="text-center bg-white border border-gray-200 rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <p className="text-lg font-bold text-gray-900">Join exclusive list</p>
                <p className="mt-3 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consec teta dip iscing elit. Sit quis auctor.</p>
                <div className="flex items-center justify-center mt-6 -space-x-2 overflow-hidden">
                    <img
                        className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-newsletter/3/avatar-1.png"
                        alt=""
                    />
                    <img
                        className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-newsletter/3/avatar-2.png"
                        alt=""
                    />
                    <img
                        className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-newsletter/3/avatar-3.png"
                        alt=""
                    />
                </div>
                <p className="mt-4 text-sm font-normal leading-6 text-gray-900">
                    Join with <span className="font-bold">2600+ Developers</span> and start getting feedbacks right now
                </p>
                <form action="#" method="POST" className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="" className="sr-only" />
                        <div>
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder="Enter email address"
                                className="block w-full px-4 py-3 text-base sm:py-3.5 font-medium text-center text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                            />
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
                        <button
                            type="submit"
                            className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base sm:py-3.5 border border-transparent font-semibold text-white transition-all duration-200 bg-gray-900 rounded-lg sm:text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            Join Now
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <svg className="w-6 h-6 mx-auto text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="px-4 mt-3 text-sm font-normal leading-6 text-gray-500">We don't share or sell your email address publicly</p>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
