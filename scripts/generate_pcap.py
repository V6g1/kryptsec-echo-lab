# scripts/generate_pcap.py
from scapy.all import *
import base64

# Create a list of packets
packets = []

# Add normal medical traffic: TCP and UDP packets
for i in range(10):
    # TCP packets to a medical server
    pkt = IP(dst="192.168.1.10") / TCP(dport=80) / Raw(load="Normal medical data heartbeat")
    packets.append(pkt)
    # UDP packets for diagnostics
    pkt = IP(dst="192.168.1.10") / UDP(dport=161) / Raw(load="System status OK")
    packets.append(pkt)

# Add ICMP covert channel packets with the flag
flag = "KX{DR4G0NFLY_EXFIL}"
encoded_flag = base64.b64encode(flag.encode()).decode()  # Base64 encode the flag

# Split the encoded flag into chunks
chunk_size = 20
chunks = [encoded_flag[i:i+chunk_size] for i in range(0, len(encoded_flag), chunk_size)]

for chunk in chunks:
    # Create ICMP Echo Request packets with the encoded data
    pkt = IP(dst="192.168.100.100") / ICMP() / Raw(load=chunk)
    packets.append(pkt)

# Write the packets to a PCAP file
wrpcap("medical_wing_capture.pcap", packets)