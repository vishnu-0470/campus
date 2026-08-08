import React from 'react';

export const ColorblindSVGFilters: React.FC = () => {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        {/* Protanopia (Red-Blind) Filter Matrix */}
        <filter id="protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="
              0.56667, 0.43333, 0.00000, 0, 0
              0.55833, 0.44167, 0.00000, 0, 0
              0.00000, 0.24167, 0.75833, 0, 0
              0.00000, 0.00000, 0.00000, 1, 0
            "
          />
        </filter>

        {/* Deuteranopia (Green-Blind) Filter Matrix */}
        <filter id="deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="
              0.62511, 0.37489, 0.00000, 0, 0
              0.70000, 0.30000, 0.00000, 0, 0
              0.00000, 0.30000, 0.70000, 0, 0
              0.00000, 0.00000, 0.00000, 1, 0
            "
          />
        </filter>

        {/* Tritanopia (Blue-Blind) Filter Matrix */}
        <filter id="tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="
              0.95000, 0.05000, 0.00000, 0, 0
              0.00000, 0.43333, 0.56667, 0, 0
              0.00000, 0.47500, 0.52500, 0, 0
              0.00000, 0.00000, 0.00000, 1, 0
            "
          />
        </filter>
      </defs>
    </svg>
  );
};
