'use client';

import css from './NotesPage.module.css';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import type { FetchNotesRes } from '@/lib/api';

interface NotesClientProps {
  initialData: FetchNotesRes;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['note', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
    initialData: debouncedSearch === '' && page === 1 ? initialData : undefined,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const totalPages = data?.totalPages || 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
