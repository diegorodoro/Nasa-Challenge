import React from 'react';
import Navbar from '../components/Navbar';  // Add this line
import background from "../assets/images/background.jpg";
import Footer from '../detailViewAlex/components/footer';  // Add this line
import { motion } from 'framer-motion';


const Team = () => {
     const teamMembers = [
          {
               name: 'Iñigo Quintana Delgadillo',
               github: 'https://github.com/Inigo1405',
               linkedin: 'https://www.linkedin.com/in/inigo-quintana/',
               imagen: '../src/team/photos/inigo.jpg',
          },
          {
               name: 'Diego Rodríguez Orozco',
               github: 'https://github.com/diegorodoro',
               linkedin: 'https://www.linkedin.com/in/diego-rodriguez-orozco/',
               imagen: '../src/team/photos/Diego.jpeg',
          },
          {
               name: 'David Bojalil Abiti',
               github: 'https://github.com/DavidBo9',
               linkedin: 'https://www.linkedin.com/in/david-bojalil-abiti-a90407284/',
               imagen: '../src/team/photos/David.jpg',
          },
          {
               name: 'Josua Alejandro Zamarrón Ramírez',
               github: 'https://github.com/RedGhost1505',
               linkedin: 'https://www.linkedin.com/in/alejandro-ram%C3%ADrez-a5b793192/',
               imagen: '../src/team/photos/Alex.jpeg',
          },
          {
               name: 'Erick Guevara Morales',
               github: 'https://github.com/ErickG09',
               linkedin: 'https://www.linkedin.com/in/erick-guevara-morales-b1b669331/',
               imagen: '../src/team/photos/Erick.jpeg',
          },
          {
               name: 'José Pablo Hernández Alonso',
               github: 'https://github.com/JPHAJP',
               linkedin: 'https://www.linkedin.com/in/jos%C3%A9-pablo-hern%C3%A1ndez-alonso-03a195256/',
               imagen: '../src/team/photos/JosePablo.jpeg',
          }
     ];

     return (
          <section className="min-h-screen w-full flex flex-col relative overflow-hidden bg-cover bg-center"
                              style={{ backgroundImage: `url(${background})` }}
                              id="home">
               {/* Navbar */}
               <Navbar />
               {/* Content */}
               <div className="flex justify-around items-start mt-44 mx-30 text-white">
                    {/* First Column */}
                    <div className="space-y-10">
                         {teamMembers.slice(0, Math.ceil(teamMembers.length / 2)).map((member, index) => (
                         <div key={index} className="flex items-center space-x-4">
                              <img src={member.imagen} alt="NASA badge" className="w-24 h-30" />
                              <div>
                              <p className="text-lg font-semibold">{member.name}</p>
                              <div className="flex space-x-2">
                                   {/* GitHub Icon */}
                                   <a href={member.github} target="_blank" rel="noopener noreferrer">
                                   <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="currentColor"
                                   className="text-blue-500 hover:text-blue-700"
                                   >
                                   <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.17c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.746.083-.731.083-.731 1.205.084 1.84 1.235 1.84 1.235 1.071 1.835 2.809 1.305 3.495.998.108-.776.419-1.306.762-1.606-2.665-.305-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.305-.535-1.53.118-3.186 0 0 1.008-.322 3.301 1.23a11.54 11.54 0 0 1 3.003-.404c1.02.005 2.045.137 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.657.243 2.882.12 3.186.769.84 1.236 1.91 1.236 3.221 0 4.61-2.804 5.624-5.475 5.921.43.37.815 1.102.815 2.22v3.293c0 .321.216.695.826.577C20.565 21.798 24 17.3 24 12c0-6.628-5.372-12-12-12z" />
                                   </svg>
                                   </a>
                                   {/* LinkedIn Icon */}
                                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                   <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="24"
                                   height="24"
                                   viewBox="0 0 256 256"
                                   preserveAspectRatio="xMidYMid"
                                   className="text-blue-500 hover:text-blue-700"
                                   fill="currentColor"
                                   >
                                   <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
                                   </svg>
                                   </a>
                              </div>
                              </div>
                         </div>
                         ))}
                    </div>

                    {/* Second Column */}
                    <div className="space-y-10">
                         {teamMembers.slice(Math.ceil(teamMembers.length / 2)).map((member, index) => (
                         <div key={index} className="flex items-center space-x-4">
                              <img src={member.imagen} alt="NASA badge" className="w-24 h-30" />
                              <div>
                              <p className="text-lg font-semibold">{member.name}</p>
                              <div className="flex space-x-2">
                                   {/* GitHub Icon */}
                                   <a href={member.github} target="_blank" rel="noopener noreferrer">
                                   <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="24"
                                   height="24"
                                   viewBox="0 0 24 24"
                                   fill="currentColor"
                                   className="text-blue-500 hover:text-blue-700"
                                   >
                                   <path d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.17c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.746.083-.731.083-.731 1.205.084 1.84 1.235 1.84 1.235 1.071 1.835 2.809 1.305 3.495.998.108-.776.419-1.306.762-1.606-2.665-.305-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.305-.535-1.53.118-3.186 0 0 1.008-.322 3.301 1.23a11.54 11.54 0 0 1 3.003-.404c1.02.005 2.045.137 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.657.243 2.882.12 3.186.769.84 1.236 1.91 1.236 3.221 0 4.61-2.804 5.624-5.475 5.921.43.37.815 1.102.815 2.22v3.293c0 .321.216.695.826.577C20.565 21.798 24 17.3 24 12c0-6.628-5.372-12-12-12z" />
                                   </svg>
                                   </a>
                                   {/* LinkedIn Icon */}
                                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                   <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="24"
                                   height="24"
                                   viewBox="0 0 256 256"
                                   preserveAspectRatio="xMidYMid"
                                   className="text-blue-500 hover:text-blue-700"
                                   fill="currentColor"
                                   >
                                   <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
                                   </svg>
                                   </a>
                              </div>
                              </div>
                         </div>
                         ))}
                    </div>

               </div>
                    
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
                    <Footer />
               </motion.div>
          </section>
     );
};
   
export default Team;