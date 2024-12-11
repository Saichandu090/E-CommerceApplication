export class OrderModel {
    SaleId: number
    CustId: number
    SaleDate: Date
    TotalInvoiceAmount: number
    Discount: number
    PaymentNaration: string
    DeliveryAddress1: string
    DeliveryAddress2: string
    DeliveryCity: string
    DeliveryPinCode: string
    DeliveryLandMark: string
    IsCanceled: boolean

    constructor() {
        this.SaleId = 0,
            this.CustId = 0,
            this.SaleDate = new Date(),
            this.TotalInvoiceAmount = 0,
            this.Discount = 0,
            this.PaymentNaration = '',
            this.DeliveryAddress1 = '',
            this.DeliveryAddress2 = '',
            this.DeliveryCity = '',
            this.DeliveryLandMark = '',
            this.DeliveryPinCode = '',
            this.IsCanceled = false
    }
}


export class Login {
    UserName: string;
    UserPassword: string;

    constructor() {
        this.UserName = "",
            this.UserPassword = ''
    }
}

export class CartModel {
    CartId: number
    CustId: number
    ProductId: number
    Quantity: number
    AddedDate: Date

    constructor() {
        this.CartId = 0,
            this.CustId = 0,
            this.ProductId = 0,
            this.Quantity = 1,
            this.AddedDate = new Date()
    }
}

export class Customer {
    custId: number;
    name: string;
    MobileNo: string;
    Password: string;

    constructor() {
        this.custId = 0,
            this.name = '',
            this.MobileNo = '',
            this.Password = ''
    }
}

