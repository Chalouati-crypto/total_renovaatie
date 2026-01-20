"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"; // Adjust path based on your shadcn setup
import type { SiteSetting } from "~/payload-types";

export function LegalModal({ settings }: { settings: SiteSetting }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="transition-colors hover:text-black">
          {settings.address}
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {settings.address}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 leading-relaxed text-slate-600">
          {settings.address}
        </div>
      </DialogContent>
    </Dialog>
  );
}
