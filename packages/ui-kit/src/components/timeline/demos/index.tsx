import { Timeline, TimelineItem } from '@fluxsum/ui-kit';

export default () => {
  return (
    <Timeline>
      <TimelineItem title="Project Created" time="2024-01-10" dotVariant="success">
        Initial project setup and repository created.
      </TimelineItem>
      <TimelineItem title="First Release" time="2024-02-15">
        Version 0.1.0 published to npm.
      </TimelineItem>
      <TimelineItem title="Major Update" time="2024-03-20" dotVariant="warning">
        Breaking changes in API. See migration guide.
      </TimelineItem>
      <TimelineItem title="Stable Release" time="2024-04-01" dotVariant="success" last>
        Version 1.0.0 — production ready.
      </TimelineItem>
    </Timeline>
  );
};
