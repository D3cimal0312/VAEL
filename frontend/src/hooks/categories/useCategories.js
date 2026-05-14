// import { useState, useEffect } from 'react';
// import { categoryService } from '@/services/categoryService';
// import toast from 'react-hot-toast';

// // get all categories
// export function useCategories() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetch() {
//       setLoading(true);
//       try {
//         const data = await categoryService.getAll(sortOrder);
//         setCategories(data);
//       } catch (e) {
//         toast.error(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     console.log(categories)
//     fetch();
//   }, [sortOrder]);

//   return { categories, loading };
// }

// // get single by id
// // export function useCategory(id) {
// //   const [category, setCategory] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!id) return;
// //     async function fetch() {
// //       setLoading(true);
// //       try {
// //         const data = await categoryService.getById(id);
// //         setCategory(data);
// //       } catch (e) {
// //         toast.error(e.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetch();
// //   }, [id]);

// //   return { category, loading };
// // }

