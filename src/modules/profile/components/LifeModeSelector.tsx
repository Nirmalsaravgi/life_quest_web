'use client';

import { useLifeModes } from '../hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/Card';
import { cn } from '@/lib/utils';
import { LifeMode } from '../types';

interface LifeModeSelectorProps {
  onSelect: (id: string) => void;
  selectedValue: string | null;
}

const LifeModeCardSkeleton = () => (
  <Card className="h-32 animate-pulse">
    <CardHeader>
      <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
    </CardHeader>
    <CardContent>
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
    </CardContent>
  </Card>
);

export function LifeModeSelector({
  onSelect,
  selectedValue,
}: LifeModeSelectorProps) {
  const { data: lifeModes, isLoading, isError } = useLifeModes();

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => <LifeModeCardSkeleton key={i} />)}
    </div>
  );
  if (isError) return <p>Could not load life modes.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {lifeModes?.map((lifeMode: LifeMode) => (
        <Card
          key={lifeMode.id}
          onClick={() => onSelect(lifeMode.id)}
          className={cn(
            'cursor-pointer transition-all',
            selectedValue === lifeMode.id
              ? 'ring-2 ring-primary'
              : 'hover:shadow-lg',
          )}
        >
          <CardHeader>
            <CardTitle>{lifeMode.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {lifeMode.description}
            </p>
            {/* You could render modifiers here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}