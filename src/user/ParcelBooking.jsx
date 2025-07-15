import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase/firebaseConfig";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ParcelBooking({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pickupAddress: "",
    dropAddress: "",
    description: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const parcelId =
    "ORD-" +
    Math.random().toString(36).substr(2, 5).toUpperCase() +
    Date.now().toString().slice(-4);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to book a parcel.");
        setLoading(false);
        return;
      }

      const orderId = uuidv4();

      await addDoc(collection(db, "parcels"), {
        ...formData,
        parcelId,
        orderId,
        userId: user.uid,
        imageUrl: "",
        status: "Order Placed",
        createdAt: serverTimestamp(),
      });

      setSuccessMsg(`✅ Order placed! Your Parcel ID is: ${parcelId}`);

      setFormData({
        fullName: "",
        phone: "",
        pickupAddress: "",
        dropAddress: "",
        description: "",
        weight: "",
      });

    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Failed to book parcel.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl glass-effect border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            📦 Book a Parcel
          </CardTitle>
          <button
            className="text-gray-400 hover:text-white bg-black/20 rounded-full p-1 transition"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </CardHeader>
        <CardContent>
          {successMsg && (
            <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-400 text-white text-sm text-center">
              {successMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                <Input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pickup Address</label>
              <textarea
                name="pickupAddress"
                required
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Enter full pickup address"
                className="w-full p-2 rounded-md bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none min-h-[60px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Drop Address</label>
              <textarea
                name="dropAddress"
                required
                value={formData.dropAddress}
                onChange={handleChange}
                placeholder="Enter full drop address"
                className="w-full p-2 rounded-md bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none min-h-[60px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Parcel Description</label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Documents, electronics..."
                className="w-full p-2 rounded-md bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none min-h-[60px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <Input
                type="number"
                name="weight"
                required
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 2.5"
                min="0"
                step="0.01"
              />
            </div>
            <CardFooter className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:scale-[1.02] transition-transform"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Parcel"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParcelBooking;
