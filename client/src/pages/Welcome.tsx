import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAppSelector } from '../redux/hooks';


export default function Welcome() {
  const auth = useAppSelector((state) => state.auth);

  return auth === false ? (
    <Card style={{ background: 'darkslateblue' }}>
      <CardContent>
        <div
          className='ui header'
          style={{ textAlign: 'center', color: 'ivory' }}
        >
          <h1>Welcome to the Berry Club 🍇</h1>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href='/auth/google'>
            <button className='btn'>
              <GoogleIcon />
              <span style={{ paddingLeft: '0.5em' }}>
                Sign in with Google
              </span>
            </button>
          </a>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Navigate to='dashboard' />
  );
}
