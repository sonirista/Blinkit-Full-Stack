export const PricewithDiscount = (price,dis = 1)=>{
    const discountAmount =Math.ceil(( Number (price) * Number(dis)) / 100 )
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice 
}