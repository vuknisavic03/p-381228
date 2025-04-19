
import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

const propertySchema = z.object({
  propertyType: z.string(),
  numberOfListings: z.string().min(1),
});

const formSchema = z.object({
  properties: z.array(propertySchema).min(1),
});

interface CreateWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWorkspaceDialog({ open, onOpenChange }: CreateWorkspaceDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      properties: [
        {
          propertyType: "residential",
          numberOfListings: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "properties",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Create new client profile
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Property {index + 1}</h3>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`properties.${index}.propertyType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`properties.${index}.numberOfListings`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of listings</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ propertyType: "residential", numberOfListings: "" })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add another property type
            </Button>
            
            <Button type="submit" className="w-full">Create entity</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
