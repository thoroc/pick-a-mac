export interface MacBookRecommendation {
  model: string;
  reason: string;
}

export const getRecommendation = (answers: Record<string, string>): MacBookRecommendation => {
  const { usage, portability, battery } = answers;

  if (usage === 'video') {
    return {
      model: 'MacBook Pro 16-inch (M3 Max)',
      reason: 'Best for video editing with high performance and large screen.',
    };
  }

  if (usage === 'programming') {
    if (portability === 'yes') {
      return {
        model: 'MacBook Air 15-inch (M3)',
        reason: 'Great for portability while offering good performance for coding.',
      };
    }
    return {
      model: 'MacBook Pro 14-inch (M3 Pro)',
      reason: 'Balances power and portability for developers.',
    };
  }

  if (usage === 'general') {
    if (battery === 'yes') {
      return {
        model: 'MacBook Air 13-inch (M3)',
        reason: 'Best for general use with long battery life.',
      };
    }
    return {
      model: 'MacBook Pro 14-inch (M3)',
      reason: 'Slightly more powerful for general tasks.',
    };
  }

  return {
    model: 'MacBook Air 13-inch (M2)',
    reason: 'A budget-friendly option for everyday tasks.',
  };
};
