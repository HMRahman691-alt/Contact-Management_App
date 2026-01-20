import '../css/ContactList.css';

function ContactList({ contacts, onView, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty-state">No Contact Information</p>;
  }

  return (
    <div className="contact-list">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>{index + 1}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td className="actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => onView(contact)}
                  title="View"
                >
                  👁️
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => onEdit(contact)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(contact.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;