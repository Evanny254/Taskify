import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { FaUser, FaTasks, FaProjectDiagram } from 'react-icons/fa';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    marginRight: 10,
    fontSize: 50, 
    color: '#00bcd4', 
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#00bcd4', 
    
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333', 
  },
  subheading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#00bcd4', 
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555', 
  },
  icon: {
    marginRight: 10,
    fontSize: 20, 
    color: '#00bcd4', 
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    color: '#00bcd4', 
    fontSize: 20,
  },
});

const TaskReport = () => {
  const [userData, setUserData] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetchUserData();

    // Fetch tasks data
    fetchTasksData();

    // Fetch projects data
    fetchProjectsData();
  }, []);

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await fetch('https://taskify-backend-5v37.onrender.com/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTasksData = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await fetch('https://taskify-backend-5v37.onrender.com/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasksData(data);
      } else {
        console.error('Failed to fetch tasks data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tasks data:', error);
    }
  };

  const fetchProjectsData = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await fetch('https://taskify-backend-5v37.onrender.com/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjectsData(data);
      } else {
        console.error('Failed to fetch projects data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects data:', error);
    }
  };

  const renderTasks = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.subheading}><FaTasks style={styles.icon} /> Tasks</Text>
        {tasksData.map(task => (
          <View key={task.title} style={{ marginBottom: 10 }}>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Title:</Text> {task.title}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Description:</Text> {task.description}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Category:</Text> {task.category}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Due Date:</Text> {task.due_date}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Priority:</Text> {task.priority}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Status:</Text> {task.status}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Reminder Date:</Text> {task.reminder_date}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Recurrence Pattern:</Text> {task.recurrence_pattern}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderProjects = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.subheading}><FaProjectDiagram style={styles.icon} /> Projects</Text>
        {projectsData.map(project => (
          <View key={project.name} style={{ marginBottom: 10 }}>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Name:</Text> {project.name}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Description:</Text> {project.description}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Start Date:</Text> {project.start_date}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>End Date:</Text> {project.end_date}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <FaTasks className={styles.logo} />
            <Text style={styles.title}>Taskify Report</Text>
          </View>
          {userData && (
            <View style={styles.section}>
              <Text style={styles.subheading}><FaUser style={styles.icon} /> User Details</Text>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Username:</Text> {userData.username}</Text>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Email:</Text> {userData.email}</Text>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: '#333' }}>Bio:</Text> {userData.bio}</Text>
            </View>
          )}
          {tasksData.length > 0 && renderTasks()}
          {projectsData.length > 0 && renderProjects()}
          <View style={styles.footer}>
            <Text>Taskify - Your Ultimate Task Management Solution</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TaskReport;
