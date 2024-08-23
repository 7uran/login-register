import { useRequest, useRequestMutation } from '@/http/axiosFetcher';
import { Product } from '@/types/type';
import React from 'react';
import Spinner from '../CustomSpinner';
import { mutate } from 'swr';

const Table: React.FC = () => {
    const { data, error, isLoading } = useRequest<Product[]>("products", { method: "GET", module: "localApi" });

    const { trigger: deleteProduct, isMutating } = useRequestMutation(
        "productsEdit",
        {
            method: "DELETE",
            module: "localApi",
        }
    );

    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;

    const handleEdit = (productId: number) => {

    };

    const handleDelete = async (productId: number) => {
        try {
            await deleteProduct({ dynamicValue: productId });
            mutate("products")

        } catch (error) {
            console.error('Failed to delete the product:', error);

        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => (
                        <tr key={product.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-lg" />
                            </td>
                            <td className="px-6 py-4">
                                {product.title}
                            </td>
                            <td className="px-6 py-4">
                                {product.rating}
                            </td>
                            <td className="px-6 py-4">
                                ${product.price}
                            </td>
                            <td className="px-6 py-4 text-right space-x-2">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="font-medium text-red-600 hover:underline"
                                    disabled={isMutating}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
