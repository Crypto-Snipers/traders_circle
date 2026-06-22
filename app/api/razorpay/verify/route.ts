import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/app/db/db_connection';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            amount,
            description
        } = body;

        console.log('Verify Route - Received:', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature: razorpay_signature ? 'Present' : 'Missing',
            amount
        });

        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error('RAZORPAY_KEY_SECRET is missing in environment variables');
            return NextResponse.json(
                { success: false, error: 'Server misconfiguration: Missing Razorpay Secret' },
                { status: 500 }
            );
        }

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Store payment in MongoDB
        const { payments } = await connectToDatabase();

        const paymentData = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            amount: amount / 100, // Convert paise to rupees
            description,
            status: 'success',
            createdAt: new Date(),
            metadata: {
                ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
                userAgent: request.headers.get('user-agent') || 'unknown',
            }
        };

        await payments.insertOne(paymentData);

        return NextResponse.json({
            success: true,
            message: 'Payment verified and stored successfully',
            payment_id: razorpay_payment_id
        });

    } catch (error) {
        console.error('Error verifying payment:', error);

        // Detailed error logging
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Error verifying payment',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}


