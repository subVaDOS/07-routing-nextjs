"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
    <Modal onClose={handleClose}>
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
