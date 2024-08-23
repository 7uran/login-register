import { CardProps } from '@/types/type'
import React from 'react'
const Card: React.FC<CardProps> = ({ title, image, price, rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index < rating);

    return (
        <div className="p-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden flex flex-col items-center gap-5">
            <div className='rounded-lg overflow-hidden'>
                <img className=" rounded-t-lg w-[300px] h-[200px] object-cover  " src={image} alt="product image" />
            </div>

            <div className=" flex items-center flex-col ">

                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h5>

                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {stars.map((filled, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${filled ? 'text-yellow-300' : 'text-gray-300'}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill={filled ? 'currentColor' : 'none'}
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        <span className="bg-gradient-to-r-custom text-white text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                            {rating.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">${price}</span>

                </div>
            </div>
        </div>
    );
};

export default Card;