"use server";

const TagCloud = () => {
    return (
        <div>
            <p className="text-lg font-bold text-gray-900">Tags</p>
            <div className="flex flex-wrap mt-5 gap-2.5">
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Branding
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Technology
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Business
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Latest
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Marketing
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        SaaS
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Growth
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Startup
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        NFT
                    </span>
                </a>
                <a href="#" className="inline-block">
                    <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                        Business
                    </span>
                </a>
            </div>
        </div>
    );
};

export default TagCloud;
