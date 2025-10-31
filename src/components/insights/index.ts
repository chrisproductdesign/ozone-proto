// Export types from InsightList (keep interface definitions)
export { type Insight, type InsightType } from './InsightList';
import type { Insight, InsightType } from './InsightList';

// Export new components
export { InsightIconBadge, type InsightIconBadgeProps } from './InsightIconBadge';
export { InsightPanel, type InsightPanelProps } from './InsightPanel';

// Helper function to determine highest priority insight type
export function getHighestPriorityType(insights: Insight[]): InsightType {
  if (insights.length === 0) return 'neutral';

  // Priority order: negative > warning > positive > neutral
  const priorityOrder: Record<InsightType, number> = {
    negative: 4,
    warning: 3,
    positive: 2,
    neutral: 1,
  };

  let highestType: InsightType = 'neutral';
  let highestPriority = 0;

  insights.forEach((insight) => {
    const priority = priorityOrder[insight.type];
    if (priority > highestPriority) {
      highestPriority = priority;
      highestType = insight.type;
    }
  });

  return highestType;
}
