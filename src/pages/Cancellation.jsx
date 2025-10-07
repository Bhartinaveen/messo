import React from 'react'
import Footer from '../components/Footer'

const Cancellation = () => {
  return (
    <div>
    <div className="cancellation-page max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cancellation & Refund Policy</h1>
      
      <div className="space-y-6">
        {/* Cancellation Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancellation Policy</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">When can I cancel my order?</h3>
              <p className="text-gray-600 mt-2">
                You can cancel your order anytime before the item is shipped. Once the item is shipped, 
                cancellation is not possible.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">How to cancel an order?</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li>Go to 'My Orders' section in your account</li>
                <li>Select the order you want to cancel</li>
                <li>Click on 'Cancel Order' button</li>
                <li>Select the reason for cancellation</li>
                <li>Confirm cancellation</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">Automatic Cancellation</h3>
              <p className="text-gray-600 mt-2">
                Orders are automatically cancelled if payment is not completed within 24 hours 
                for prepaid orders, or if the item is out of stock.
              </p>
            </div>
          </div>
        </div>

        {/* Refund Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Policy</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">When will I receive my refund?</h3>
              <p className="text-gray-600 mt-2">
                Refunds are processed within 7-10 business days from the date of cancellation/return approval. 
                The exact time may vary depending on your bank/payment method.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">Refund Methods</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li><strong>Credit/Debit Card:</strong> 7-10 business days</li>
                <li><strong>Net Banking:</strong> 7-10 business days</li>
                <li><strong>UPI:</strong> 3-5 business days</li>
                <li><strong>Wallet:</strong> 24-48 hours</li>
                <li><strong>FTS Shopping Pay Later:</strong> Instant reversal</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-700">Return & Refund Eligibility</h3>
              <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1">
                <li>Items must be in original condition with tags attached</li>
                <li>Return request must be made within 10 days of delivery</li>
                <li>Original packaging should be intact</li>
                <li>Free gifts must be returned with the product</li>
                <li>Certain products like innerwear, personalized items, and perishables are non-returnable</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return Process</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-700">Request Return</h3>
              <p className="text-sm text-gray-600 mt-1">Initiate return in 'My Orders'</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-700">Pickup Scheduled</h3>
              <p className="text-sm text-gray-600 mt-1">We schedule pickup within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-700">Quality Check</h3>
              <p className="text-sm text-gray-600 mt-1">Product verified at our facility</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-700">Refund Initiated</h3>
              <p className="text-sm text-gray-600 mt-1">Refund processed after approval</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
          <ul className="text-yellow-700 list-disc list-inside space-y-2">
            <li>Refund time may vary based on your bank's processing time</li>
            <li>Shipping charges are non-refundable unless the return is due to our error</li>
            <li>For Cash on Delivery returns, refund will be processed to your bank account via NEFT</li>
            <li>Keep the product in original condition until pickup is completed</li>
            <li>Contact customer support for any delays in refund processing</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
          <p className="text-blue-700 mb-3">
            Our customer support team is here to help you with any cancellation or refund queries.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
     <Footer/>
    </div>
  )
}

export default Cancellation