import { supabase } from "./lib/supabase";
import FilterTabs from "../components/FilterTabs";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

export default async function Home() {
  // Fetch data from Supabase
  const { data: items } = await supabase.from("items").select("*");

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col relative pb-24 bg-[#FDFBF7]">
      
      {/* Top Header with your Logo */}
      <header className="flex items-center pt-8 pb-4 px-6">
        <img 
          src="/logo.png" 
          alt="Foundly Logo" 
          className="h-12 w-auto object-contain" 
        />
      </header>

      {/* Main Catchphrase */}
      <section className="mt-4 text-center px-6">
        <h2 className="text-[2.5rem] font-serif text-[#4A4238] leading-tight">
          Reuniting people <br />
          with their <span className="text-[#C48B96] italic">precious</span> <br />
          things.
        </h2>
        <p className="mt-5 text-[15px] text-[#7A7268] leading-relaxed">
          Browse the collection of found items or post about something you've lost in Cairo. Our community is here to help.
        </p>
      </section>
      
      {/* Interactive Filter Tabs */}
      <FilterTabs />

      {/* Search Bar */}
      <SearchBar />

      {/* Dynamic Item Grid */}
      <div className="px-6 mt-8 grid grid-cols-2 gap-4 pb-10">
        {items?.map((item) => (
          <ItemCard 
            key={item.id}
            type={item.type as "LOST" | "FOUND"} // Type casting to match our component
            title={item.title}
            description={item.description}
            image={item.image_url}
          />
        ))}
      </div>
      
    </main>
  );
}