import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import type { PublicOrganizationViewModel } from '../viewModels';
import { Button } from '@/components/ui/Button';

export interface PublicOrganizationHeroProps {
  organization: PublicOrganizationViewModel;
}

export function PublicOrganizationHero({ organization }: PublicOrganizationHeroProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-ink-100 bg-surface p-8 text-center sm:p-10">
      <div className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-800">
        {organization.logoUrl ? (
          <img src={organization.logoUrl} alt={organization.name} className="size-16 rounded-full object-cover" />
        ) : (
          <Building2 className="size-7" aria-hidden="true" />
        )}
      </div>

      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">{organization.name}</h1>
        {organization.description && <p className="mt-2 max-w-xl text-sm text-ink-500">{organization.description}</p>}
      </div>

      <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
        {organization.primaryAction.enabled && (
          <Link to={organization.primaryAction.route!}>
            <Button size="lg">{organization.primaryAction.label}</Button>
          </Link>
        )}
        {organization.secondaryAction?.enabled && (
          <Link
            to={organization.secondaryAction.route!}
            className="text-sm font-medium text-brand-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control"
          >
            {organization.secondaryAction.label}
          </Link>
        )}
      </div>
    </div>
  );
}
