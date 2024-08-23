import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import '@/app/globals.scss';
import Table from '@/components/Table';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = getCookie('token', ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

const Dashboard = () => {
    return (
        <div className='p-10'>
            <Table />
        </div>
    )
};

export default Dashboard;
