
import React, { useState } from "react";
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

interface TransactionFormProps {
  onClose?: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState<'revenue' | 'expense'>('revenue');
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!amount || !date || !category || !paymentMethod || !from) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would send this data to an API
    console.log({
      type: transactionType,
      amount: parseFloat(amount),
      date,
      category,
      paymentMethod,
      from,
      notes,
    });
    
    // Reset form
    setAmount("");
    setDate(new Date());
    setCategory("");
    setPaymentMethod("");
    setFrom("");
    setNotes("");
    
    // Show success message
    handleConfirm();
    
    // Close the form if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    // Updated to use only one toast notification
    toast({
      title: `${transactionType === 'revenue' ? 'Revenue' : 'Expense'} transaction created`,
      description: `Your ${transactionType} transaction has been created successfully.`,
    });
  };

  // Category options based on transaction type
  const categoryOptions = transactionType === 'revenue' 
    ? ['Rent', 'Deposit', 'Fee', 'Other Income'] 
    : ['Maintenance', 'Utilities', 'Insurance', 'Tax', 'Other Expense'];
    
  // Payment method options
  const paymentMethodOptions = [
    'Bank Transfer',
    'Credit Card',
    'Cash',
    'Check',
    'Cryptocurrency'
  ];

  return (
    <div className="flex flex-col p-6 w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        <SheetClose asChild>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Category / Transaction Type */}
        <div>
          <div className="flex items-center justify-between gap-2 text-sm font-medium text-gray-700 mb-3">
            <h3>Type / Category</h3>
            <div className="flex p-1 bg-gray-100 rounded-full">
              <button 
                type="button"
                onClick={() => setTransactionType('revenue')}
                className={`relative flex items-center px-3 py-1 rounded-full font-medium text-xs transition-all duration-200 ${
                  transactionType === 'revenue' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-pressed={transactionType === 'revenue'}
              >
                Revenue
              </button>
              <button 
                type="button"
                onClick={() => setTransactionType('expense')}
                className={`relative flex items-center px-3 py-1 rounded-full font-medium text-xs transition-all duration-200 ${
                  transactionType === 'expense' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-pressed={transactionType === 'expense'}
              >
                Expense
              </button>
            </div>
          </div>
          
          <Select 
            value={category} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full border-gray-200 bg-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <h3>Amount</h3>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            <Input 
              type="text" 
              value={amount}
              onChange={handleAmountChange}
              className="pl-7 border-gray-200" 
              placeholder="0.00" 
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
                  "w-full justify-start text-left border-gray-200",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <h3>Payment Method</h3>
          </div>
          <Select 
            value={paymentMethod} 
            onValueChange={handlePaymentMethodChange}
          >
            <SelectTrigger className="w-full border-gray-200">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* From/To */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <h3>{transactionType === 'revenue' ? 'From' : 'To'}</h3>
          </div>
          <Input
            className="border-gray-200"
            value={from}
            onChange={handleFromChange}
            placeholder={transactionType === 'revenue' ? 'Who paid you?' : 'Who did you pay?'}
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
            value={notes}
            onChange={handleNotesChange}
            className="border-gray-200 min-h-[120px]"
          />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button type="submit" className="w-full sm:w-auto flex items-center gap-2">
            <Check className="h-4 w-4" />
            Add {transactionType}
          </Button>
        </div>
      </form>
    </div>
  );
}
