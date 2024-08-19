
export const products = [
    {
        id:1,
        name:"T-shirt",
        price:300,
        image:'https://img.freepik.com/free-vector/flat-minimalist-support-small-business-t-shirt_742173-10802.jpg?t=st=1723813200~exp=1723816800~hmac=901d6190080ec1b4b14afe760ab41a61fb6de75b1f89837ec31608ca628a6a1c&w=360'
    },
    {
        id:2,
        name:"Jeans",
        price:400,
        image:'https://img.freepik.com/premium-photo/fashionable-denim-pants-grey-background-top-view_508835-4921.jpg?w=360'
    },
    {
        id:3,
        name:"Sunglass",
        price:100,
        image:'https://img.freepik.com/free-photo/sunglasses_1203-7993.jpg?t=st=1723815060~exp=1723818660~hmac=54b73052864f5c63e1b827067b46cc56beec371246ddc39e2d959f6643451b44&w=996'
    },
    {
        id:4,
        name:"Trouser",
        price:200,
        image:'https://img.freepik.com/premium-photo/classic-black-mens-trousers-white-background_1177187-98790.jpg?w=740'
    },
    {
        id:5,
        name:"Shoe",
        price:300,
        image:'https://img.freepik.com/premium-photo/shoe-that-has-orange-gray-it_1313274-7113.jpg?w=740'
    }
]

export const getproductdetails = (id)=>{
    const product = products.find(item => item.id === id)
    // console.log(product)
    return product
}

const item = getproductdetails(4)
console.log(item)


