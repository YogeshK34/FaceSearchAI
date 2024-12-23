import Stripe from "stripe";
import * as dotenv from "dotenv";
dotenv.config();


// Ensure the Stripe secret key is defined
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20", // Optional but ensures consistent API behavior
});

// Define the public URL, defaulting to localhost in development
const PUBLIC_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://face-search-ai-4qmn.vercel.app/";

// Define the currency type
const currencyType = "usd";
const plans = [
    {
        'name': 'Basic-Test',
        'price': 1000, // price in cents, use 0 for free 
        'features': [
            // This will be used to list the features that will show up on the pricing table
            { name: 'Upto 10 users' },
            { name: 'Upto 1000 records' },
            { name: 'Upto 1000 API calls' }
        ]
    },
    {
        'name': 'Pro-Test',
        'price': 2000,
        'features': [
            { name: 'Upto 100 users' },
            { name: 'Upto 10000 records' },
            { name: 'Upto 10000 API calls' }
        ]
    },
    {
        'name': 'Enterprise-Test', 'price': 5000, features: [
            { name: 'Unlimited users' },
            { name: 'Unlimited records' },
            { name: 'Unlimited API calls' }
        ]
    }
]


// Create a new product in Stripe
plans.forEach(async (plan) => {
    const product = await stripe.products.create({
        name: plan.name,
        marketing_features: plan.features
    });
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.price,
        currency: currencyType,
    });
    await stripe.products.update(product.id, { 'default_price': price.id })
})
// Add webhook
stripe.webhookEndpoints.create({
    enabled_events: ['customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.updated'],
    url: `${PUBLIC_URL}/webhook/stripe`,
});