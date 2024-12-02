import React from 'react';
import { Users, Target, Award } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';

export function About() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="pt-20">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            We're a team of passionate developers and designers creating exceptional
            digital experiences for forward-thinking companies.
          </p>
        </FadeIn>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: '100+', label: 'Projects Completed', icon: <Target /> },
            { number: '50+', label: 'Team Members', icon: <Users /> },
            { number: '25+', label: 'Awards Won', icon: <Award /> }
          ].map((stat, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <div className="bg-[#141414] p-8 rounded-xl border border-white/10 text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-[#00FF94]">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <FadeIn direction="up">
          <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We strive to push the boundaries of what's possible in web development,
              creating innovative solutions that help businesses thrive in the digital age.
              Our commitment to excellence and continuous learning ensures we stay ahead
              of the curve in an ever-evolving technological landscape.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}