export interface AuthCardHeaderProps {
  title: string;
  description: string;
}

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink-900">{title}</h2>
      <p className="mt-1.5 text-sm text-ink-500">{description}</p>
    </div>
  );
}
