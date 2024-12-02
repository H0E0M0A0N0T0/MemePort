import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Get in Touch
        </h1>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <FadeIn direction="left">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, text: 'hello@company.com' },
                { icon: <Phone className="w-5 h-5" />, text: '+1 (555) 123-4567' },
                { icon: <MapPin className="w-5 h-5" />, text: '123 Innovation Street, Tech City, TC 12345' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-gray-300">
                  <div className="w-10 h-10 rounded-lg bg-[#141414] flex items-center justify-center text-[#00FF94]">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="right">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00FF94] to-[#FF00F5] text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}