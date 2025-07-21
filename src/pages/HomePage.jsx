
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Servises from '../section/Servises';
import Whyshope from '../section/whyshop';
import {
  Package,
  Globe,
  Truck,
  Shield,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Users,
  Zap
} from 'lucide-react';

const HomePage = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: MapPin,
      title: "Indian Virtual Address",
      description: "Get your personal Indian address in Mumbai for all your shopping needs"
    },
    {
      icon: Package,
      title: "Package Consolidation",
      description: "Combine multiple packages into one shipment to save on shipping costs"
    },
    {
      icon: Truck,
      title: "Global Shipping",
      description: "Ship to 200+ countries worldwide with reliable tracking"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Free 30-day storage with optional insurance protection"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "24-48 hour processing time for all package consolidations"
    },
    {
      icon: DollarSign,
      title: "Best Rates",
      description: "Competitive shipping rates with multiple carrier options"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "USA",
      rating: 5,
      text: "Amazing service! Saved me hundreds on shipping costs from India."
    },
    {
      name: "Ahmed Hassan",
      country: "UAE",
      rating: 5,
      text: "Fast, reliable, and excellent customer support. Highly recommended!"
    },
    {
      name: "Maria Garcia",
      country: "Spain",
      rating: 5,
      text: "Perfect for getting authentic Indian products delivered to Europe."
    }
  ];



  const steps = [
    {
      id: 1,
      title: 'Signup',
      description: 'Get YourDesiCart Locker Address To Store Purchases In India Temporarily.',
      icon: <Users className="w-8 h-8 text-blue-500" />
    },
    {
      id: 2,
      title: 'Shop',
      description: 'Shop From Any Store In India And Ship To Your Locker Address.',
      icon: <Package className="w-8 h-8 text-purple-500" />
    },
    {
      id: 3,
      title: 'Relax',
      description: 'We Will Receive, Inspect, Consolidate And Ship To Your Doorstep Worldwide.',
      icon: <Shield className="w-8 h-8 text-green-500" />
    },
    {
      id: 4,
      title: 'Receive',
      description: 'Receive Your Package In 3-7 Days Sitting Abroad.',
      icon: <Truck className="w-8 h-8 text-yellow-500" />
    }
  ];

  const handleGetStarted = () => {
    toast({
      title: "🚧 Registration Coming Soon!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  🇮🇳 Shop from India, Ship Worldwide
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Your Gateway to
                  <span className="gradient-text block">Indian Shopping</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Get your personal Indian virtual address and shop from any Indian website.
                  We'll consolidate and ship your packages globally at the best rates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row ">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 pulse-glow mx-4 mb-4 "
                >
                  Get Your Address Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                    View Pricing
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">50K+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">200+</div>
                  <div className="text-sm text-gray-400">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                  <div className="text-sm text-gray-400">Delivery Success</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  alt="International shipping and package forwarding illustration"
                  className="w-full h-auto rounded-2xl floating-animation"
                  src="/img/bannerimage2-bgremo.png" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Glocalship</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We make international shopping from India simple, secure, and affordable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-white/10 card-hover h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Section */}
      <Servises />
      {/* why shop Section */}
      <Whyshope />

      {/* How It Works Section */}
      <section className="py-20 px-4 howitwork">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple steps to get your Indian shopping delivered worldwide
            </p>
          </motion.div>
          <div className="homepage-stepper">
            {steps.map((step, idx) => (
              <div key={step.id} className="homepage-step group">
                {/* Step Icon */}
                <div className="homepage-step-icon">
                  {step.icon}
                </div>
                {/* Step Number */}
                <span className="homepage-step-number">
                  {step.id}
                </span>
                {/* Step Content */}
                <div className="mt-8 text-center px-4">
                  <h3 className="homepage-step-title">{step.title}</h3>
                  <p className="homepage-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers shipping from India worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-effect border-white/10 card-hover h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.country}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Start Shopping from India?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get your Indian virtual address today and unlock access to millions of products
              from Indian websites with worldwide shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Link to="/tracking">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Truck className="mr-2 h-5 w-5" />
                  Track Package
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
