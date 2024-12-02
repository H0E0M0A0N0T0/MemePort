import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { FadeIn } from '../components/animations/FadeIn';

export const Home: React.FC = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
        <div className="relative container mx-auto px-4 py-20">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build the future <br />
              <span className="bg-gradient-to-r from-[#00FF94] to-[#FF00F5] text-transparent bg-clip-text">
                with confidence
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Create stunning digital experiences with our modern development solutions. 
              Fast, secure, and scalable for the next generation.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Unlock your potential with our cutting-edge tools and services, 
              designed to empower developers and teams alike.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[#00FF94]" />,
                title: 'Lightning Fast',
                description:
                  'Optimized performance that keeps your applications running at peak efficiency.',
              },
              {
                icon: <Shield className="w-8 h-8 text-[#00FF94]" />,
                title: 'Secure by Default',
                description: 'Built-in security features to protect your data and users.',
              },
              {
                icon: <Code className="w-8 h-8 text-[#00FF94]" />,
                title: 'Modern Stack',
                description:
                  'Using the latest technologies to build future-proof solutions.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-[#00FF94]/50 transition-colors"
              >
                <div className="bg-black/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-b from-secondary to-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to transform your ideas?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Get started today with our intuitive platform and grow your projects with confidence.
            </p>
            <Button size="lg" className="flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
