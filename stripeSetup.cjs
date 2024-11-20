"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var stripe_1 = require("stripe");
var dotenv = require("dotenv");
dotenv.config();
// Ensure the Stripe secret key is defined
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
var stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2024-06-20", // Optional but ensures consistent API behavior
});
// Define the public URL, defaulting to localhost in development
var PUBLIC_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://face-search-ai-4qmn.vercel.app/";
// Define the currency type
var currencyType = "usd";
var plans = [
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
];
// Create a new product in Stripe
plans.forEach(function (plan) {
    return __awaiter(void 0, void 0, void 0, function () {
        var product, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, stripe.products.create({
                    name: plan.name,
                    marketing_features: plan.features
                })];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, stripe.prices.create({
                        product: product.id,
                        unit_amount: plan.price,
                        currency: currencyType,
                    })];
                case 2:
                    price = _a.sent();
                    return [4 /*yield*/, stripe.products.update(product.id, { 'default_price': price.id })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// Add webhook
stripe.webhookEndpoints.create({
    enabled_events: ['customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.updated'],
    url: "".concat(PUBLIC_URL, "/webhook/stripe"),
});
