import React from 'react';

const AboutPage = () => {
  const handleGoBack = () => {
    window.history.back(); // Takes the user back to the previous page
  };

  return (
    <div style={styles.container}>
      {/* Top-left Button */}
      <button onClick={handleGoBack} style={styles.backButton}>Back</button>
      
      <h1 style={styles.header} className='font-bold text-gray-900 tracking-tight'>About Contribution Manager</h1>
      <section style={styles.section}>
        <h2 style={styles.subHeader} className='font-serif'>Purpose</h2>
        <p>Contribution Manager helps you easily track and manage contributions, expenses, and payments. Whether you're monitoring household bills, group expenses, or personal spending, this app keeps everything organized in one place.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.subHeader} className='font-serif'>Key Features</h2>
        <ul>
          <li>Add Contributions: Log each contribution with a name, date, and amount.</li>
          <li>Track Expenses: View all contributions in a clean list, complete with edit and delete options.</li>
          <li>Search & Reports: Quickly search contributions and generate reports for better financial insights.</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.subHeader} className='font-serif'>Why Use Contribution Manager?</h2>
        <p>Stay organized with clear records of expenses. Easily update or remove entries as needed. Get a quick overview of contributions at a glance.</p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.subHeader} className='font-serif'>Contact Us</h2>
        <p>Have questions or suggestions? Reach out at <strong>gauravgawade073@gmail.com</strong>.</p>
      </section>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative' },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  header: { textAlign: 'center', color: '#333', marginTop: '60px' },
  subHeader: { color: '#555' },
  section: { marginBottom: '20px' },
};

export default AboutPage;