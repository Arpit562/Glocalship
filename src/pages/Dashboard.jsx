
import React, { useState, useEffect } from 'react';
import { color, motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Package, 
  MapPin, 
  Truck, 
  Clock, 
  DollarSign, 
  Copy,
  Plus,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Zap,

} from 'lucide-react';
import {
  User,

  Lock,
  Weight,
  Phone,
  Info,
  Calendar
  
} from "lucide-react";
import ParcelBooking from '../user/ParcelBooking';
import { db, auth, onAuthStateChanged } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const initialValues={
    fullname: '',
    email: '',
    contact: '',
    password: '',
  pickup: '',
    delivery: '',
    fulladdress: '',
    weight: '',
    date: '',
    type:'',
    payment:'',

  }
  const validationSchema=Yup.object({
     "fullname": Yup.string().required('Full Name is required'),
       "contact": Yup.string().required('Phone number is required'),
       "email": Yup.string().email('Invalid email').required('Email is required'),
        "password": Yup.string().required('Password is required'),
       "pickup": Yup.string().required('Pickup location is required'),
       "delivery": Yup.string().required('Delivery location is required'),   
       "fulladdress": Yup.string().required('Full address is required'),       
       "weight": Yup.number().required('Weight is required'),                               
       "date": Yup.date().required('Date is required'), 
       "type": Yup.string().required('Type is required'),
       "payment": Yup.string().required('Payment is required'), 
       
       
    
  })
      
  
  const handleSubmit=(values)=>{
    console.log(values)
  }
  // Load data from localStorage on component mount
  useEffect(() => {
    // Fetch user bookings from Firestore
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        try {
          const q = query(collection(db, 'parcels'), where('userId', '==', loggedUser.uid));
          const querySnapshot = await getDocs(q);
          const userPackages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPackages(userPackages);
        } catch (error) {
          console.error('Error fetching packages:', error);
          setPackages([]);
        } finally {
          setLoading(false);
        }
      } else {
        setPackages([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const copyAddress = () => {
    if (userAddress) {
      const addressText = `${userAddress.name}\n${userAddress.addressLine1}\n${userAddress.addressLine2}\n${userAddress.city}, ${userAddress.state} ${userAddress.pincode}\n${userAddress.country}\nPhone: ${userAddress.phone}`;
      navigator.clipboard.writeText(addressText);
      toast({
        title: "Address Copied!",
        description: "Your Indian address has been copied to clipboard.",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shipped': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'received': return <Package className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const stats = [
    { label: 'Total Packages', value: packages.length, icon: Package, color: 'text-blue-400' },
    { label: 'In Transit', value: packages.filter(p => p.status === 'shipped').length, icon: Truck, color: 'text-green-400' },
    { label: 'Processing', value: packages.filter(p => p.status === 'processing').length, icon: Clock, color: 'text-yellow-400' },
    { label: 'Total Saved', value: '$127', icon: DollarSign, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Modal Popup for Parcel Booking */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 glass-effect border border-white/20 rounded-xl shadow-xl max-w-2xl w-full mx-4 relative animate-fade-in">
            
            <ParcelBooking onClose={() => setShowModal(false)} />
          </div>  
        </div>
      )}
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome to Your <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage your packages and shipping preferences</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="glass-effect border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          <Tabs defaultValue="packages" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="packages">My Packages</TabsTrigger>
              <TabsTrigger value="address">My Address</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Packages Tab */}
            <TabsContent value="packages" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Package Management</h2>
                  <Button onClick={() => handleFeatureClick('Add Package')} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Package
                  </Button>
                  
                </div> */}
                 <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold"></h2>
                  <Button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">Book a parcel</Button>

                  
                </div>

                {loading ? (
                  <div className="text-gray-400 text-center py-8">Loading your packages...</div>
                ) : packages.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No packages found under your account.</div>
                ) : (
                  <div className="grid gap-6">
                    {packages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="glass-effect border-white/10 card-hover">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="flex items-center space-x-2">
                                  <span>Parcel #{pkg.parcelId || pkg.id}</span>
                                  <Badge className={getStatusColor(pkg.status)}>
                                    {getStatusIcon(pkg.status)}
                                    <span className="ml-1 capitalize">{pkg.status}</span>
                                  </Badge>
                                </CardTitle>
                                <CardDescription>{pkg.description}</CardDescription>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleFeatureClick('View Details')}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleFeatureClick('Download Invoice')}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">Pickup:</span>
                                <p className="font-medium">{pkg.pickupAddress}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Drop:</span>
                                <p className="font-medium">{pkg.dropAddress}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Weight:</span>
                                <p className="font-medium">{pkg.weight} kg</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Booked At:</span>
                                <p className="font-medium">{pkg.createdAt?.toDate ? pkg.createdAt.toDate().toLocaleString() : 'N/A'}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Your Indian Virtual Address</h2>
                
                {userAddress && (
                  <Card className="glass-effect border-white/10 max-w-md">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <span>Shipping Address</span>
                      </CardTitle>
                      <CardDescription>Use this address for all your Indian purchases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-medium">{userAddress.name}</p>
                      <p>{userAddress.addressLine1}</p>
                      <p>{userAddress.addressLine2}</p>
                      <p>{userAddress.city}, {userAddress.state} {userAddress.pincode}</p>
                      <p>{userAddress.country}</p>
                      <p className="text-blue-400">Phone: {userAddress.phone}</p>
                      
                      <div className="pt-4">
                        <Button onClick={copyAddress} className="w-full">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Address
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="glass-effect border-white/10 mt-6">
                  <CardHeader>
                    <CardTitle>Address Usage Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <p className="text-sm">Always use your exact name as registered with us</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <p className="text-sm">Include your package ID in the address line 2 when possible</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <p className="text-sm">Notify us of high-value packages for extra security</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                
                <div className="grid gap-6">
                  <Card className="glass-effect border-white/10">
                    <CardHeader>
                      <CardTitle>Shipping Preferences</CardTitle>
                      <CardDescription>Configure your default shipping options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button onClick={() => handleFeatureClick('Shipping Preferences')} variant="outline" className="w-full justify-start">
                        <Truck className="mr-2 h-4 w-4" />
                        Default Shipping Method
                      </Button>
                      <Button onClick={() => handleFeatureClick('Consolidation Settings')} variant="outline" className="w-full justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        Auto-Consolidation Settings
                      </Button>
                      <Button onClick={() => handleFeatureClick('Notification Settings')} variant="outline" className="w-full justify-start">
                        <Zap className="mr-2 h-4 w-4" />
                        Notification Preferences
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect border-white/10">
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Manage your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button onClick={() => handleFeatureClick('Profile Settings')} variant="outline" className="w-full justify-start">
                        Edit Profile
                      </Button>
                      <Button onClick={() => handleFeatureClick('Billing Information')} variant="outline" className="w-full justify-start">
                        Billing Information
                      </Button>
                      <Button onClick={() => handleFeatureClick('Security Settings')} variant="outline" className="w-full justify-start">
                        Security Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
     

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
