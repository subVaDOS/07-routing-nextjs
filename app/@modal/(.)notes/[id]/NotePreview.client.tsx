// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import { fetchNoteById } from "@/lib/api";
// import css from "./NotePreview.module.css";
// import Modal from "@/components/Modal/Modal";
// import { Note } from "@/types/note";
// import { FiX } from "react-icons/fi";

// const NotePreview: React.FC = () => {
//   const router = useRouter();
//   const { id } = useParams<{ id: string }>();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery<Note>({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   const handleClose = () => {
//     router.back();
//   };

//   if (isLoading) return <p>Loading, please wait...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!note) return <p>Note not found</p>;

//   return (
//     <Modal>
//       <div className={css.container}>
//         <button
//           className={css.closeButton}
//           onClick={handleClose}
//           aria-label="Close modal"
//         >
//           <FiX size={24} />
//         </button>

//         <div className={css.item}>
//           <div className={css.header}>
//             <h2>{note.title}</h2>
//           </div>

//           <div className={css.contentSection}>
//             <p className={css.content}>{note.content}</p>
//           </div>

//           <div className={css.meta}>
//             <span className={css.tag}>{note.tag}</span>
//             <span className={css.date}>
//               {new Date(note.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default NotePreview;

"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { FiX } from "react-icons/fi";

const NotePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };
  const router = useRouter();
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;
  return (
    <Modal>
      <div className={css.container}>
        <button
          className={css.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.content}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
