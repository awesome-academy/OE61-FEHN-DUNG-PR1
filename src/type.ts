export interface ParamsProps {
    params: {
        id: number
    }
}

export interface Product {
    id: number;
    name: string;
    price: number;
    estimatedPrice: number;
    stock: number;
    discount: number;
    images: string[];
    rating: number;
    isNew: boolean;
    commonName: string;
    scientificName: string;
    botanicalFamily: string;
    height: string;
    origin: string;
    descriptions: string;
    categories: number[];
    colors: number[];
}

export interface Color {
    id: number;
    name: string;
    eName: string;
    color: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface New {
    id: number;
    title: string;
    comments: number[];
    description: string;
    images: string[];
    categories: number[];
    tags: number[];
    date: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    userId: number;
    newId: number;
    content: string;
    date: string;
}

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    websiteUrl: string;
    password: string;
    images: string
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    images: string[];
}

export interface Cart {
    id: number;
    userId: number;
    products: CartItem[];
}



