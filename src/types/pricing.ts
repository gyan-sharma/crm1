export interface PricingComponent {
  id: string;
  prettyName: string;
  type: string;
  size: string;
  hourlyPrice: number;
  monthlyPrice: number;
  created_at: string;
}