import Card from '@/components/CustomCard'
import React from 'react'
import '@/app/globals.scss';
import { useRequest } from '@/http/axiosFetcher';
import { Product } from '@/types/type';
import Spinner from '@/components/CustomSpinner';
import Link from 'next/link';

const Home = () => {
    const { data, error, isLoading } = useRequest<Product[]>("products", { method: "GET", module: "localApi" });

    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='' >
            <div className='flex justify-end px-10'>
                <Link href="/dashboard">
                    <button className='border p-3 rounded-md bg-gradient-to-r-custom text-white font-semibold'>
                        Dashboard
                    </button>
                </Link>
            </div>
            <div className="flex justify-around flex-wrap gap-10 p-4">
                {data?.map((product) => (
                    <Card
                        key={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        rating={product.rating}
                    />
                ))}</div>

        </div>
    )
}

export default Home;
