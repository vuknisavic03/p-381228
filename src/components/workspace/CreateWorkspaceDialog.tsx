
import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const propertySchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  numberOfListings: z.string().min(1, "Please enter the number of listings"),
});

const formSchema = z.object({
  properties: z.array(propertySchema).min(1, "At least one property is required"),
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
          propertyType: "",
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
      <DialogContent className="sm:max-w-[425px] border border-[#EBECED] bg-white shadow-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Create new workspace
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative p-6 bg-[#FAFBFC] rounded-lg border border-[#EBECED] transition-all hover:border-[#EBECED]"
                >
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border border-[#EBECED] hover:bg-red-50 hover:border-red-200"
                    >
                      <X className="h-3 w-3 text-gray-500 hover:text-red-500" />
                    </Button>
                  )}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`properties.${index}.propertyType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#8E9196]">Property type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-[#EBECED]">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`properties.${index}.numberOfListings`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#8E9196]">Number of listings</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter number"
                              className="bg-white border-[#EBECED]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ propertyType: "", numberOfListings: "" })}
              className="w-full bg-white hover:bg-[#FAFBFC] border-dashed border-[#EBECED]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add another property type
            </Button>
            
            <Button type="submit" className="w-full">
              Create workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
