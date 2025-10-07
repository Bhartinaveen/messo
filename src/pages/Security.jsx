import React from 'react'
import Footer from '../components/Footer'

const Security = () => {
  return (
    <div>
    <div className="security-page max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Safe and Secure Shopping</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Is making online payment secure on FTS Shopping?
        </h2>
        <p className="text-green-600 font-medium text-lg">
          Yes, making the online payment is secure on FTS Shopping
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Does FTS Shopping store my credit/debit card information?
          </h3>
          <p className="text-gray-600">
            No. FTS Shopping only stores the last 4 digits of your card number for the purpose of card identification.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            What credit/debit cards are accepted on FTS Shopping?
          </h3>
          <p className="text-gray-600">
            We accept VISA, MasterCard, Maestro, Rupay, American Express, Diner's Club and Discover credit/debit cards.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Do you accept payment made by credit/debit cards issued in other countries?
          </h3>
          <p className="text-gray-600 mb-2">
            Yes! We accept VISA, MasterCard, Maestro, American Express credit/debit cards issued by banks in India and in the following countries: 
            Australia, Austria, Belgium, Canada, Cyprus, Denmark, Finland, France, Germany, Ireland, Italy, Luxembourg, 
            the Netherlands, New Zealand, Norway, Portugal, Singapore, Spain, Sweden, the UK and the US.
          </p>
          <p className="text-gray-600 italic">
            Please note that we do not accept internationally issued credit/debit cards for eGV payments/top-ups.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            What other payment options are available on FTS Shopping?
          </h3>
          <p className="text-gray-600">
            Apart from Credit and Debit Cards, we accept payments via Internet Banking (covering 44 banks), 
            Cash on Delivery, Equated Monthly Installments (EMI), E-Gift Vouchers, FTS Shopping Pay Later, 
            UPI, Wallet, and Paytm Postpaid.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Privacy Policy
          </h3>
          <p className="text-gray-600">
            FTS Shopping respects your privacy and is committed to protecting it. For more details, please see our Privacy Policy.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Us
          </h3>
          <p className="text-gray-600">
            If you have any security concerns or questions, please don't hesitate to contact our customer support team.
          </p>
        </div>
      </div>
    </div>
       <Footer/>
    </div>
  )
}

export default Security