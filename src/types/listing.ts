
export interface Listing {
  id: string;
  name: string;
  address: string;
  type: string;
  tenant?: {
    name: string;
    type: string;
    email?: string;
    phone?: string;
  };
  units?: Array<{
    id: string;
    name: string;
    rent?: number;
  }>;
}
