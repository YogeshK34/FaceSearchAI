# 🚀 FaceSearch AI

A feature-rich web application offering a beautiful landing page, seamless payment integration, and secure user authentication.

---

## ✨ Features

### 1. Landing Page
- Built with **shadCN components** for a sleek, responsive design.
- **User Testimonials**: Showcase reviews to build trust.
- **Newsletter Subscription**: Easy subscription for updates.
- **Sign In/Sign Up Functionality**: Users can register or log in seamlessly.
- **Image Uploader**: Upload images directly or search online for images with internet integration.

![Landing Page](/landing-page.png)

### 2. Payment Functionality
- **Stripe Checkout Integration**: 
  - Users can complete payments securely.
  - Supports multiple currencies: USD and INR.
- **Billing and Webhooks**:
  - Real-time updates for payment events.
  - Enhanced user experience with detailed billing.

![Pricing](/pricing.png)
![Payment](/payment.png)
![Payment Completed](/payment-completed.png)
![Payment Received](/stripe-dashboard.png)

### 3. Database and Authentication
- **PostgreSQL Database**: Stores user data securely.
- **Supabase Oauth Authentication**:
  - Supports providers like **GitHub** and **Google**.
  - Offers a simple, fast, and secure login experience.

---

## 🛠️ Technologies Used
- **Frontend**: React, Next.js, shadCN components
- **Backend**: Node.js, Supabase
- **Database**: PostgreSQL
- **Payment**: Stripe
- **Authentication**: Supabase OAuth (GitHub and Google)

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Stripe account with API keys
- Supabase project

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YogeshK34/FaceSearchAI.git
   cd FaceSearchAI
  
2. Install Dependencies:
   ```bash
   npm install 

3. Set up environment variables: Create a .env file and include the following:
  	```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   DATABASE_URL=your_postgresql_database_url 

4. Start the development server: 
    ``` bash
   npm run dev

🛒 Stripe Integration
Stripe Checkout handles payment processing in USD and INR.
Webhooks ensure real-time updates for billing and other payment-related events.

🔒 Authentication
Powered by Supabase, users can sign in with GitHub or Google.
Secure user data storage in PostgreSQL.

🐛 Issues and Contributions
Found a bug or want to contribute? Feel free to open an issue or submit a pull request.

📜 License
This project is licensed under the MIT License.

🛠️ Future Enhancements
Add support for more payment methods.
Include analytics dashboards for users.
Enhance the landing page with more interactive elements.

