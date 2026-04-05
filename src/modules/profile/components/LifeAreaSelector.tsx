'use client';

import { useLifeAreas } from '../hooks/useProfile';
import { Card, CardContent } from '@/core/components/Card';
import { cn } from '@/lib/utils';
import { LifeArea } from '../types';

interface LifeAreaSelectorProps {
  onSelect: (id: string) => void;
  selectedValues: string[];
}

const LifeAreaCardSkeleton = () => (
  <Card className="h-32 animate-pulse flex flex-col items-center justify-center p-4">
    <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
    <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
  </Card>
);

export function LifeAreaSelector({
  onSelect,
  selectedValues,
}: LifeAreaSelectorProps) {
  const { data: lifeAreas, isLoading, isError } = useLifeAreas();

  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <LifeAreaCardSkeleton key={i} />)}
    </div>
  );
  if (isError) return <p>Could not load life areas.</p>;

  const handleSelect = (id: string) => {
    // Basic toggle logic. More complex logic (like min/max) will be in the parent.
    onSelect(id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {lifeAreas?.map((lifeArea: LifeArea) => (
        <Card
          key={lifeArea.id}
          onClick={() => handleSelect(lifeArea.id)}
          className={cn(
            'cursor-pointer transition-all text-center',
            selectedValues.includes(lifeArea.id)
              ? 'ring-2 ring-primary'
              : 'hover:shadow-lg',
          )}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="text-4xl mb-2">{lifeArea.emoji}</div>
            <p className="font-semibold">{lifeArea.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}