import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  account: string;
  accountNumber: string;
  type: "personal" | "business";
}

interface TransactionCategorizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

interface CategorizationForm {
  entity: string;
  relationship: string;
  purpose: string;
  category: string;
  createRule: boolean;
  ruleCondition: string;
  ruleAction: string;
}

export function TransactionCategorizationDialog({ 
  isOpen, 
  onClose, 
  transaction 
}: TransactionCategorizationDialogProps) {
  const { toast } = useToast();
  const [form, setForm] = useState<CategorizationForm>({
    entity: "Internet Money",
    relationship: "Client",
    purpose: "To discuss ongoing business",
    category: "Meals",
    createRule: true,
    ruleCondition: "",
    ruleAction: ""
  });

  if (!transaction) return null;

  const handleConfirm = () => {
    toast({
      title: "Transaction categorized",
      description: `Transaction moved to business and categorized as ${form.category}`,
    });
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Generate rule condition and action based on form data
  React.useEffect(() => {
    if (form.createRule && transaction) {
      const condition = `Description is ${transaction.description}. Above ${formatAmount(35)}. In Personal ${transaction.accountNumber}`;
      const action = `Move to Business ${form.entity} and Categorize as ${form.category} with a ${form.relationship}`;
      
      setForm(prev => ({
        ...prev,
        ruleCondition: condition,
        ruleAction: action
      }));
    }
  }, [form.entity, form.relationship, form.category, form.createRule, transaction]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <DialogTitle className="text-lg font-semibold text-foreground">
                Move this personal transaction to business?
              </DialogTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
              <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
                Confirm + ${transaction.amount.toFixed(2)}
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Transaction Card */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </div>
                  <div className="font-medium text-foreground">
                    {transaction.description}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-blue-100">
                      <CreditCard className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ••{transaction.accountNumber}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {formatAmount(transaction.amount)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.type === "personal" ? "P" : "B"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categorization Form */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <h3 className="text-base font-medium text-foreground">
                If so, confirm these transaction details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Entity</label>
                <Select value={form.entity} onValueChange={(value) => setForm(prev => ({ ...prev, entity: value }))}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600">I</span>
                      </div>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internet Money">Internet Money</SelectItem>
                    <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                    <SelectItem value="Digital Services">Digital Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Relationship</label>
                <Select value={form.relationship} onValueChange={(value) => setForm(prev => ({ ...prev, relationship: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Client">Client</SelectItem>
                    <SelectItem value="Vendor">Vendor</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Purpose</label>
                <Select value={form.purpose} onValueChange={(value) => setForm(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To discuss ongoing business">To discuss ongoing business</SelectItem>
                    <SelectItem value="Project meeting">Project meeting</SelectItem>
                    <SelectItem value="Team building">Team building</SelectItem>
                    <SelectItem value="Client entertainment">Client entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={form.category} onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                        <span className="text-xs">🍽️</span>
                      </div>
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meals">Meals</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Create Rule Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <h3 className="text-base font-medium text-foreground">
                Create a rule for next time?
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <Switch 
                checked={form.createRule} 
                onCheckedChange={(checked) => setForm(prev => ({ ...prev, createRule: checked }))}
              />
              <span className="text-sm font-medium text-foreground">Yes</span>
            </div>

            {form.createRule && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Condition</label>
                  <div className="p-4 rounded-lg bg-muted border border-border">
                    <p className="text-sm text-foreground">
                      Description is <span className="text-blue-600 font-medium">{transaction.description}</span>. Above <span className="text-blue-600 font-medium">{formatAmount(35)}</span>. In Personal <span className="text-blue-600 font-medium">••{transaction.accountNumber}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Action</label>
                  <div className="p-4 rounded-lg bg-muted border border-border">
                    <p className="text-sm text-foreground">
                      Move to Business <span className="text-blue-600 font-medium">{form.entity}</span> and Categorize as <span className="text-blue-600 font-medium">{form.category}</span> with a <span className="text-blue-600 font-medium">{form.relationship}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}