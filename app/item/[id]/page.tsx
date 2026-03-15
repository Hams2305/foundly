export default function ItemDetail() {
  return (
    <main className="min-h-screen max-w-md mx-auto bg-[#FDFBF7] pb-10">
      {/* Back Button & Header */}
      <header className="p-6">
        <a href="/" className="text-[#8E867D] text-sm font-medium">← Back</a>
      </header>

      {/* Main Image */}
      <img 
        src="https://images.unsplash.com/photo-1590487988256-9ed2213327d7?q=80&w=800&auto=format&fit=crop" 
        alt="Item" 
        className="w-full h-72 object-cover" 
      />

      {/* Content */}
      <div className="p-6 -mt-8 bg-[#FDFBF7] rounded-t-3xl relative">
        <span className="bg-[#C48B96] text-white px-3 py-1 rounded-md text-xs font-bold">FOUND</span>
        <h1 className="text-2xl font-bold text-[#4A4238] mt-2">Vintage Brass Keys</h1>
        <p className="text-[#7A7268] mt-4 leading-relaxed">
          A bunch of old brass keys found on the park bench near the north entrance. They look quite heavy and have a unique keychain.
        </p>

        {/* Location & Time */}
        <div className="mt-6 flex gap-6 text-sm text-[#8E867D]">
          <p>📍 Central Park, North Gate</p>
          <p>🕒 2 hours ago</p>
        </div>

        {/* Action Button */}
        <button className="w-full mt-8 bg-[#4A4238] text-white py-4 rounded-xl font-bold hover:bg-[#352f28] transition-colors">
          Message Finder
        </button>
      </div>
    </main>
  );
}