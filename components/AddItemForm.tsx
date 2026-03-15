"use client";
import { useState } from "react";
import { supabase } from "../app/lib/supabase";

export default function AddItemForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("LOST");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image!");

    // 1. Upload image to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('item-images')
      .upload(fileName, file);

    if (uploadError) return alert(uploadError.message);

    // 2. Get the public URL
    const { data: { publicUrl } } = supabase.storage.from('item-images').getPublicUrl(fileName);

    // 3. Save item to database
    await supabase.from("items").insert([
      { title, description, type, image_url: publicUrl }
    ]);

    onClose(); // Close the form
    window.location.reload(); // Refresh the page to see the new item
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold">Post an Item</h2>
        <input type="text" placeholder="Item Name" className="w-full border p-2 rounded" onChange={(e) => setTitle(e.target.value)} />
        <select className="w-full border p-2 rounded" onChange={(e) => setType(e.target.value)}>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
        <textarea placeholder="Description" className="w-full border p-2 rounded" onChange={(e) => setDescription(e.target.value)} />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="flex-1 py-2 bg-[#C48B96] text-white rounded">Post Item</button>
        </div>
      </form>
    </div>
  );
}