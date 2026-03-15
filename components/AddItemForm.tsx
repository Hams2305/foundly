"use client";
import { useState } from "react";
import { supabase } from "../app/lib/supabase";

// Add this list of Cairo districts
const CAIRO_DISTRICTS = [
  "Maadi", "Nasr City", "Heliopolis", "Zamalek", "New Cairo", 
  "Dokki", "6th of October", "Downtown Cairo", "Sheikh Zayed"
];

export default function AddItemForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(CAIRO_DISTRICTS[0]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image!");

    // Upload to Supabase
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('item-images')
      .upload(fileName, file);

    if (uploadError) return alert(uploadError.message);

    const { data: { publicUrl } } = supabase.storage.from('item-images').getPublicUrl(fileName);

    // FIX: Hardcode the type to "LOST" here
    await supabase.from("items").insert([
      { 
        title, 
        description, 
        type: "LOST", // It will ALWAYS be "LOST" when first created
        location, 
        image_url: publicUrl 
      }
    ]);

    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Post Lost Item</h2>
        
        <input type="text" placeholder="Item Name" className="w-full border p-2 rounded" onChange={(e) => setTitle(e.target.value)} required />
        
        <select className="w-full border p-2 rounded" onChange={(e) => setLocation(e.target.value)}>
          {CAIRO_DISTRICTS.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <textarea placeholder="Description" className="w-full border p-2 rounded" onChange={(e) => setDescription(e.target.value)} required />
        
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="flex-1 py-2 bg-[#C48B96] text-white rounded">Post Lost Item</button>
        </div>
      </form>
    </div>
  );
}