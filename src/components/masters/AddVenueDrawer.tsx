'use client';

import { FormEvent, useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export interface AddVenueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CLASSIFICATION_OPTIONS = [
  { label: 'Major', value: 'Major' },
  { label: 'Minor', value: 'Minor' },
];

const COMBINED_OPTIONS = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

/** Side panel form for creating a new venue, matching the "Add Venue" dialog. */
export function AddVenueDrawer({ isOpen, onClose, onCreated }: AddVenueDrawerProps) {
  const { show } = useToast();
  const [status, setStatus] = useState<'Active' | 'Deactive'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    show({ title: 'Venue created', description: 'The new venue has been added.', variant: 'success' });
    onCreated?.();
    onClose();
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Add Venue">
      <form onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Venue Code" name="venueCode" placeholder="eg: MDS" required />
          <Input label="Venue Name" name="venueName" placeholder="eg: Madras" required />
          <Select label="Venue Classification" name="venueClassification" options={CLASSIFICATION_OPTIONS} required />
          <Select label="Combined" name="combined" options={COMBINED_OPTIONS} required />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink-900">Status</legend>
          <div className="flex items-center gap-6">
            {(['Active', 'Deactive'] as const).map((value) => (
              <label key={value} className="flex items-center gap-2 text-sm text-ink-700">
                <input
                  type="radio"
                  name="status"
                  value={value}
                  checked={status === value}
                  onChange={() => setStatus(value)}
                  className="h-4 w-4 accent-primary-500"
                />
                {value}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-auto flex justify-end border-t border-surface-muted pt-4">
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
