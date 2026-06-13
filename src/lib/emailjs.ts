"use client";

import emailjs from "@emailjs/browser";
import {
  ContactNotificationData,
  EmailSendResult,
  OrderNotificationData
} from "@/types/email";

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  orderTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID ?? "",
  contactTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
};

function hasEmailJsConfig(templateId: string) {
  return Boolean(emailjsConfig.serviceId && templateId && emailjsConfig.publicKey);
}

function formatOrderProducts(data: OrderNotificationData) {
  return data.products
    .map((item) => {
      const options = [item.color, item.size].filter(Boolean).join(" / ");
      const optionText = options ? ` (${options})` : "";
      const priceText = item.lineTotal ? ` - Rs. ${item.lineTotal.toLocaleString("en-PK")}` : "";
      return `${item.productName}${optionText} x ${item.quantity}${priceText}`;
    })
    .join("\n");
}

export async function sendOrderNotification(data: OrderNotificationData): Promise<EmailSendResult> {
  if (!hasEmailJsConfig(emailjsConfig.orderTemplateId)) {
    const message = "EmailJS order notification is not configured.";
    console.warn(message);
    return { ok: false, message };
  }

  try {
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.orderTemplateId,
      {
        action_type: data.actionType,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        order_id: data.orderId,
        product_names: data.products.map((item) => item.productName).join(", "),
        quantity: data.products.reduce((sum, item) => sum + item.quantity, 0),
        order_items: formatOrderProducts(data),
        total_amount: `Rs. ${data.totalAmount.toLocaleString("en-PK")}`,
        shipping_address: data.shippingAddress,
        date_time: data.dateTime
      },
      {
        publicKey: emailjsConfig.publicKey
      }
    );

    return { ok: true, message: "Admin email notification sent." };
  } catch (error) {
    console.error("EmailJS order notification failed:", error);
    return { ok: false, message: "Order saved, but admin email notification failed." };
  }
}

export async function sendContactNotification(data: ContactNotificationData): Promise<EmailSendResult> {
  if (!hasEmailJsConfig(emailjsConfig.contactTemplateId)) {
    const message = "EmailJS contact notification is not configured.";
    console.warn(message);
    return { ok: false, message };
  }

  try {
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.contactTemplateId,
      {
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone ?? "Not provided",
        message: data.message,
        date_time: data.dateTime
      },
      {
        publicKey: emailjsConfig.publicKey
      }
    );

    return { ok: true, message: "Message sent successfully." };
  } catch (error) {
    console.error("EmailJS contact notification failed:", error);
    return { ok: false, message: "Message could not be emailed right now." };
  }
}
