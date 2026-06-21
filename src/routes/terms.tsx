import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Speak Sphere" },
      { name: "description", content: "The simple terms of using Speak Sphere." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Terms of use</h1>
      <div className="prose prose-sm mt-4 max-w-none text-foreground">
        <p>Speak Sphere is offered as-is for personal speaking practice. By using it, you agree to use it for that purpose.</p>
        <h2 className="mt-6 text-lg font-semibold">No guarantees</h2>
        <p>We do our best, but we don't promise the app will be available, error-free, or suit every situation. Use at your own discretion.</p>
        <h2 className="mt-6 text-lg font-semibold">Your responsibility</h2>
        <p>You're responsible for what you record and for protecting your device. Don't use Speak Sphere to capture anything you don't have the right to record.</p>
        <h2 className="mt-6 text-lg font-semibold">Changes</h2>
        <p>These terms may evolve as the product grows. Significant changes will be reflected on this page.</p>
      </div>
    </div>
  );
}