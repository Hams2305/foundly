"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "../../lib/supabase";

export default function ItemDetail({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Unwrap params safely
  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // Fetch item once ID is available
  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();
      
      if (!error) setItem(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
  async function fetchMessages() {
    if (!id) return;
    const { data } = await supabase.from("messages").select("*").eq("item_id", id).order('created_at', { ascending: true });
    if (data) setMessages(data);
  }
  fetchMessages();
}, [id]);

  const handleMarkAsFound = async () => {
    if (!id) return;
    const { error } = await supabase
      .from("items")
      .update({ type: "FOUND" })
      .eq("id", id);

    if (!error) {
      alert("Status updated!");
      window.location.reload(); 
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!item) return <div className="p-10 text-center">Item not found.</div>;

  return (
    <main className="min-h-screen max-w-md mx-auto bg-[#FDFBF7] pb-10">
      <header className="p-6">
        <a href="/" className="text-[#8E867D] text-sm font-medium">← Back</a>
      </header>

      <img src={item.image_url} alt={item.title} className="w-full h-72 object-cover" />

      <div className="p-6 -mt-8 bg-[#FDFBF7] rounded-t-3xl relative">
        <span className={`px-3 py-1 rounded-md text-xs font-bold text-white ${item.type === "LOST" ? "bg-[#C48B96]" : "bg-[#8E867D]"}`}>
          {item.type}
        </span>
        
        <h1 className="text-2xl font-bold text-[#4A4238] mt-2">{item.title}</h1>
        <p className="text-[#7A7268] mt-4 leading-relaxed">{item.description}</p>

        <div className="mt-6 text-sm text-[#8E867D]">
          <p>📍 Location: {item.location}</p>
        </div>

        {item.type === "LOST" && (
          <button 
            onClick={handleMarkAsFound}
            className="w-full mt-8 bg-[#C48B96] text-white py-4 rounded-xl font-bold hover:bg-[#b07d87] transition-colors"
          >
            Mark as Found
          </button>
        )}
        {/* Chat Section */}
<div className="p-6 bg-white mt-8 rounded-xl shadow-sm border">
  <h3 className="font-bold text-[#4A4238] mb-4">Messages</h3>
  <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
    {messages.map((m) => (
      <div key={m.id} className="text-sm border-b pb-1">
        <span className="font-bold text-[#C48B96]">{m.sender_name}: </span>
        {m.content}
      </div>
    ))}
  </div>
  <input 
    className="w-full border p-2 rounded-lg text-sm"
    placeholder="Type a message to the owner..."
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    onKeyDown={async (e) => {
      if (e.key === 'Enter' && newMessage.trim()) {
        const name = prompt("What is your name?") || "Anonymous";
        await supabase.from("messages").insert([{ item_id: id, sender_name: name, content: newMessage }]);
        setNewMessage("");
        window.location.reload(); // Quick way to show new message
      }
    }}
  />
</div>
      </div>
    </main>
  );
}