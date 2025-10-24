import React from 'react';
import { Check, Info } from 'lucide-react';

// Simple filled dot component
const Dot = () => (
  <div className="w-[6px] h-[6px] rounded-full bg-black shrink-0 mt-2" />
);

export type BackgroundCheckCardVariant = 'checklist' | 'data-merch' | 'perplexity';

export interface BackgroundCheckCardProps {
  variant: BackgroundCheckCardVariant;
  className?: string;
}

/**
 * BackgroundCheckCard - Background verification cards with different layouts
 *
 * Features:
 * - Checklist variant with green checkmarks
 * - Data merch variant with description and bulleted list
 * - Perplexity search variant with results
 *
 * @example
 * <BackgroundCheckCard variant="checklist" />
 */
export const BackgroundCheckCard: React.FC<BackgroundCheckCardProps> = ({
  variant,
  className = '',
}) => {
  if (variant === 'checklist') {
    return (
      <div className={`bg-[#f7f5f1] rounded-lg p-6 flex flex-col gap-6 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-black">
            Background checklist
          </p>
          <Info className="w-[18px] h-[18px] text-gray-600" />
        </div>

        {/* Checklist Items */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Check className="w-[18px] h-[18px] text-[#0e816a] shrink-0" />
            <p className="text-base font-semibold text-[#0e816a] leading-[22px]">
              Viverra urna orci pellentesque viverra.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-[18px] h-[18px] text-[#0e816a] shrink-0" />
            <p className="text-base font-semibold text-[#0e816a] leading-[22px]">
              Etiam mattis nunc nec ac gravida sed varius massa.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-[18px] h-[18px] text-[#0e816a] shrink-0" />
            <p className="text-base font-semibold text-[#0e816a] leading-[22px]">
              Massa quis mauris leo eget amet id.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-[18px] h-[18px] text-[#0e816a] shrink-0" />
            <p className="text-base font-semibold text-[#0e816a] leading-[22px]">
              Velit sagittis volutpat in tempor quam.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'data-merch') {
    return (
      <div className={`bg-[#f7f5f1] rounded-lg overflow-clip ${className}`}>
        <div className="border border-black/10 rounded-lg p-6">
          <div className="flex flex-col gap-6">
            {/* Header section */}
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-black">
                Data merch
              </p>
              <p className="text-[13px] font-medium text-black leading-[22px]">
                Ac massa mi turpis risus suspendisse cras. Netus dignissim amet.
              </p>
            </div>

            {/* List section */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold text-black uppercase h-[14px]">
                Magna gravida
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <Dot />
                  <p className="text-base font-medium text-black leading-[22px]">
                    Dapibus non nisl auctor ultrices integer.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Dot />
                  <p className="text-base font-medium text-black leading-[22px]">
                    Justo nisl nunc quam vel nam. Et
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Dot />
                  <p className="text-base font-medium text-black leading-[22px]">
                    Egestas proin volutpat blandit id
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Perplexity variant
  return (
    <div className={`bg-[#f7f5f1] border border-black/10 rounded-lg p-6 flex flex-col gap-6 ${className}`}>
      {/* Header */}
      <p className="text-lg font-semibold text-black">
        Perplexity search
      </p>

      {/* Results Section */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-black uppercase">
          Results
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2.5">
            <Dot />
            <p className="text-base font-medium text-black leading-[22px]">
              Quis eget pellentesque eget consectetur. Commodo viverra velit condimentum consectetur donec. Id imperdiet.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Dot />
            <p className="text-base font-medium text-black leading-[22px]">
              Quis viverra arcu dui donec turpis consectetur aliquam. Enim et est leo duis et. Vulputate porta non sed lacus.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Dot />
            <p className="text-base font-medium text-black leading-[22px]">
              Ut at adipiscing cras sit placerat felis tincidunt mattis. Quam id non nibh dui. Elementum facilisi quis feugiat id.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
