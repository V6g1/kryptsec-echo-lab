# Kryptsec Echo Protocol Lab

A digital forensics lab built in the style of Kryptsec's story-driven challenges.

## Features
- Interactive comic-style story introduction
- PCAP analysis challenge with hidden flag
- Terminal interface for flag verification
- Docker containerization for easy deployment

## Running the Lab

1. Ensure Docker is installed on your system
2. Extract the provided ZIP file
3. Open a terminal in the extracted directory
4. Run: `docker-compose up --build`
5. Open your browser to: http://localhost:8080

## Lab Challenge
Analyze the provided PCAP file to find the exfiltrated flag hidden in ICMP packets.

Flag format: KX{DR4G0NFLY_EXFIL}

## Technical Details
- Frontend: React with styled components
- Backend: Node.js with Express
- Database: SQLite for progress tracking
- Containerization: Docker with multi-stage build