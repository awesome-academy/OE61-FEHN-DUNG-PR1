"use client"
import React from 'react';

const NotFoundComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <div className="text-orange-500 text-4xl font-bold">404</div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        The product you're looking for doesn't exist or has been removed. Please check the URL or browse our available products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundComponent;