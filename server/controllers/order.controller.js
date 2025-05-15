
import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartProduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

 export async function CashOnDeliveryOrderController (request,response){
    try {
        const userID = request.userID 

        const { list_items ,totalAmt, addressId, subTotalAmt} = request.body

       

        const payload = list_items.map(el=>{
            return({
            userID :userID,
            orderId : `ORD-${new mongoose.Types.ObjectId()}`,
            productId : el.productId._id,
            product_details : {
                name : el.productId.name,
                image : el.productId.image
            },
            paymentId : "",
            payment_status : "CASH ON DELIVERY",
            delivery_address : addressId,
            subTotalAmt : subTotalAmt,
            totalAmt : totalAmt

            })
        })


        const generateOrder = await OrderModel.insertMany(payload)

        //remove from cart
         const removeCartItems = await CartProductModel.deleteMany({userId : userID})
         const updateInUser = await UserModel.updateOne({_id : userID},{ shopping_cart : []})

         return response.json({
            message : "Order Successfully",
            error : false,
            success : true,
            data: generateOrder
         })


           
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

export const PricewithDiscount = (price,dis = 1)=>{
    const discountAmount =Math.ceil(( Number (price) * Number(dis)) / 100 )
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice 
}
export async function paymentController(request,response) {
    try {
        const userId = request.userId
        const { list_items ,totalAmt, addressId, subTotalAmt} = request.body

        const user = await UserModel.findById(userId)
       console.log("Found User:", user);

        const line_items = list_items.map(item=>{
            return{
              price_data : {
                currency : 'inr',
                product_data : {
                    name :item.productId.name,
                    images : item.productId.image,
                    metadata : {
                        productId : item.productId._id
                    }
                },
                unit_amount : PricewithDiscount(item.productId.price,item.productId.discount) * 100
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1
              },
              quantity : item.quantity
              
            }
        })
        const params = {
            submit_type : 'pay' ,
             mode : 'payment',
             payment_method_types : ['card'],
             customer_email : user.email,
             metadata  : {
                userId : userId,
                addressId : addressId
             },
             line_items : line_items,
             success_url : `${process.env.FRONTEND_URL}/success`,
             cancel_url : `${process.env.FRONTEND_URL}/cancel`

        }
        const session = await Stripe.checkout.sessions.create(params)

        return response.status(200).json(session)
         
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false

        })
    }
    
}

export async function webhookStripe(request,response){
    const event = request.body;

    console.log("event",event)


     switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      break;
   
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
   response.json({received: true});

}