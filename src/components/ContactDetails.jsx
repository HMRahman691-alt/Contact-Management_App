import '../css/ContactDetails.css';

function ContactDetails({ contact, onEdit, onDelete, onClose }) {
  return (
    <div className="contact-details">
      <h2 className="details-title">
        <a href="/" className="app-link">Contact App</a>
      </h2>
      <h3>Contact Details</h3>
      
      <div className="detail-group">
        <label>First Name</label>
        <p>{contact.firstName}</p>
      </div>

      <div className="detail-group">
        <label>Last Name</label>
        <p>{contact.lastName}</p>
      </div>

      <div className="detail-group">
        <label>Email</label>
        <p>{contact.email}</p>
      </div>

      <div className="detail-group">
        <label>Phone</label>
        <p>{contact.phone}</p>
      </div>

      <div className="detail-group">
        <label>Address</label>
        <p>{contact.address}</p>
      </div>

      <div className="detail-actions">
        <button className="edit-link" onClick={onEdit}>Edit</button>
        <button className="delete-link" onClick={onDelete}>Delete</button>
        <button className="cancel-link" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ContactDetails;