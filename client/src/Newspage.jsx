import React, { useState } from 'react';
import { CssBaseline, Grid, Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import shadows from '@mui/material/styles/shadows';

export default function NewsPage() {
  const news = [
    {
      title: "New Advancements in Robotic Surgery",
      description:
        "Researchers have developed a new robotic surgical system that offers greater precision and control for complex procedures.",
      date: "May 15, 2023",
    },
    {
      title: "Breakthrough in Cancer Treatment",
      description:
        "A team of scientists has discovered a novel approach to cancer therapy that shows promising results in clinical trials.",
      date: "April 28, 2023",
    },
    {
      title: "Innovative Prosthetic Limb Technology",
      description:
        "Engineers have created a prosthetic limb that utilizes advanced sensors and algorithms to provide users with a more natural and responsive experience.",
      date: "March 22, 2023",
    },
    {
      title: "Groundbreaking Developments in Regenerative Medicine",
      description:
        "Researchers have made significant progress in the field of regenerative medicine, paving the way for new treatments for a variety of medical conditions.",
      date: "February 10, 2023",
    },
    {
      title: "Advancements in Telemedicine and Remote Patient Monitoring",
      description:
        "The COVID-19 pandemic has accelerated the adoption of telemedicine and remote patient monitoring technologies, improving access to healthcare.",
      date: "January 5, 2023",
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Styles
  const styles = {
    section: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      padding: '2rem 1rem',
    },
    container: {
      maxWidth: '1120px',
      margin: '0 auto',
    },
    heading: {
      marginBottom: '1.5rem',
      fontSize: '35px',
      fontWeight: 'bold',
      color: '#333',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      '@media(min-width: 640px)': {
        gridTemplateColumns: '1fr 1fr',
      },
      '@media(min-width: 1024px)': {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
    card: {
      borderRadius: '0.5rem',
      backgroundColor: '#fff',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease',
    },
    cardHover: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 1)',
    },
    title: {
      marginBottom: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#333',
      // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    description: {
      marginBottom: '1rem',
      color: '#777',
    },
    date: {
      fontSize: '0.875rem',
      color: '#777',
    },
  };

  return (
    <>
    <Header toggleSidebar={toggleSidebar} />
    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <div style={styles.section}>
        
      <CssBaseline />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Box mt={4} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
            <div style={styles.container}>
              <h2 style={styles.heading}>News</h2>
              <div style={styles.grid}>
                {news.map((item, index) => (
                  <div
                    key={index}
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.card.boxShadow;
                    }}
                  >
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.description}>{item.description}</p>
                    <p style={styles.date}>{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
    </>
  );
}
