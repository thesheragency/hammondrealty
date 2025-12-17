/**
 * Feature Grid Block
 * 
 * Grid of feature cards with icons, titles, and descriptions.
 * Uses design system typography and Card components.
 */

import type { FeatureGridBlock as FeatureGridBlockType } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

interface Props {
  block: FeatureGridBlockType;
}

const columnClasses = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
} as const;

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

export function FeatureGridBlock({ block }: Props) {
  const columns = block.columns || '3';
  const features = block.features || [];

  return (
    <section
      className="bg-background py-16 md:py-24"
      data-testid="block-feature-grid"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {block.sectionTitle && (
              <h2 className="text-h2 mb-4" data-testid="feature-grid-title">
                {block.sectionTitle}
              </h2>
            )}
            {block.sectionDescription && (
              <p className="text-body-lg text-muted-foreground" data-testid="feature-grid-description">
                {block.sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-6 ${columnClasses[columns]}`}>
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            
            return (
              <Card key={index} data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  {Icon && (
                    <div className="mb-4 text-brand">
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                  {feature.title && (
                    <h3 className="text-h5 mb-2">{feature.title}</h3>
                  )}
                  {feature.description && (
                    <p className="text-body text-muted-foreground">
                      {feature.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
