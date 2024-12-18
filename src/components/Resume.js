import React from 'react';

function Resume() {
  return (
    <div className="resume-container">
      <h1>Jayper C. Sanchez</h1>
      <h2>Full Stack Developer</h2>
      <p>
        📧 <a href="mailto:jaypersanchez@gmail.com">jaypersanchez@gmail.com</a> |
        🔗 LinkedIn: <a href="http://www.linkedin.com/in/jaypersanchez" target="_blank" rel="noopener noreferrer">Personal Profile</a> | 
        <a href="http://www.linkedin.com/company/virlanchainworks" target="_blank" rel="noopener noreferrer">Virlan Chainworks</a> |
        <a href="http://www.youtube.com/jaypersanchez" target="_blank" rel="noopener noreferrer">YouTube</a>
      </p>
      <p>📞 Contacts: +1.916.525.7143 | +1.778.678.7565 | +63.927.856.0238</p>

      <h3>About Me</h3>
      <p>
        Innovative Software Engineer | Blockchain Specialist | AI Enthusiast
        <br />
        With over five years as a Full-stack MERN Developer, I am skilled in Python and JavaScript. I have experience with server-side development using ExpressJS and Flask, along with RDBMS (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis).
      </p>

      <h3>Key Competencies</h3>
      <ul>
        <li>Solidity with latest pragma</li>
        <li>Hardhat and Truffle suite for smart contract development</li>
        <li>DeFi libraries (Uniswap V2, ERC20 tokens, NFT ERC1155)</li>
        <li>React and React Native for user interfaces</li>
        <li>ExpressJS and Flask for server-side functionalities</li>
        <li>SQL and NoSQL databases for data retention</li>
        <li>Machine Learning tools (NumPy, BERT, PyTorch, OpenAI SDK)</li>
        <li>DevOps for CI/CD on AWS and Google Cloud Platform</li>
      </ul>

      <h3>Education</h3>
      <ul>
        <li>Diploma in Information Technology, Cosumnes River College</li>
        <li>Associate Degree in Computer Programming & Systems Analysis, CompuCollege School of Business</li>
      </ul>

      <h3>Professional Experience</h3>
      <h4>Virlan Chainworks | Founder (2018 - Present)</h4>
      <p>
        Dynamic software development house specializing in blockchain, mobile applications, and web development. Key projects include:
      </p>
      <ul>
        <li>
          <strong>Satoshi Terminal:</strong> Led product development with Python using OpenBB SDK; integrated REST APIs and CI/CD with Jenkins.
        </li>
        <li>
          <strong>Funge:</strong> Developed an NFT platform using MongoDB, Solidity, and JavaScript for OpenSea integrations.
        </li>
        <li>
          <strong>WineTrust:</strong> Designed inventory systems using React and PostgreSQL; developed ERC1155 smart contracts for asset minting.
        </li>
        <li>
          <strong>Articify:</strong> Integrated AI-powered chatbots and telephony systems with Twilio, Google Calendar API, and OpenAI libraries.
        </li>
      </ul>

      <h4>Shyft Network | Fullstack MERN Developer (2018 - 2020)</h4>
      <ul>
        <li>Developed ERC20 and NFT smart contracts using Solidity and Truffle.</li>
        <li>Integrated decentralized apps with Metamask and Keplr wallets.</li>
        <li>Engaged with DeFi protocols like Uniswap and 1InchProtocol.</li>
      </ul>

      <h4>B.C. Ferries | Business Intelligence Developer (2018)</h4>
      <ul>
        <li>Created custom reports using JasperReports and Oracle databases.</li>
        <li>Streamlined SQL queries for Big Data and data warehouse migrations.</li>
      </ul>

      {/* Add additional professional experience as needed */}

      <h3>Key Projects</h3>
      <ul>
        <li>
          <strong>Fitspace:</strong> Health and fitness mobile application using React Native and MongoDB.
        </li>
        <li>
          <strong>JobDeal:</strong> Online job platform as CTO, leading ReactJS web application development and PostgreSQL database design.
        </li>
      </ul>

      <h3>Technical Expertise</h3>
      <ul>
        <li>Programming Languages: JavaScript, Python, Solidity, SQL</li>
        <li>Frameworks: React, React Native, Flask, ExpressJS</li>
        <li>Blockchain: Ethereum, Polygon, Cosmos, Solidity, Hardhat</li>
        <li>DevOps: Jenkins, AWS, Google Cloud</li>
        <li>AI/ML Tools: OpenAI SDK, NumPy, PyTorch</li>
      </ul>
    </div>
  );
}

export default Resume;
