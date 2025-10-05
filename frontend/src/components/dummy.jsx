


// import { useEffect, useState } from "react";

// export default function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Example API endpoint (replace with your backend)
//     fetch("http://localhost:5000/api/announcements")
//       .then((res) => res.json())
//       .then((data) => {
//         setAnnouncements(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching announcements:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-20 text-center text-gray-500">
//         <p>Loading announcements...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-white py-20 px-6 md:px-16">
//       <div className="container mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-14">
//           <p className="uppercase text-sm font-semibold text-gray-500 tracking-widest">
//             Stay Updated
//           </p>
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
//             Latest Announcements
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             Here’s what’s happening in our community. Don’t miss our upcoming events and news.
//           </p>
//         </div>

//         {/* Cards Grid */}
//         {announcements.length > 0 ? (
//           <div className="grid md:grid-cols-3 gap-10">
//             {announcements.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-[#F8F9FA] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
//               >
//                 {/* Image */}
//                 <div className="h-56 overflow-hidden">
//                   <img
//                     src={item.image || "/placeholder.jpg"} // fallback if image missing
//                     alt={item.title}
//                     className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <p className="text-sm text-gray-500">{item.date}</p>
//                   <h3 className="text-xl font-bold text-gray-900 mt-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 mt-3">{item.description}</p>

//                   {/* Read More */}
//                   <div className="mt-5">
//                     <a
//                       href={`/announcements/${item.id}`}
//                       className="text-[#2D6A4F] font-semibold hover:underline"
//                     >
//                       Read More →
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No announcements available right now.</p>
//         )}

//         {/* View All Button */}
//         <div className="text-center mt-14">
//           <a
//             href="/announcements"
//             className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
//           >
//             View All Announcements
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }
