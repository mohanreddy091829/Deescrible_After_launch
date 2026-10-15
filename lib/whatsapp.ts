/**
 * WhatsApp click-to-chat. wa.me opens the WhatsApp app on phones and WhatsApp Web / Desktop on computers,
 * with the first message already typed. Set NEXT_PUBLIC_WHATSAPP_NUMBER (digits, with country code, e.g. 919876543210).
 * Until then it falls back to the placeholder phone number in the site config.
 */
const FALLBACK = "919876543210";

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK).replace(/\D/g, "");

export const WHATSAPP_MESSAGE = "Hi Dedeepya, we have seen your work and we would like to work with you.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
