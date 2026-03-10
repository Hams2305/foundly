import FilterTabs from "../components/FilterTabs";
import SearchBar from "../components/SearchBar";
export default function Home() {
  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col relative pb-24">
      <FilterTabs />
      <SearchBar />
      {/* Top Header - The Logo and Title */}
      <header className="flex items-center gap-3 pt-8 pb-4 px-6">
  {/* Replacing the old circle with your logo */}
  <img 
    src="/logo.png" 
    alt="Foundly Logo" 
    className="w-10 h-10 rounded-full object-cover" 
  />
  <h1 className="text-xl font-bold tracking-wide text-[#4A4238]">
    Foundly
  </h1>
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
      
      {/* We will add the Filter Tabs and Feed here next! */}
      
    </main>
  );
}