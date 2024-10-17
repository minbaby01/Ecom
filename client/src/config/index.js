export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
];

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
        required: true
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description"
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        placeholder: "Select category",
        options: [
            { id: "men", value: "Men" },
            { id: "woman", value: "Woman" },
            { id: "kids", value: "Kids" },
            { id: "shoes", value: "Shoes" }
        ]
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        placeholder: "Select brand",
        options: [
            { id: "nike", value: "Nike" }
        ]
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
        required: true
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter product sale price"
    },
    {
        label: "Quantity",
        name: "quantity",
        componentType: "input",
        type: "number",
        placeholder: "Enter product quantity"
    }
];

export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home',
    },
    {
        id: 'listing',
        label: 'Listing',
        path: '/shop/listing',
    },
    {
        id: 'contact',
        label: 'Contact',
        path: '/shop/contact',
    },
    {
        id: 'about',
        label: 'About',
        path: '/shop/about',
    }
]

export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "woman", label: "Woman" },
        { id: "kid", label: "Kid" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
    ]
}

export const sortOption = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
]

export const brandOptionMap = {
    nike: 'Nike'
}

export const categoryOptionMap = {
    men: "Men",
    woman: "Woman",
    kids: "Kids",
    shoes: "Shoes"
}

export const addressFormControls = [
    {
        name: 'address',
        label: 'Address',
        placeholder: 'Enter your address',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'city',
        label: 'City',
        placeholder: 'Enter your city',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'phone',
        label: 'Phone',
        placeholder: 'Enter your phone',
        componentType: 'input',
        type: 'text',
    }
]

