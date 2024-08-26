
import { useEffect, useState } from 'react';
import { useRequest, useRequestMutation } from '@/http/axiosFetcher';
import { Product } from '@/types/type';
import Spinner from '../CustomSpinner';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import CustomModal from '../EditProductModal';


const Table: React.FC = () => {

    const router = useRouter();
    const { data, error, isLoading } = useRequest<Product[]>("products", { method: "GET", module: "localApi" });

    const { trigger: deleteProduct, isMutating: isDeleting } = useRequestMutation(
        "productsEdit",
        {
            method: "DELETE",
            module: "localApi",
        }
    );

    const { trigger: updateProduct, isMutating: isUpdating } = useRequestMutation(
        "productsEdit",
        {
            method: "PUT",
            module: "localApi",
        }
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    useEffect(() => {
        console.log(currentProduct);
    }, [currentProduct]);
    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);

        setIsModalOpen(true);
    };

    const handleDelete = async (productId: number) => {
        try {
            await deleteProduct({ dynamicValue: productId });
            mutate("products");
        } catch (error) {
            console.error('Failed to delete the product:', error);
        }
    };

    const handleModalSubmit = async (updatedProduct: Product) => {
        try {
            await updateProduct({ dynamicValue: updatedProduct.id, body: updatedProduct });
            setIsModalOpen(false);
            mutate("products");
        } catch (error) {
            console.error('Failed to update the product:', error);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className=''>
                <button className='bg-gradient-to-r-custom py-2 px-5 rounded-lg text-white' onClick={() => router.push("/home")}>
                    Home
                </button>
            </div>
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
                                        onClick={() => handleEdit(product)}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="font-medium text-red-600 hover:underline"
                                        disabled={isDeleting}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={currentProduct}
            />
        </div>
    );
};

export default Table;
