
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calculator,
  Package,
  Truck,
  Plane,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';

const PricingPage = () => {
  const [weight, setWeight] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const { toast } = useToast();

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for occasional shoppers',
      features: [
        'Indian virtual address',
        '30-day free storage',
        'Basic package consolidation',
        'Email notifications',
        'Standard customer support'
      ],
      popular: false,
      buttonText: 'Get Started Free'
    },
    {
      name: 'Premium',
      price: '$9.99/month',
      description: 'Best for regular international shoppers',
      features: [
        'Everything in Basic',
        '60-day free storage',
        'Priority consolidation',
        'SMS & WhatsApp notifications',
        'Express processing (24hrs)',
        'Package insurance included',
        'Priority customer support'
      ],
      popular: true,
      buttonText: 'Start Premium Trial'
    },
    {
      name: 'Business',
      price: '$29.99/month',
      description: 'For businesses and bulk shoppers',
      features: [
        'Everything in Premium',
        '90-day free storage',
        'Bulk consolidation discounts',
        'Dedicated account manager',
        'Custom packaging options',
        'API access for tracking',
        'Volume shipping discounts',
        '24/7 phone support'
      ],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  const shippingRates = [
    { country: 'USA', rate: 12, express: 25 },
    { country: 'UK', rate: 15, express: 30 },
    { country: 'Canada', rate: 14, express: 28 },
    { country: 'Australia', rate: 18, express: 35 },
    { country: 'Germany', rate: 16, express: 32 },
    { country: 'UAE', rate: 8, express: 18 }
  ];

  const calculateShipping = () => {
    if (!weight || !destination) {
      toast({
        title: "Please fill all fields",
        description: "Enter both weight and destination to calculate shipping cost.",
        variant: "destructive"
      });
      return;
    }

    const weightNum = parseFloat(weight);
    const selectedCountry = shippingRates.find(
      country => country.country.toLowerCase() === destination.toLowerCase()
    );

    if (!selectedCountry) {
      toast({
        title: "Country not found",
        description: "Please select from available countries or contact support for custom quotes.",
        variant: "destructive"
      });
      return;
    }

    const standardCost = (weightNum * selectedCountry.rate).toFixed(2);
    const expressCost = (weightNum * selectedCountry.express).toFixed(2);

    setShippingCost({
      standard: standardCost,
      express: expressCost,
      country: selectedCountry.country,
      weight: weightNum
    });
  };

  const handlePlanSelect = (planName) => {
    toast({
      title: "🚧 Subscription Coming Soon!",
      description: `${planName} plan isn't available yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your international shopping needs.
              No hidden fees, no surprises.
            </p>
          </motion.div>

          {/* Shipping Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <Card className="glass-effect border-white/10 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-center justify-center">
                  <Calculator className="h-6 w-6" />
                  <span>Shipping Cost Calculator</span>
                </CardTitle>
                <CardDescription className="text-center">
                  Get instant shipping quotes to your destination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Weight (kg)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 2.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Destination Country</label>
                    <Input
                      placeholder="e.g., USA, UK, Canada"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateShipping}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Calculate Shipping Cost
                </Button>

                {shippingCost && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <h4 className="font-semibold mb-3">
                      Shipping to {shippingCost.country} ({shippingCost.weight} kg)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Truck className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Standard (7-14 days)</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">${shippingCost.standard}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Plane className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">Express (3-5 days)</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">${shippingCost.express}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Popular destinations:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {shippingRates.map((country) => (
                      <Badge
                        key={country.country}
                        variant="outline"
                        className="cursor-pointer hover:bg-white/10"
                        onClick={() => setDestination(country.country)}
                      >
                        {country.country}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-400">All plans include your Indian virtual address and basic features</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 ">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 mb-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <Star className="mr-1 h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <Card className={`glass-effect border-white/10 card-hover h-full mt-7 ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold gradient-text">{plan.price}</div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handlePlanSelect(plan.name)}
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
              <p className="text-gray-400">Optional add-ons to enhance your shipping experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Package Insurance',
                  price: '2% of value',
                  description: 'Protect your packages against loss or damage'
                },
                {
                  icon: Package,
                  title: 'Custom Packaging',
                  price: '$5 per package',
                  description: 'Professional repackaging for fragile items'
                },
                {
                  icon: Clock,
                  title: 'Express Processing',
                  price: '$10 per package',
                  description: 'Priority handling and faster consolidation'
                },
                {
                  icon: Globe,
                  title: 'Extended Storage',
                  price: '$2 per month',
                  description: 'Keep packages longer than standard period'
                }
              ].map((service, index) => (
                <Card key={index} className="glass-effect border-white/10 card-hover">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <div className="text-xl font-bold text-blue-400">{service.price}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 text-center">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      question: 'How is shipping cost calculated?',
                      answer: 'Shipping cost is based on package weight and destination country. We offer competitive rates with multiple carrier options.'
                    },
                    {
                      question: 'What payment methods do you accept?',
                      answer: 'We accept all major credit cards, PayPal, and bank transfers. Payment is required before shipping.'
                    },
                    {
                      question: 'How long is free storage?',
                      answer: 'Basic plan includes 30 days free storage. Premium and Business plans offer extended storage periods.'
                    },
                    {
                      question: 'Can I change my plan anytime?',
                      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.'
                    }
                  ].map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-blue-400">{faq.question}</h4>
                      <p className="text-sm text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
