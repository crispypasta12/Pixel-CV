import type { PacketRoute } from "@/types/game";

export const uartDmaRoute: PacketRoute = {
  id: "uart-dma",
  title: "UART + DMA Data Path",
  nodes: [
    {
      id: "tool-uart",
      label: "Tool UART",
      description: "Source communication from tool/BLE-side interface.",
    },
    {
      id: "usart2-rx",
      label: "USART2 RX",
      description: "Receives data from the tool-side UART interface.",
    },
    {
      id: "dma-channel",
      label: "DMA Channel",
      description:
        "Moves UART data into memory without CPU-heavy byte-by-byte handling.",
    },
    {
      id: "circular-buffer",
      label: "Circular Buffer",
      description: "Stores streaming data safely for processing and forwarding.",
    },
    {
      id: "lpuart1-tx",
      label: "LPUART1 TX",
      description: "Forwards data toward the cellular module interface.",
    },
    {
      id: "cellular-module",
      label: "Cellular Module",
      description: "Represents BG770A/cellular communication and AT-command workflows.",
    },
  ],
  status: {
    "Buffer Health": "OK",
    "Packet Loss": "0",
    "DMA Mode": "Circular",
    "Flow Control": "Disabled",
    "Baud Rate": "Matched UART baud",
  },
};

export const iotPacketRoute: PacketRoute = {
  id: "iot-router",
  title: "MQTT / IoT Packet Router",
  nodes: [
    {
      id: "tool-device",
      label: "Tool Device",
      description: "Generates a local payload for the simulated IoT route.",
    },
    {
      id: "ble-module",
      label: "BLE Module",
      description: "Receives nearby packets and bridges them into the tool flow.",
    },
    {
      id: "cellular-module",
      label: "Cellular Module",
      description: "Represents modem registration and uplink readiness.",
    },
    {
      id: "mqtt-broker",
      label: "MQTT Broker",
      description: "Routes publish events through a simulated broker.",
    },
    {
      id: "aws-cloud",
      label: "AWS Cloud",
      description: "Simulated cloud ingestion endpoint. No real AWS calls are made.",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Shows a successful portfolio-safe upload result.",
    },
  ],
  status: {
    "Tool Device": "Ready",
    "BLE Link": "Active",
    Cellular: "Registered",
    MQTT: "Connected",
    "Cloud Upload": "Success",
  },
  logs: [
    "[00:01] Tool payload generated",
    "[00:02] BLE bridge received packet",
    "[00:03] Cellular module connected",
    "[00:04] MQTT publish success",
    "[00:05] Dashboard updated",
  ],
};
