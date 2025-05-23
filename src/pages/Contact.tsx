import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-4 text-white">Let's Connect</h2>
      <p className="mb-6 text-gray-400">
        I'm always open to conversations, collaborations, and creative challenges. Whether you're looking for a photographer, filmmaker, editor, social media manager — or someone to see your world through a different lens — let's connect.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {submitted ? (
        <div className="text-green-600 text-lg">Thank you! I'll be in touch soon. 📩</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            className="border rounded p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            className="border rounded p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            className="border rounded p-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="message"
            placeholder="Message your creator as you wish"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Submit & Get a Call Back'}
          </button>
        </form>
      )}
      <div className="mt-6 text-gray-400 text-sm">
        📍 Hyderabad, India • 📞 +91 6304739487 • 📩 anandassaiprashanth99@gmail.com
      </div>
    </div>
  );
};

export default Contact; 