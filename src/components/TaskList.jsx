import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
const [selectedTask, setSelectedTask] = useState(null);
const [commentInput, setCommentInput] = useState('');
const [comments, setComments] = useState({});

