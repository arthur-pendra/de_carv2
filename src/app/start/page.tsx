import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import BookingForm from '@/components/BookingForm';

export default function StartPage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <BookingForm />
      </Suspense>
    </>
  );
}
