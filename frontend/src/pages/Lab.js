import React, { useState } from 'react';
import Terminal from '../components/Terminal';
import styled from 'styled-components';

const LabContainer = styled.div`
  padding: 2rem;
  background-color: #0a0a0a;
  color: #33ff33;
  min-height: 100vh;
  font-family: 'Courier New', monospace;
`;

const DownloadLink = styled.a`
  color: #ff3366;
  display: block;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  &:hover {
    color: #ff66a1;
    text-decoration: underline;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border-left: 4px solid #58a6ff;
`;

const Title = styled.h1`
  color: #58a6ff;
  border-bottom: 2px solid #58a6ff;
  padding-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  color: #58a6ff;
  margin-top: 0;
`;

const Lab = () => {
  const [terminalOutput, setTerminalOutput] = useState([
    "Welcome to Facility Forensics Terminal.",
    "Analyze the packet capture to find the exfiltrated flag.",
    "Type 'help' for commands.",
    ">"
  ]);

  const handleCommand = async (command) => {
    // Add the command to the output
    setTerminalOutput(prev => [...prev, "> " + command]);

    if (command === 'help') {
      setTerminalOutput(prev => [...prev, 
        "Commands:", 
        "  download - Get the packet capture file", 
        "  verify-flag [FLAG] - Submit the flag for verification",
        "  clear - Clear the terminal",
        "",
        "Example: verify-flag KX{DR4G0NFLY_EXFIL}",
        ">"
      ]);
    } else if (command.startsWith('verify-flag ')) {
      const flag = command.substring('verify-flag '.length);
      await verifyFlag(flag);
    } else if (command === 'download') {
      setTerminalOutput(prev => [...prev, 
        "The packet capture is available for download above.", 
        ">"
      ]);
    } else if (command === 'clear') {
      setTerminalOutput([">"]);
    } else if (command.startsWith('KX{') && command.endsWith('}')) {
      // If user just types the flag without the verify-command prefix
      await verifyFlag(command);
    } else {
      setTerminalOutput(prev => [...prev, 
        "Command not recognized. Type 'help' for commands.", 
        ">"
      ]);
    }
  };

  const verifyFlag = async (flag) => {
    try {
      const response = await fetch('/api/verify-flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag })
      });
      const result = await response.json();
      setTerminalOutput(prev => [...prev, result.message, ">"]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, 
        "Error connecting to server.", 
        ">"
      ]);
    }
  };

  return (
    <LabContainer>
      <Title>FACILITY INTELLIGENCE DATABASE :: FORENSICS MODE</Title>

      <Section>
        <Subtitle>Overview</Subtitle>
        <p>Kai discovers security logs mentioning unusual incidents. Use advanced packet analysis techniques to uncover details about data exfiltration and find patterns in the network traffic.</p>
        <p><em>"Every data leak leaves traces in the network. The key is knowing which packets to inspect and how to read between the lines." – Dr Voss</em></p>
      </Section>

      <Section>
        <Subtitle>Context</Subtitle>
        <p>While exploring deeper network access, Kai stumbles upon packet captures that aren't meant for general viewing. These packets contain cryptic references to past events that might explain the facility's true purpose.</p>
        <p>The FIDB v2.3 system now shows additional network data with complex relationships. Security incidents are logged with codes, timestamps, and mysterious severity classifications. Some incidents seem connected to specific subjects...</p>
      </Section>

      <Section>
        <Subtitle>Technical Focus</Subtitle>
        <ul>
          <li>Master packet analysis using Wireshark or similar tools</li>
          <li>Work with ICMP and other protocols</li>
          <li>Understand base64 encoding and decoding</li>
          <li>Use pattern matching for hidden data</li>
          <li>Combine multiple packets to reconstruct data</li>
        </ul>
      </Section>

      <Section>
        <Subtitle>The Challenge</Subtitle>
        <p>You have access to a network packet capture. Your goal is to piece together what happened during the "DRAGONFLY" incident by analyzing the packets.</p>
        <p>This lab builds on your network forensics foundation by introducing advanced concepts like covert channels and data exfiltration. The flag awaits those who can connect the dots between seemingly unrelated packets.</p>
      </Section>

      <DownloadLink href="/lab_assets/medical_wing_capture.pcap" download>
        Download Network Capture (medical_wing_capture.pcap)
      </DownloadLink>

      <Terminal output={terminalOutput} onCommand={handleCommand} />
    </LabContainer>
  );
};

export default Lab;