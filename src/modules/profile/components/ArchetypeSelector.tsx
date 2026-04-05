'use client';

import { useArchetypes } from '../hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/Card';
import { cn } from '@/lib/utils';
import { Archetype } from '../types';

interface ArchetypeSelectorProps {
  onSelect: (id: string) => void;
  selectedValue: string | null;
}

const ArchetypeCardSkeleton = () => (
  <Card className="h-40 animate-pulse">
    <CardHeader>
      <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
    </CardHeader>
    <CardContent>
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700 mb-2" />
      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
    </CardContent>
  </Card>
);

export function ArchetypeSelector({
  onSelect,
  selectedValue,
}: ArchetypeSelectorProps) {
  const { data: archetypes, isLoading, isError } = useArchetypes();

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => <ArchetypeCardSkeleton key={i} />)}
    </div>
  );
  if (isError) return <p>Could not load archetypes.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {archetypes?.map((archetype: Archetype) => (
        <Card
          key={archetype.id}
          onClick={() => onSelect(archetype.id)}
          className={cn(
            'cursor-pointer transition-all',
            selectedValue === archetype.id
              ? 'ring-2 ring-primary'
              : 'hover:shadow-lg',
          )}
        >
          <CardHeader>
            <CardTitle>{archetype.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {archetype.description}
            </p>
            {/* You could render passive_bonuses here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}