const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send tailor details to customer
const sendTailorDetailsToCustomer = async (customerEmail, customerName, tailor) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Your Selected Tailor Details - Punarvasthra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F032A;">Dear ${customerName},</h2>
          
          <p>Thank you for choosing Punarvasthra for your customization needs. Here are the details of your selected tailor:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4F032A; margin-bottom: 15px;">Tailor Information:</h3>
            <p><strong>Name:</strong> ${tailor.name}</p>
            <p><strong>Email:</strong> ${tailor.email}</p>
            <p><strong>Phone:</strong> ${tailor.phone}</p>
            <p><strong>Address:</strong> ${tailor.address}</p>
            <p><strong>Specialization:</strong> ${tailor.specialization.join(', ')}</p>
          </div>

          <p>You can contact your tailor directly for any queries regarding your customization request.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Best regards,<br>Punarvasthra Team</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Function to send order confirmation to both customer and tailor
const sendOrderConfirmation = async (customerEmail, customerName, tailor, orderDetails) => {
  try {
    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Order Confirmation - Punarvasthra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F032A;">Dear ${customerName},</h2>
          
          <p>Thank you for your customization order. Your order has been successfully placed!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4F032A; margin-bottom: 15px;">Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Product Type:</strong> ${orderDetails.productType}</p>
            <p><strong>Material:</strong> ${orderDetails.material}</p>
            <p><strong>Status:</strong> ${orderDetails.status}</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4F032A; margin-bottom: 15px;">Assigned Tailor:</h3>
            <p><strong>Name:</strong> ${tailor.name}</p>
            <p><strong>Email:</strong> ${tailor.email}</p>
            <p><strong>Phone:</strong> ${tailor.phone}</p>
          </div>

          <p>We will keep you updated on the progress of your order.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Best regards,<br>Punarvasthra Team</p>
          </div>
        </div>
      `
    };

    // Email to tailor
    const tailorMailOptions = {
      from: process.env.EMAIL_USER,
      to: tailor.email,
      subject: 'New Customization Order - Punarvasthra',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F032A;">Dear ${tailor.name},</h2>
          
          <p>You have been assigned a new customization order!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4F032A; margin-bottom: 15px;">Order Details:</h3>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Product Type:</strong> ${orderDetails.productType}</p>
            <p><strong>Material:</strong> ${orderDetails.material}</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4F032A; margin-bottom: 15px;">Customer Details:</h3>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
          </div>

          <p>Please check your dashboard for complete order details and measurements.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p>Best regards,<br>Punarvasthra Team</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(tailorMailOptions)
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error sending order confirmation emails:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendTailorDetailsToCustomer,
  sendOrderConfirmation
}; 