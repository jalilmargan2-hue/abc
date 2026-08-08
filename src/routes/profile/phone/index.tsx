import { createFileRoute } from '@tanstack/react-router'

interface PhoneSearchSchema {
  email?: string;
}

export const Route = createFileRoute('/profile/phone/')({
    validateSearch: (search: Record<string, unknown>): PhoneSearchSchema => {
        return {
            email: typeof search.email === 'string' ? search.email : undefined,
        };
    },
});

