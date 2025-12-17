/**
 * Feature Grid Block
 * 
 * Grid of feature cards with icons, titles, and descriptions.
 * Features hover effects, gradient accents, and responsive layouts.
 */

import type { FeatureGridBlock as FeatureGridBlockType } from '../types';
import * as LucideIcons from 'lucide-react';

interface Props {
  block: FeatureGridBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  card: 'bg-card',
} as const;

const columnClasses = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
} as const;

// Dynamic icon loader - maps icon names to Lucide components
function getIcon(iconName: string | undefined) {
  if (!iconName) return null;
  
  // Capitalize first letter and handle common patterns
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

export function FeatureGridBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'default';
  const columns = block.columns || '3';
  const features = block.features || [];

  return (
    <section
      className={`py-20 md:py-28 ${bgColorClasses[bgColor]}`}
      data-testid="block-feature-grid"
    >
      <div className="container mx-auto px-4">
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {block.sectionTitle && (
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
                data-testid="feature-grid-title"
              >
                {block.sectionTitle}
              </h2>
            )}
            {block.sectionDescription && (
              <p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                data-testid="feature-grid-description"
              >
                {block.sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                data-testid={`feature-card-${index}`}
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                <div className="relative">
                  {Icon && (
                    <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                  )}
                  {feature.title && (
                    <h3 className="text-xl font-semibold mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                  )}
                  {feature.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
