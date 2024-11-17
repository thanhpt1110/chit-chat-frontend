import { useState } from "react";

export type Tab = {
  label: string; // Label của Tab
  content: React.ReactNode; // Nội dung của Tab
};

type TabsProps = {
  tabs: Tab[]; // Danh sách các Tab
  initialActiveIndex?: number; // Tab được chọn mặc định
};

function Tabs({ tabs, initialActiveIndex = 0 }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex justify-center border-t px-16">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-16 py-2 text-sm font-medium ${
              index === activeIndex
                ? "border-t-2 border-gray-800 text-gray-800"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">{tabs[activeIndex].content}</div>
    </div>
  );
}

export default Tabs;
