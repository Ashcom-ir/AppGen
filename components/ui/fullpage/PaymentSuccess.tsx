import { CheckCircle2, Download, ArrowLeft, Mail } from 'lucide-react';


export default  function PaymentSuccess() {
  const transactionDetails = {
    amount: '$149.99',
    transactionId: 'TXN-789123456',
    paymentMethod: '**** 4242',
    date: 'Dec 15, 2024',
    merchant: 'TechStore Pro',
    email: 'customer@example.com'
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-green-600">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-lg">{transactionDetails.amount}</span>
            </div>
            
            <hr />
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Transaction ID</span>
              <div className="text-xs">
                {transactionDetails.transactionId}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span>{transactionDetails.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date</span>
              <span>{transactionDetails.date}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Merchant</span>
              <span>{transactionDetails.merchant}</span>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
            <Mail className="w-4 h-4" />
            <span>Receipt sent to {transactionDetails.email}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </button>
            
            <button className="w-full" >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Store
            </button>
          </div>

          {/* Support Info */}
          <p className="text-xs text-muted-foreground pt-4">
            Need help? Contact our support team at support@techstore.com
          </p>
        </div>
      </div>
    </div>
  );
}