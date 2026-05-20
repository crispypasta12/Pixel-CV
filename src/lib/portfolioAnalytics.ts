type PortfolioEventMetadata = Record<string, string | number | boolean | null | undefined>;

type PortfolioAnalyticsBridge = {
  track?: (eventName: string, metadata?: PortfolioEventMetadata) => void;
};

export function trackPortfolioEvent(
  eventName: string,
  metadata?: PortfolioEventMetadata,
) {
  if (typeof window === "undefined") {
    return;
  }

  const bridge = (window as typeof window & { portfolioAnalytics?: PortfolioAnalyticsBridge })
    .portfolioAnalytics;

  if (bridge?.track) {
    bridge.track(eventName, metadata);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[portfolio-event]", eventName, metadata ?? {});
  }
}
