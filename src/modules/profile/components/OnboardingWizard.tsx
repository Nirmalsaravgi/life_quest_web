'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OnboardingRequest } from '../types';
import { ArchetypeSelector } from './ArchetypeSelector';
import { LifeModeSelector } from './LifeModeSelector';
import { LifeAreaSelector } from './LifeAreaSelector';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/core/components/Card';

// Define the multi-step schema using Zod
const onboardingSchema = z.object({
  player_name: z.string().min(3, 'Player name must be at least 3 characters.'),
  archetype_id: z.string().min(1, 'Please select an archetype.'),
  life_mode_id: z.string().min(1, 'Please select a life mode.'),
  life_area_ids: z.array(z.string()).min(1, 'Select at least one life area.').max(3, 'You can select up to 3 life areas.'),
  bio: z.string().optional(),
  timezone: z.string().optional(),
});

type OnboardingFormInputs = z.infer<typeof onboardingSchema>;

const STEPS = [
  { id: 'Step 1', name: 'Player Name', fields: ['player_name'] },
  { id: 'Step 2', name: 'Choose Your Archetype', fields: ['archetype_id'] },
  { id: 'Step 3', name: 'Select Your Life Mode', fields: ['life_mode_id'] },
  { id: 'Step 4', name: 'Focus Your Life Areas', fields: ['life_area_ids'] },
  { id: 'Step 5', name: 'Final Touches', fields: ['bio', 'timezone'] },
];

interface OnboardingWizardProps {
  onSubmit: (data: OnboardingRequest) => void;
  isSubmitting: boolean;
}

export function OnboardingWizard({ onSubmit, isSubmitting }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<OnboardingFormInputs>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      player_name: '',
      life_area_ids: [],
    },
  });

  const processForm = (data: OnboardingFormInputs) => {
    onSubmit(data);
  };

  const next = async () => {
    const fields = STEPS[currentStep].fields;
    const output = await trigger(fields as (keyof OnboardingFormInputs)[], { shouldFocus: true });
    if (!output) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(step => step + 1);
    } else {
      handleSubmit(processForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };
  
  const handleLifeAreaSelect = (id: string) => {
    const currentSelection = getValues('life_area_ids') || [];
    const newSelection = currentSelection.includes(id)
      ? currentSelection.filter(item => item !== id)
      : [...currentSelection, id];
    
    if (newSelection.length <= 3) {
      setValue('life_area_ids', newSelection, { shouldValidate: true });
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>{STEPS[currentStep].name}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          {currentStep === 0 && (
            <Controller name="player_name" control={control} render={({ field }) => <Input label="Player Name" {...field} error={errors.player_name?.message} />} />
          )}

          {currentStep === 1 && (
             <Controller name="archetype_id" control={control} render={({ field }) => <ArchetypeSelector onSelect={(id) => field.onChange(id)} selectedValue={field.value} />} />
          )}

          {currentStep === 2 && (
             <Controller name="life_mode_id" control={control} render={({ field }) => <LifeModeSelector onSelect={(id) => field.onChange(id)} selectedValue={field.value} />} />
          )}
          
          {currentStep === 3 && (
            <Controller name="life_area_ids" control={control} render={({ field }) => (
                <div>
                    <LifeAreaSelector onSelect={handleLifeAreaSelect} selectedValues={field.value} />
                    {errors.life_area_ids && <p className="text-sm text-red-500 mt-2">{errors.life_area_ids.message}</p>}
                </div>
            )} />
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Controller name="bio" control={control} render={({ field }) => <Input label="Bio (Optional)" {...field} />} />
              <Controller name="timezone" control={control} render={({ field }) => <Input label="Timezone (Optional)" placeholder="e.g., America/New_York" {...field} />} />
              <p className="text-sm text-muted-foreground">We&apos;ll try to guess your timezone, but you can set it manually here.</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="justify-between">
        <Button onClick={prev} disabled={currentStep === 0}>Back</Button>
        <Button onClick={next} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
}