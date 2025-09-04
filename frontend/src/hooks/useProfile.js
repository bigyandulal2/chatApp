// // hooks/useId.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const useProfile = () => {
//   const [user, setUser] = useState(null); // { name, email, _id, ... }
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");

//   // console.log("tokenfrom useProfile", token);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) {
//         setError("No token found");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/users/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [token]);

//   return { user, loading, error };
// };
