export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Onboarding has its own full-page design, no sidebar/header needed
  return <>{children}</>;
}
