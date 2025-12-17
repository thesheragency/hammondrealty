/**
 * Values Block
 * 
 * 3-column layout with icons and descriptions for values/features.
 * Uses design system typography and spacing.
 */

import type { ValuesBlock as ValuesBlockType } from '../types';
import * as LucideIcons from 'lucide-react';

interface Props {
  block: ValuesBlockType;
}

// Dynamic icon loader
function getIcon(iconName: string | undefined) {
  if (!iconName) return null;
  
  const formattedName = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as keyof typeof LucideIcons;
  
  const IconComponent = LucideIcons[formattedName];
  
  if (IconComponent && typeof IconComponent === 'function') {
    return IconComponent as React.ComponentType<{ className?: string }>;
  }
  
  return null;
}

// Default icon component
function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="8" width="32" height="32" rx="4" />
      <circle cx="24" cy="24" r="8" />
    </svg>
  );
}

export function ValuesBlock({ block }: Props) {
  const values = block.values || [];

  return (
    <section className="bg-background py-24 lg:py-36" data-testid="block-values">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        {/* Header */}
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-20 max-w-[640px] mx-auto">
            {block.sectionTitle && (
              <h2 className="text-h2 mb-4">{block.sectionTitle}</h2>
            )}
            {block.sectionDescription && (
              <p className="text-body text-muted-foreground">
                {block.sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {values.map((value, index) => {
            const Icon = getIcon(value.icon) || DefaultIcon;
            
            return (
              <div
                key={index}
                className="text-center"
                data-testid={`value-card-${index}`}
              >
                <div className="mb-6 flex justify-center">
                  <Icon className="h-16 w-16 text-foreground" />
                </div>
                <h3 className="text-h4 mb-3">{value.title}</h3>
                <p className="text-body text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
