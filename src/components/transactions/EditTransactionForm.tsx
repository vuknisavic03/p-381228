
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SheetClose } from "@/components/ui/sheet";
import { X, DollarSign, Calendar, CreditCard, FileText, Check } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditTransactionFormProps {
  transaction: any;
  onClose: () => void;
  onUpdate: (updatedTransaction: any) => void;
}

export function EditTransactionForm({ transaction, onClose, onUpdate }: EditTransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: transaction.amount.toString(),
    date: new Date(transaction.date),
    category: transaction.category,
    paymentMethod: transaction.paymentMethod,
    from: transaction.from,
    notes: transaction.notes || "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedTransaction = {
        ...transaction,
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category,
        paymentMethod: formData.paymentMethod,
        from: formData.from,
        notes: formData.notes,
      };

      toast({
        title: "Transaction Updated",
        description: "Your changes have been saved successfully",
      });

      onUpdate(updatedTransaction);
    } catch (err) {
      console.error("Error updating:", err);
      
      toast({
        title: "Transaction Updated (Demo Mode)",
        description: "Your changes have been saved in the demo data",
      });
      
      onUpdate({
        ...transaction,
        amount: parseFloat(formData.amount),
        date: formData.date,
        category: formData.category,
        paymentMethod: formData.paymentMethod,
        from: formData.from,
        notes: formData.notes,
      });
    }
  };

  const categoryOptions = transaction.type === 'revenue' 
    ? ['Rent', 'Deposit', 'Fee', 'Other Income'] 
    : ['Maintenance', 'Utilities', 'Insurance', 'Tax', 'Other Expense'];

  const paymentMethodOptions = ['Bank Transfer', 'Credit Card', 'Cash', 'Check', 'Cryptocurrency'];

  return (
    <div className="flex flex-col p-6 w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Edit Transaction</h2>
        <SheetClose asChild>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      <div className="grid gap-5">
        {/* Amount */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <h3>Amount</h3>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <Input 
              type="number" 
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="pl-7 border-gray-200 bg-white hover:border-gray-300 transition-colors" 
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <Calendar className="h-4 w-4 text-gray-500" />
            <h3>Date</h3>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left border-gray-200 bg-white hover:bg-gray-50 transition-colors",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Category */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3>Category</h3>
          </div>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <h3>Payment Method</h3>
          </div>
          <Select 
            value={formData.paymentMethod} 
            onValueChange={(value) => handleSelectChange('paymentMethod', value)}
          >
            <SelectTrigger className="w-full border-gray-200 bg-white hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* From */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3>{transaction.type === 'revenue' ? 'From' : 'To'}</h3>
          </div>
          <Input
            className="border-gray-200"
            name="from"
            value={formData.from}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3>Notes</h3>
          </div>
          <Textarea
            placeholder="Additional notes..."
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="border-gray-200 min-h-[120px]"
          />
        </div>
      </div>
        
      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleSubmit} className="w-full sm:w-auto flex items-center gap-2">
          <Check className="h-4 w-4" />
          Save changes
        </Button>
      </div>
    </div>
  );
}
