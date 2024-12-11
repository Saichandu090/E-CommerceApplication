export interface IJsonResponse {
    result: boolean,
    message: string,
    data: any
}

export interface ICategory {
    categoryId: number,
    categoryName: string,
    parentCategoryId: number,
    userId: number
}


export interface IProduct {
    productId: number
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
    categoryName: string
}

export interface ICart {
    cartId: number
    custId: number
    productId: number
    quantity: number
    productShortName: string
    addedDate: string
    productName: string
    categoryName: string
    productImageUrl: string
    productPrice: number
}
