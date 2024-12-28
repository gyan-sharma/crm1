// Add offer ID generation function
export function generateOfferId(): string {
  const prefix = 'OF';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

export function generateOpportunityId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}