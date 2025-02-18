// import React, { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import Text from "../ReusableComponents/Text";
// import Row from "../ReusableComponents/Row";
// import Card from "../ReusableComponents/Card";
// import Section from "../ReusableComponents/Section";
// import { fetchPlannerHighlights } from "./api"; 
// import SectionTitle from "../ReusableComponents/SectionTitle";

// const PlannerHighlights = ({ userId }) => {  // ✅ userId passed as a prop
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const loadEvents = async () => {
//       if (!userId) {
//         console.warn("User ID is missing. Skipping fetch.");
//         return;
//       }

//       try {
//         const data = await fetchPlannerHighlights(userId);
//         console.log("Final data received in PlannerHighlights:", data);

//         setEvents(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error loading planner highlights:", error);
//         setEvents([]);
//       }
//     };

//     loadEvents();
//   }, [userId]);

//   return (
//     <Section>
//       <Box mb={3}>
//         <SectionTitle mb={1}>Planner Highlights</SectionTitle>
//         <Row>
//           {events.length === 0 ? (
//             <Text>No upcoming events found.</Text>
//           ) : (
//             events.map((event, index) => (
//               <Card key={index}>
//                 <Text variant="body1" fontWeight="bold">
//                   {event.title}
//                 </Text>
//                 <Text variant="body2">{event.date}</Text>
//               </Card>
//             ))
//           )}
//         </Row>
//       </Box>
//     </Section>
//   );
// };

// export default PlannerHighlights;
