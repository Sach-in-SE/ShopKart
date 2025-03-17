export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Privacy Policy
      </h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            At ShopKart, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website or make a purchase.
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy
            policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Register for an account</li>
            <li>Make a purchase</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us for support</li>
            <li>Participate in surveys or promotions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Process your orders and payments</li>
            <li>Communicate with you about your orders</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except to trusted third parties who assist us in operating our website,
            conducting our business, or servicing you, as long as they agree to keep this information
            confidential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:lucky002954@gmail.com" className="text-primary hover:underline">
              lucky002954@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}