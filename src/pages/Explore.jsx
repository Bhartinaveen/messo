import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/explore/PromoBanner";
import CategorySlider from "../components/explore/CategorySlider";
import DealsOfTheDay from "../components/explore/DealsOfTheDay";
import ShopByBudget from "../components/explore/ShopByBudget";
import Recommended from "../components/explore/Recommended";
import SideFilter from "../components/explore/SideFilter";

const Explore = () => {
  const [activeSection, setActiveSection] = useState("DealsOfTheDay");
  const [sortBy, setSortBy] = useState(""); // lowToHigh, highToLow, newest
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const sections = [
    { key: "DealsOfTheDay", label: "🔥 Deals of the Day" },
    { key: "ShopByBudget", label: "💰 Shop by Budget" },
    { key: "Recommended", label: "✨ Recommended for You" },
  ];

  // const getSectionTitle = () => {
  //   if (activeSection === "DealsOfTheDay") return "🔥 Deals of the Day";
  //   if (activeSection === "ShopByBudget") return "💰 Shop by Budget";
  //   if (activeSection === "Recommended") return "✨ Recommended for You";
  // };

  return (
    <div className="container mx-auto px-4">
      <SearchBar />

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block">
        <PromoBanner />
        <CategorySlider />

        <div className="flex gap-6 mt-8">
          {/* LEFT FILTER */}
          <div className="w-64 sticky top-28 h-fit">
            <SideFilter
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 space-y-6">
            {/* DESKTOP SORT BAR */}
            {/* <div className="flex items-center justify-between bg-white rounded-xl shadow-sm px-4 py-3"> */}
              {/* <h2 className="text-xl font-bold">
                {getSectionTitle()}
              </h2> */}

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
                >
                  <option value="">Popularity</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            

            {/* PRODUCTS */}
            {activeSection === "DealsOfTheDay" && (
              <DealsOfTheDay sortBy={sortBy} />
            )}
            {activeSection === "ShopByBudget" && (
              <ShopByBudget sortBy={sortBy} />
            )}
            {activeSection === "Recommended" && (
              <Recommended sortBy={sortBy} />
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden">
        <PromoBanner />
        <CategorySlider />

        {/* SORT & FILTER */}
        <div className="flex justify-end gap-3 mt-4 mb-3 relative">
          {/* SORT */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Sort By
            </button>

            {showSort && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 z-20">
                {[
                  { label: "Price: Low to High", value: "lowToHigh" },
                  { label: "Price: High to Low", value: "highToLow" },
                  { label: "Newest", value: "newest" },
                ].map((item) => (
                  <button
                    key={item.value}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setSortBy(item.value);
                      setShowSort(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FILTER */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
            >
              ☰
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-52 z-20">
                {sections.map((sec) => (
                  <button
                    key={sec.key}
                    onClick={() => {
                      setActiveSection(sec.key);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      activeSection === sec.key
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="space-y-4">
          {activeSection === "DealsOfTheDay" && (
            <DealsOfTheDay sortBy={sortBy} />
          )}
          {activeSection === "ShopByBudget" && (
            <ShopByBudget sortBy={sortBy} />
          )}
          {activeSection === "Recommended" && (
            <Recommended sortBy={sortBy} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
