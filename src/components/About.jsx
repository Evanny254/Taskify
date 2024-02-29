import React from "react";

const About = () => {
  return (
    <div className="bg-cyan-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-800">Taskify</h1>
          <p className="text-lg text-cyan-700">Task Management Application</p>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-cyan-800 mb-4 text-center">About Taskify</h2>
          <p className="text-lg text-cyan-700 leading-relaxed mx-auto max-w-2xl">
            Taskify is a powerful task management application designed to help individuals and teams organize their tasks effectively. With intuitive features and a user-friendly interface, Taskify simplifies task management and boosts productivity.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-cyan-800 mb-4">Key Features</h3>
              <ul className="text-lg text-cyan-700">
                <li className="mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current text-cyan-500" viewBox="0 0 20 20">
                    <path d="M10 2C5.63 2 2 5.63 2 10s3.63 8 8 8 8-3.63 8-8-3.63-8-8-8zm0 14.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-.47-6.42l-3.5 3.5 1.41 1.41 2.09-2.09V8.5h-1.5v1.58z"/>
                  </svg>
                  Task Creation and Assignment
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current text-cyan-500" viewBox="0 0 20 20">
                    <path d="M17 18h2v2h-2v-2zm-2 0h2v2h-2v-2zm-2 0h2v2h-2v-2zM5 6h10v2H5V6zm0 4h10v2H5v-2zm0 4h7v2H5v-2zm12-9v14H3V5h14zm-2 12h2v2h-2v-2zm-2 0h2v2h-2v-2zm-2 0h2v2h-2v-2zm-4 0h2v2H5v-2zm0 2v-2h2v2H5z"/>
                  </svg>
                  Deadline Tracking
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current text-cyan-500" viewBox="0 0 20 20">
                    <path d="M10 20c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-18c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-.71 11.29l-3.29-3.3-1.42 1.42 4.71 4.72 9.72-9.72-1.41-1.42-8.31 8.3z"/>
                  </svg>
                  Priority Setting
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current text-cyan-500" viewBox="0 0 20 20">
                    <path d="M15 2c-1.1 0-2 .9-2 2v1H7V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 13H5V6h9v9zm-7-7h5v1H7V8zm0 2h5v1H7v-1zm0 2h3v1H7v-1z"/>
                  </svg>
                  Collaborative Workspace
                </li>
                <li className="mb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 fill-current text-cyan-500" viewBox="0 0 20 20">
                    <path d="M10 2C5.63 2 2 5.63 2 10s3.63 8 8 8 8-3.63 8-8-3.63-8-8-8zm0 14.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-.47-6.42l-3.5 3.5 1.41 1.41 2.09-2.09V8.5h-1.5v1.58z"/>
                  </svg>
                  Real-time Updates
                </li>
              </ul>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
