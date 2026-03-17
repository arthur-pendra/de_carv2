import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export default function StartPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
