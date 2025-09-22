import React from 'react';
import Footer from '../components/Footer';

// A single-file React component for a privacy policy page
const Privcy = () => {
  return (

    <div>
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header Section */}
        <header className="text-center mb-10 border-b pb-6 border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm sm:text-base">Last updated: October 26, 2023</p>
        </header>

        {/* Main Content Sections */}
        <main className="space-y-10 text-gray-700 leading-relaxed">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p>This Privacy Policy describes how [Your App Name] ("we," "us," or "our") collects, uses, and shares your information when you use our website and services (the "Service"). By accessing or using the Service, you agree to the collection and use of information in accordance with this policy.</p>
          </section>

          {/* Section 2: Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
            <p>We collect several types of information for various purposes to provide and improve our Service to you.</p>
            <ul className="list-disc list-inside space-y-3 mt-4">
              <li><strong className="text-gray-800">Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to, your email address, name, and phone number.</li>
              <li><strong className="text-gray-800">Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
            </ul>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected data for various purposes, including to:</p>
            <ul className="list-disc list-inside space-y-3 mt-4">
              <li>Provide and maintain the Service.</li>
              <li>Notify you about changes to our Service.</li>
              <li>Allow you to participate in interactive features of our Service when you choose to do so.</li>
              <li>Provide customer support.</li>
              <li>Gather analysis or valuable information so that we can improve the Service.</li>
              <li>Monitor the usage of the Service.</li>
              <li>Detect, prevent, and address technical issues.</li>
            </ul>
          </section>

          {/* Section 4: Information Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
            <p>We may share your information with third-party vendors and service providers who perform services on our behalf, such as web hosting, data analysis, and email delivery. These third parties are authorized to use your personal information only as necessary to provide these services to us.</p>
          </section>

          {/* Section 5: Security of Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Security of Data</h2>
            <p>The security of your data is important to us. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          </section>

          {/* Section 6: Your Data Protection Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following data protection rights:</p>
            <ul className="list-disc list-inside space-y-3 mt-4">
              <li>The right to access, update, or delete the information we have on you.</li>
              <li>The right to have your information rectified if that information is inaccurate or incomplete.</li>
              <li>The right to object to our processing of your Personal Data.</li>
              <li>The right to withdraw your consent at any time where we relied on your consent to process your personal information.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>

    <Footer/>
    </div>
  );
};

export default Privcy;
