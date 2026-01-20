import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import ContactList from '../components/ContactList';
import Modal from '../components/Modal';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';
import '../css/HomePage.css';

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const applyFiltersAndSearch = useCallback(() => {
    let result = [...contacts];

    // Apply search
    if (searchTerm) {
      result = result.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
    }

    // Apply filter
    switch (filterOption) {
      case 'firstName':
        result.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'lastName':
        result.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'oldest':
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }

    setFilteredContacts(result);
  }, [contacts, searchTerm, filterOption]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete contact');
        console.error(error);
      }
    }
  };
  const handleDeleteFromModal = async () => {
    if (selectedContact && window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(selectedContact.id);
        toast.success('Contact deleted successfully');
        closeModal();
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete contact');
        console.error(error);
      }
    }
  };
  const handleUpdateContact = async (id, updatedContact) => {
    try {
      await contactAPI.update(id, updatedContact);
      toast.success('Contact updated successfully');
      setShowModal(false);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update contact');
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setModalType('');
  };

  return (
    <div className="home-page">
      <h1>All Contacts</h1>
      
      <div className="controls">
        <div className="search-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <button className="add-new-btn" onClick={() => navigate('/add-contact')}>
          ➕ Add New
        </button>
      </div>

      <div className="filter-section">
        <span className="filter-icon">▼</span>
        <span className="filter-label">Filter</span>
        <FilterDropdown filterOption={filterOption} onFilterChange={setFilterOption} />
      </div>

      {loading ? (
        <p className="loading">Loading contacts...</p>
      ) : (
        <ContactList
          contacts={filteredContacts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <Modal onClose={closeModal}>
          {modalType === 'view' ? (
            <ContactDetails contact={selectedContact} onEdit={() => setModalType('edit')} onDelete={handleDeleteFromModal} onClose={closeModal} />
          ) : (
            <ContactForm
              contact={selectedContact}
              onSave={handleUpdateContact}
              onCancel={closeModal}
              isEdit={true}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default HomePage;