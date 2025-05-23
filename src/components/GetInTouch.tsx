import React, { useState } from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const GetInTouch: React.FC = () => {
  const backgroundImage = 'https://images.unsplash.com/photo-1501472312651-726afe119ff1';
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Sending...');

    const form = new FormData();
    form.append("access_key", "fc701176-d8a1-4c7b-b1ff-2f81ab5966ed");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage("Message sent successfully!");
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(data.message || "Something went wrong 💁");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="get-in-touch"
      className="relative py-20 md:py-32 px-6 bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 z-0"></div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-semibold mb-6">Let's Connect</h2>
          <p className="text-base md:text-lg font-['Poppins'] mb-6 opacity-90 leading-relaxed">
            I'm always open to conversations, collaborations, and creative challenges. Whether you're looking for a photographer, filmmaker, editor, social media manager — or someone to simply listen and see your world through a different lens — let's connect.
          </p>
          <p className="text-base md:text-lg font-['Poppins'] mb-8 opacity-90 leading-relaxed">
            I believe in building visuals that speak, stories that resonate, and content that truly connects. If that's what you're looking for, you're in the right place.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="font-['Poppins'] font-semibold text-white/90">📍 Based in Hyderabad, India</span>
            </div>
            <a href="tel:+916304739487" className="flex items-center space-x-3 group">
              <Phone size={20} className="text-white/80 group-hover:text-white transition-colors"/>
              <span className="font-['Poppins'] group-hover:underline">+91 6304739487</span> 
            </a>
            <a href="mailto:anandassaiprashanth99@gmail.com" className="flex items-center space-x-3 group">
              <Mail size={20} className="text-white/80 group-hover:text-white transition-colors"/>
              <span className="font-['Poppins'] group-hover:underline">anandassaiprashanth99@gmail.com</span>
            </a>
          </div>

          <div className="flex space-x-5">
            <a href="https://www.instagram.com/prashanth.frames/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sai-prashanth-8913a4262/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Right Side: Form with state and submission logic */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
          <h3 className="text-xl font-['Poppins'] font-medium text-white mb-6">Drop a message</h3>
          <form onSubmit={handleSubmit}> 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className="w-full p-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 font-['Poppins']"
              />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                required 
                className="w-full p-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 font-['Poppins']"
              />
            </div>
            <div className="mb-6">
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleChange}
                required 
                className="w-full p-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 font-['Poppins']"
              />
            </div>
            <div className="mb-6">
              <textarea 
                name="message" 
                placeholder="Message your creator as you wish" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                required 
                className="w-full p-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 font-['Poppins'] resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-white text-black font-['Poppins'] font-semibold rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit and get a call back message'}
            </button>
            {statusMessage && (
              <p className={`mt-4 text-center text-sm ${statusMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer line */}
      <div className="max-w-7xl mx-auto relative z-10 mt-16 pt-8 border-t border-white/20">
        <p className="text-center text-sm text-white/70 font-['Poppins']">
          &copy; {new Date().getFullYear()} Prashanth.frames. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default GetInTouch; 