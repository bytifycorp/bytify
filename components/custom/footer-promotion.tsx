"use client";

const FooterPromotion = () => {
    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20 border-gray-300 border-t">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="mx-auto overflow-hidden lg:max-w-5xl bg-gray-50 rounded-xl sm:max-w-md">
                    <div className="p-8 sm:p-10">
                        <div className="grid items-center grid-cols-1 text-center lg:text-left lg:grid-cols-8 gap-x-12 gap-y-8">
                            <div className="max-w-sm mx-auto lg:col-span-3">
                                <h3 className="text-3xl font-bold text-gray-900">Download free eBook of best growth tips.</h3>
                                <p className="mt-4 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa enim.</p>
                            </div>
                            <div className="w-full max-w-sm mx-auto lg:col-span-3">
                                <form action="#" method="POST" className="space-y-4">
                                    <div>
                                        <label htmlFor="" className="sr-only">
                                            Email address
                                        </label>
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
                                        <div className="absolute transitiona-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
                                        <button
                                            type="button"
                                            className="relative inline-flex items-center sm:py-3.5 justify-center w-full px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg sm:text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        >
                                            Download eBook Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="lg:col-span-2 lg:order-first">
                                <img
                                    className="object-cover w-56 h-auto mx-auto -mb-12 rounded-lg lg:mx-0"
                                    src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-newsletter/2/book-cover.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterPromotion;
