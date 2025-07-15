import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-700 mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-600 hover:underline">Go back to Home</Link>
        </div>
    )
}

export default PageNotFound;
