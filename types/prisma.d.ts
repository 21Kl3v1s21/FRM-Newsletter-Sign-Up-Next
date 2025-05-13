// types/prisma.d.ts
import { Subscriber } from '@prisma/client';

export type SubscriberWithPreferences = Subscriber & {
  preferences: {
    weeklyUpdates?: boolean;
    productNews?: boolean;
    events?: boolean;
  };
};