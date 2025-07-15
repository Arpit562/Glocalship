
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
  Search, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plane,
  Home
} from 'lucide-react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleTrack = async () => {
    setError('');
    setTrackingResult(null);
    if (!trackingNumber.trim()) {
      toast({
        title: "Please enter a tracking number",
        description: "Enter your package ID or tracking number to track your shipment.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const q = query(collection(db, 'parcels'), where('parcelId', '==', trackingNumber.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError('❌ Parcel ID not found. Please check and try again.');
        setIsLoading(false);
        return;
      }
      // Only show the first result (should be unique)
      setTrackingResult(querySnapshot.docs[0].data());
    } catch (err) {
      setError('⚠️ Failed to fetch parcel info.');
      console.error('Error tracking parcel:', err);
    }
    setIsLoading(false);
  };

  const getStatusIcon = (status, completed, current) => {
    if (current) return <Truck className="h-5 w-5 text-blue-400" />;
    if (completed) return <CheckCircle className="h-5 w-5 text-green-400" />;
    
    switch (status) {
      case 'received': return <Package className="h-5 w-5 text-gray-400" />;
      case 'processing': return <Clock className="h-5 w-5 text-gray-400" />;
      case 'dispatched': return <Truck className="h-5 w-5 text-gray-400" />;
      case 'in_transit': return <Plane className="h-5 w-5 text-gray-400" />;
      case 'customs': return <AlertCircle className="h-5 w-5 text-gray-400" />;
      case 'out_for_delivery': return <Truck className="h-5 w-5 text-gray-400" />;
      case 'delivered': return <Home className="h-5 w-5 text-gray-400" />;
      default: return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (completed, current) => {
    if (current) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (completed) return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Track Your <span className="gradient-text">Package</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enter your package ID to get real-time updates on your shipment
            </p>
          </motion.div>

          {/* Tracking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="glass-effect border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Track Your Shipment</span>
                </CardTitle>
                <CardDescription>
                  Enter your package ID (e.g., ORD-123ABC)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter Parcel ID..."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleTrack} 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    {isLoading ? 'Tracking...' : 'Track'}
                  </Button>
                </div>
                {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracking Results */}
          {trackingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Package Summary */}
              <Card className="glass-effect border-white/10">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Parcel #{trackingResult.parcelId}</CardTitle>
                      <CardDescription>
                        {trackingResult.description}
                      </CardDescription>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {trackingResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className="font-medium">{trackingResult.status}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <p className="font-medium">{trackingResult.fullName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Phone:</span>
                      <p className="font-medium">{trackingResult.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Pickup:</span>
                      <p className="font-medium">{trackingResult.pickupAddress}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Drop:</span>
                      <p className="font-medium">{trackingResult.dropAddress}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Weight:</span>
                      <p className="font-medium">{trackingResult.weight} kg</p>
                    </div>
                  </div>
                  {trackingResult.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={trackingResult.imageUrl}
                        alt="Parcel"
                        className="rounded border"
                        style={{ maxHeight: 300 }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackingPage;
