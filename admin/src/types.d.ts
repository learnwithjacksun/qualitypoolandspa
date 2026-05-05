interface InputWithIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode;
    type: string;
    label?: string;
    error?: string;
}
interface InputWithoutIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    label?: string;
    error?: string;
}

interface ButtonWithLoaderProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    initialText: string;
    loadingText: string;
    type?: "button" | "submit" | "reset";
    className?: string; // Explicitly adding just in case
}

interface SelectWithIconProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    icon: React.ReactNode;
    label?: string;
    error?: string;
    defaultValue?: string;
    options: {
        label: string;
        value: string;
    }[];
}

interface SelectWithoutIconProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    defaultValue?: string;
    options: {
        label: string;
        value: string;
    }[];
}

interface IAdmin {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IProduct {
    id: string;
    name: string;
    categoryId: string;
    image?: string;
    images?: string[];
    colorSampleImage?: string;
    price: number;
    description: string;
    tag?: string;
    createdAt: Date;
    updatedAt: Date;
}