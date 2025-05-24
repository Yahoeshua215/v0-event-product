import { JourneyStage } from './types';

export const customerJourneyStages: JourneyStage[] = [
  {
    id: 1,
    title: "Stage 1: Getting Behavioral Data into OneSignal (Ingestion)",
    marketerGoal: "To bring rich behavioral data from various sources (like data warehouses, CDPs, apps, or servers) directly into OneSignal for activation. This needs to happen without significant technical effort or ongoing dependency on engineering teams.",
    currentPainPoint: "The current process requires engineers to pull data from other tools (like a data warehouse or CDP), transform it into static data tags, and manually upload them into OneSignal. This is described as slow, complicated, inflexible, and requiring developer assistance. Some companies face technical barriers to integration.",
    oneSignalEventsSolution: "OneSignal Events offers flexible ingestion options designed for ease of use, including direct integrations with data warehouses (BigQuery, Databricks, via Census), CDP integrations (Segment, Amplitude), API, and SDK. These integrations are being built to require little or no engineering support post-setup, empowering marketers to work independently. This facilitates a faster setup and time to value. Message Events (interactions with OneSignal messages) are already tracked and available.",
    exampleEventDataFocus: "e.g., Data ingested from: BigQuery, Segment API, SDKs. Event: `user_signup`"
  },
  {
    id: 2,
    title: "Stage 2: Verifying Event Data Flow and Details",
    marketerGoal: "To confirm that the event data is successfully flowing into OneSignal from the configured sources and is associated with the correct user profiles. They need to be able to see the details of specific event instances for validation and troubleshooting.",
    currentPainPoint: "Difficulty in validating if events were received correctly or seeing the history of events for a specific user. Lack of a centralized view to see individual event logs or user activity timelines.",
    oneSignalEventsSolution: "The Events Index includes a Logs View providing a chronological list of every instance an event occurred, including timestamps and property values for each individual event. Users expect to see events listed on the User Profile timeline to validate that data is present for a specific user. Filtering capabilities on the user profile timeline are expected to easily find specific events. This helps build confidence that OneSignal is receiving data correctly.",
    exampleEventDataFocus: 'e.g., Logs View showing: {"timestamp": "2024-01-15T10:30:00Z", "event": "item_purchased", "user_id": "user123", "value": 29.99}'
  },
  {
    id: 3,
    title: "Stage 3: Defining Targeting and Trigger Logic",
    marketerGoal: "To define exactly *which* users to target and *when*, based on specific user behaviors or combinations of behaviors. This logic might be simple (reacting to one event) or complex (based on multiple events, frequency, recency, or property values).",
    currentPainPoint: "Static tags lack the flexibility to capture dynamic user behavior or complex logic. Building segments often requires requesting lists from analytics teams or relying on engineering. Reacting in real-time or basing segmentation on combinations of behaviors and timing is difficult or impossible. Existing segmentation options may be limited.",
    oneSignalEventsSolution: "Users can trigger journeys directly based on a single specific event happening in real-time. For more complex logic, marketers can create segments based on events, using rules that combine multiple events, specify frequency ('at least once', 'last 30 days'), and filter by property values. The segment builder is expected to be intuitive and allow filtering by event name, properties, and date range, ideally with an experience similar to tools like Mixpanel. Segments based on events update automatically in real-time as user behavior changes.",
    exampleEventDataFocus: 'e.g., Segment rule: Users who triggered `cart_abandoned` AND NOT `purchase_completed` in last 24 hours.'
  },
  {
    id: 4,
    title: "Stage 4: Building and Personalizing Campaigns/Flows",
    marketerGoal: "To design and build automated multi-step communication workflows (Flows) or targeted campaigns that are triggered by the defined event or segment logic. Messages need to be personalized using the rich details from the events. Communication should be coordinated across multiple channels.",
    currentPainPoint: "Existing tools might require custom code for real-time triggers or cross-channel orchestration. Using dynamic data from tags or events in messages can be technically complex, often requiring developers or understanding syntax like Liquid. Static tags limit real-time response and deep personalization. Existing journey builder UI might not clearly show the trigger event or segment name on the canvas.",
    oneSignalEventsSolution: "The Flow builder allows setting up automated sequences of messages triggered by an event or a segment. OneSignal offers native omnichannel support for coordinating push notifications, in-app messages, email, SMS, and Live Activities within these flows. The feature supports personalizing messages using event property values via Liquid syntax. Clear visibility of the segment name and event name on the flow canvas is a desired improvement.",
    exampleEventDataFocus: 'e.g., Flow triggered by `viewed_product` event. Message personalized with: "Hi {{ event.user_name }}, still interested in {{ event.product_name }}?"'
  },
  {
    id: 5,
    title: "Stage 5: Launching and Analyzing Performance",
    marketerGoal: "To launch the event-triggered flows or segment-based campaigns and measure their effectiveness in driving desired user actions, improving engagement, retention, and conversion. They need to understand how users are interacting with the messages and progressing through the flow.",
    currentPainPoint: "Measuring the direct impact of campaigns based on static tags can be challenging. Lack of integrated reporting that ties message performance directly back to specific events or user behaviors. Difficulties in viewing historical performance data beyond short periods.",
    oneSignalEventsSolution: "The Events Index is intended to provide links or access points to reports related to event performance over time (e.g., an 'Outcome report'). The ability to easily see which specific users have triggered an event from the index can aid in analysis. The overall product aims to drive higher conversion rates, better retention, increased lifetime value, and more efficient spend by enabling timely, personalized messaging. Access to flow reporting for longer historical views (e.g., 6mths or 1yr ago) is a desired improvement.",
    exampleEventDataFocus: "e.g., Outcome report showing +15% conversion for users in event-triggered flow vs. control group."
  }
]; 