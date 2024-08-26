export interface CardProps {
    title: string;
    image: string;
    price: number;
    rating: number;
}



export interface Product {
    id: number;
    title: string;
    rating: number;
    price: number;
    image: string;
}


export interface EditProductModalProps {
    product: Product | null;
    onClose: () => void;
    onSave: (updatedProduct: Product) => void;
}


export interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
}