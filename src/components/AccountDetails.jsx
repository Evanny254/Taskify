import React, { useState, useEffect } from 'react';

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: ''
  });
