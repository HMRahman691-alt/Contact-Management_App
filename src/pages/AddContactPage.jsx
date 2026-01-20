import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';
import ContactForm from '../components/ContactForm';
import '../css/AddContactPage.css';

function AddContactPage() {
  const navigate = useNavigate();

  const handleSave = async (newContact) => {
    try {
      await contactAPI.create(newContact);
      toast.success('Contact added successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add contact');
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-contact-page">
      <h2 className="page-title">
        <a href="/" className="app-link">Contact App</a>
      </h2>
      <h3>Add New Contact</h3>
      <ContactForm onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default AddContactPage;