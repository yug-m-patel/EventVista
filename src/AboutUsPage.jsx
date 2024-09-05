import React, { useState } from 'react';
import { CssBaseline, Container, Grid, Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import cllgimg from './assets/images/cllg.jpg';

const AboutUsPage = () => {
  // Dummy data for demonstration
  const mission = "At Event-Vista, our mission is to exceed our clients' expectations by delivering exceptional event experiences that leave a lasting impression.";
  const approach = "Our approach to event planning is rooted in attention to detail, creativity, and a deep understanding of the industry.";
  const team = "Our team of event professionals is the backbone of Event-Vista, bringing unique skills and expertise to tackle even the most complex challenges.";

  // State to manage sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} searchEvents={() => {}} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={10}>
            <Box 
              mt={2}  // Adjusted top margin to reduce gap
              style={{ 
                backgroundColor: '#fff', 
                padding: '24px',  // Adjusted padding for more content space
                borderRadius: '8px',
                width: '100%', 
                maxWidth: '1200px', 
                margin: '0 auto'
              }}
            >
              <section className="w-full py-8 md:py-16 lg:py-24">  
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Who We Are</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Event-Vista is a leading event management organization dedicated to creating unforgettable experiences for our clients.
                  </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <img
                    src={cllgimg}
                    width="550"
                    height="310"
                    alt="About Us"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Mission</h3>
                      <p className="text-muted-foreground">{mission}</p>
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Approach</h3>
                      <p className="text-muted-foreground">{approach}</p>
                    </div>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Team</h3>
                      <p className="text-muted-foreground">{team}</p>
                    </div>
                  </div>
                </div>
              </section>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUsPage;
