// import { NextResponse } from 'next/server';
// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: Request) {
//     try {
//         const { amount } = await request.json();

//         if (!amount) {
//             return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
//         }

//         const options = {
//             amount: amount * 100, // amount in the smallest currency unit (paise)
//             currency: 'INR',
//             receipt: `receipt_${Date.now()}`,
//         };

//         const order = await razorpay.orders.create(options);

//         return NextResponse.json(order);
//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         return NextResponse.json(
//             { error: 'Error creating order' },
//             { status: 500 }
//         );
//     }
// }



import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Key Secret exists:', !!process.env.RAZORPAY_KEY_SECRET);

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        const options = {
            amount: Math.round(amount * 100), // amount in paise - ensure integer
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {} // Optional but good practice
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Error creating order', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}


