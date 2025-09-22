import React from 'react';
import Footer from '../components/Footer';
const Terms = () => {
  return (

    <div>
    <div className="bg-white text-gray-800 font-sans antialiased min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 border-b-2 border-gray-200 pb-4 mb-2">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to Our Store! 👋
            <br />
            These Terms and Conditions govern your use of our website. By accessing or using the Service, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Content Section - Classic Blocks */}
        <div className="space-y-12">
          
          {/* Section 1: General Conditions */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              1. General Conditions
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              <strong>Account:</strong> To make a purchase, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              <strong>Accuracy of Information:</strong> We strive to ensure that all information on the Service, including product descriptions and pricing, is accurate. However, we do not guarantee that all information is free of errors. We reserve the right to correct any errors and to change or update information at any time without prior notice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Product Availability:</strong> The products displayed on the Service are subject to availability. We cannot guarantee that any item will be in stock at all times.
            </p>
          </div>

          {/* Section 2: Purchases & Payments */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Purchases & Payments
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              <strong>Order Acceptance:</strong> Your order is an offer to buy from us. We will send you an email confirming receipt of your order, but this does not mean your order has been accepted. We reserve the right to accept or decline your order for any reason.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              <strong>Pricing:</strong> All prices are listed in [Your Currency, e.g., USD] and are subject to change without notice. Prices do not include applicable taxes or shipping fees, which will be calculated and displayed at checkout.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Payment:</strong> We accept various payment methods. By providing your payment information, you authorize us to charge the total order amount to your chosen payment method.
            </p>
          </div>

          {/* Section 3: Shipping & Returns */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              3. Shipping & Returns
            </h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              <strong>Shipping:</strong> We will ship your order to the address you provide. Shipping times and costs vary and are detailed in our Shipping Policy. We are not responsible for delays caused by the shipping carrier or customs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Returns:</strong> Our Return Policy, available on the Service, governs all returns and exchanges. Please review it carefully before making a purchase.
            </p>
          </div>

          {/* Section 4: Intellectual Property */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is our property or the property of our content suppliers and is protected by intellectual property laws. You may not use any content from the Service without our express written permission.
            </p>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall we be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service or any products purchased through it. Our total liability to you for any claim arising out of these Terms or your use of the Service will not exceed the amount you paid for the product(s) in question.
            </p>
          </div>

          {/* Section 6: Governing Law */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              6. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of [Your State/Country]. Any disputes related to these Terms or the Service will be resolved in the courts of [Your State/Country].
            </p>
          </div>

          {/* Section 7: Changes to Terms */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              7. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update or modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.
            </p>
          </div>
          
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Terms;