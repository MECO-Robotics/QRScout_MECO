import { Info } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export interface InputCardProps {
  title: string;
  required: boolean;
  hasValue: boolean;
  description?: string;
}

export default function InputCard(
  props: React.PropsWithChildren<InputCardProps>,
) {
  return (
    <Card>
      <div className="flex justify-between bg-secondary px-1 items-center rounded-t-xl">
        <div className="flex gap-2 ">
          <h1 className="capitalize text-secondary-foreground text-sm">
            {props.title.toUpperCase()}
            {props.required && (
              <span
                className="ml-1 font-semibold text-primary"
                aria-label="Required field"
                title="Required"
              >
                *
              </span>
            )}
          </h1>
        </div>
        {props.description && (
          <Dialog>
            <DialogTrigger asChild>
              <Info className="text-secondary-foreground size-4" />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>{props.title}</DialogTitle>
              <DialogDescription>{props.description}</DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <CardContent className="p-0">{props.children}</CardContent>
    </Card>
  );
}
