
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

// Define form schema using zod
const profileFormSchema = z.object({
  managerName: z.string().min(2, {
    message: "Manager name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).optional(),
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }).optional(),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface PropertyManagerProfileProps {
  workspaceId?: string;
  initialData?: ProfileFormValues;
  onSave?: (data: ProfileFormValues) => void;
}

export function PropertyManagerProfile({ 
  workspaceId, 
  initialData,
  onSave 
}: PropertyManagerProfileProps) {
  const navigate = useNavigate();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData || {
      managerName: "",
      email: "",
      phone: "",
      title: "Property Manager",
      company: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you'd save this data to your backend
    console.log("Property manager profile data:", data);
    
    // Show success message
    toast({
      title: "Profile updated",
      description: "The property manager profile has been saved successfully.",
    });
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(data);
    }
    
    // Navigate back to dashboard
    navigate("/dashboard", {
      state: {
        workspace: {
          name: data.company || "Workspace",
          owner: data.managerName,
          initials: data.managerName.split(" ").map(name => name[0]).join(""),
          managerName: data.managerName
        }
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-500" />
          <CardTitle>Property Manager Profile</CardTitle>
        </div>
        <CardDescription>
          Create or update the property manager information for this workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed in the greeting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="manager@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contact email for the property manager.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Property Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Workspace</FormLabel>
                  <FormControl>
                    <Input placeholder="Property Management Co." {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used as the workspace name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
