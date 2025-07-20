import PublicHeader from '../common/public/Header'
import PublicFooter from '../common/public/Footer'
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};


export default PublicLayout;