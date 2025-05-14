
import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Mail, Phone, User } from "lucide-react";

const clientSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
});

const incomeSchema = z.object({
  type: z.string().min(1, "Please select an income type"),
  commissionPercentage: z.string().optional(),
  fixedAmount: z.string().optional(),
});

const propertySchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  numberOfListings: z.string().min(1, "Please enter the number of listings"),
});

const formSchema = z.object({
  client: clientSchema,
  income: incomeSchema,
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
      client: {
        name: "",
        email: "",
        phone: "",
        contactPerson: "",
      },
      income: {
        type: "",
        commissionPercentage: "",
        fixedAmount: "",
      },
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
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Create new workspace
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="client">Client Details</TabsTrigger>
                <TabsTrigger value="income">Income Setup</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="client" className="space-y-4">
                <FormField
                  control={form.control}
                  name="client.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Client Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter client name"
                            className="bg-white border-gray-200 focus:border-gray-300 pl-9"
                            {...field}
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Client Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="client@example.com"
                            className="bg-white border-gray-200 focus:border-gray-300 pl-9"
                            {...field}
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Client Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            className="bg-white border-gray-200 focus:border-gray-300 pl-9"
                            {...field}
                          />
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client.contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Contact Person</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Primary contact name"
                          className="bg-white border-gray-200 focus:border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="income" className="space-y-4">
                <FormField
                  control={form.control}
                  name="income.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Income Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-200 focus:border-gray-300">
                            <SelectValue placeholder="Select income type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commission">Commission Based</SelectItem>
                          <SelectItem value="fixed">Fixed Income</SelectItem>
                          <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("income.type") === "commission" || form.watch("income.type") === "hybrid" ? (
                  <FormField
                    control={form.control}
                    name="income.commissionPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Commission Percentage (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter percentage"
                            className="bg-white border-gray-200 focus:border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
                
                {form.watch("income.type") === "fixed" || form.watch("income.type") === "hybrid" ? (
                  <FormField
                    control={form.control}
                    name="income.fixedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Fixed Income Amount ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            className="bg-white border-gray-200 focus:border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </TabsContent>
              
              <TabsContent value="properties" className="space-y-6">
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative p-6 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:border-gray-200"
                    >
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200"
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
                              <FormLabel className="text-gray-600">Property type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-white border-gray-200 focus:border-gray-300">
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
                              <FormLabel className="text-gray-600">Number of listings</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter number"
                                  className="bg-white border-gray-200 focus:border-gray-300"
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
                  className="w-full bg-white hover:bg-gray-50 border-dashed border-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add another property type
                </Button>
              </TabsContent>
            </Tabs>
            
            <Button type="submit" className="w-full mt-4">
              Create workspace
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
