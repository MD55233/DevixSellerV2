import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  textAlign: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch all WhatsApp contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/whatsapp/contacts`);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching WhatsApp contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <CardWrapper border={false} content={false}>
      <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom sx={{ color: 'secondary.main', mt: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" gutterBottom>
            Reach out to the following contacts on WhatsApp:
          </Typography>
        </Grid>

        {/* Display WhatsApp contacts */}
        {contacts.length > 0 ? (
          contacts.map((contact) => {
            const whatsappLink = `https://wa.me/${contact.whatsappNumber.replace('+', '')}`;
            return (
              <Grid item xs={12} sm={6} md={4} key={contact._id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Full Name: {contact.fullName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Email: {contact.email}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Phone Number: {contact.phoneNumber}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ m: 2 }}
                  >
                    Chat on WhatsApp
                  </Button>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6">No contacts available.</Typography>
          </Grid>
        )}
      </Grid>
    </CardWrapper>
  );
};

export default ContactUs;