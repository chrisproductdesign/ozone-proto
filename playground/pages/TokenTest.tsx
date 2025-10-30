/**
 * Token Test Page
 * Verifies Tailwind v4 @theme tokens generate working utilities
 */

export const TokenTest = () => {
  return (
    <div className="p-8 space-y-8 bg-neutral-400">
      <section>
        <h2 className="text-2xl font-bold mb-4">Type Ramp Test</h2>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="text-xs">text-xs (12px)</div>
          <div className="text-sm">text-sm (14px)</div>
          <div className="text-base">text-base (16px)</div>
          <div className="text-lg">text-lg (18px)</div>
          <div className="text-xl">text-xl (20px)</div>
          <div className="text-2xl">text-2xl (24px)</div>
          <div className="text-3xl">text-3xl (30px)</div>
          <div className="text-4xl">text-4xl (36px)</div>
          <div className="text-5xl">text-5xl (48px)</div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Spacing Scale Test</h2>
        <div className="space-y-2 bg-white p-4 rounded-lg">
          <div className="p-1 bg-purple-200">p-1 (4px)</div>
          <div className="p-2 bg-purple-200">p-2 (8px)</div>
          <div className="p-4 bg-purple-200">p-4 (16px)</div>
          <div className="p-6 bg-purple-200">p-6 (24px)</div>
          <div className="p-8 bg-purple-200">p-8 (32px)</div>

          <p className="text-sm text-neutral-600 mt-4">Half-values test:</p>
          <div className="p-0.5 bg-amber-200">p-0.5 (should be 2px)</div>
          <div className="p-1.5 bg-amber-200">p-1.5 (should be 6px)</div>
          <div className="p-2.5 bg-amber-200">p-2.5 (should be 10px)</div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Border Radius Test</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-500 rounded-none">rounded-none</div>
          <div className="p-4 bg-green-500 rounded-sm">rounded-sm (2px)</div>
          <div className="p-4 bg-green-500 rounded">rounded (4px)</div>
          <div className="p-4 bg-green-500 rounded-md">rounded-md (6px)</div>
          <div className="p-4 bg-green-500 rounded-lg">rounded-lg (8px)</div>
          <div className="p-4 bg-green-500 rounded-xl">rounded-xl (12px)</div>
          <div className="p-4 bg-green-500 rounded-2xl">rounded-2xl (16px)</div>
          <div className="p-4 bg-green-500 rounded-3xl">rounded-3xl (24px)</div>
          <div className="p-4 bg-green-500 rounded-full">rounded-full</div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Color Palette Test</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Neutrals:</p>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-neutral-300 rounded"></div>
              <div className="w-12 h-12 bg-neutral-400 rounded"></div>
              <div className="w-12 h-12 bg-neutral-500 rounded"></div>
              <div className="w-12 h-12 bg-neutral-600 rounded"></div>
              <div className="w-12 h-12 bg-neutral-700 rounded"></div>
              <div className="w-12 h-12 bg-neutral-800 rounded"></div>
              <div className="w-12 h-12 bg-neutral-900 rounded"></div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Purple:</p>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-purple-500 rounded"></div>
              <div className="w-12 h-12 bg-purple-600 rounded"></div>
              <div className="w-12 h-12 bg-purple-700 rounded"></div>
              <div className="w-12 h-12 bg-purple-800 rounded"></div>
              <div className="w-12 h-12 bg-purple-900 rounded"></div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Semantic:</p>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-green-600 rounded"></div>
              <div className="w-12 h-12 bg-amber-500 rounded"></div>
              <div className="w-12 h-12 bg-red-600 rounded"></div>
              <div className="w-12 h-12 bg-blue-600 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Elevation Ramp Test (Shadows) - Tailwind v4</h2>
        <div className="bg-neutral-400 p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-2xs rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-2xs</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-xs rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-xs</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-sm rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-sm</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-md rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-md</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-lg rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-lg</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-xl rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-xl</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-2xl rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-2xl</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-inner rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-inner</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-neutral-300 shadow-none rounded-lg"></div>
              <span className="text-xs text-neutral-800">shadow-none</span>
            </div>
          </div>
          <p className="text-xs text-neutral-800 mt-4">Note: shadow-sm and shadow (plain) are identical in Tailwind v4</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Semantic Tokens Test</h2>
        <div className="bg-white p-4 rounded-lg space-y-4">
          <div className="text-[length:var(--text-metric-value)]">
            Metric Value (32px via --text-metric-value)
          </div>
          <div className="text-[length:var(--text-grade-letter)]">
            A
          </div>
          <p className="text-sm text-neutral-800">
            Using CSS var() with arbitrary values
          </p>
        </div>
      </section>
    </div>
  );
};
