"use client";

import { useMemo, useState } from "react";
import { bleDevices } from "@/data/bleDevices";
import type { BLEDevice, BLEDeviceType } from "@/types/game";
import { RadarScan } from "./RadarScan";
import { SimulationModal } from "./SimulationModal";
import styles from "./PixelGame.module.css";

type BLEScannerDemoProps = {
  onClose: () => void;
  onScanStart?: () => void;
  onInspectDevice?: () => void;
};

const filters = ["All", "Firmware", "IoT", "Creative", "Research"] as const;

export function BLEScannerDemo({
  onClose,
  onScanStart,
  onInspectDevice,
}: BLEScannerDemoProps) {
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedDevice, setSelectedDevice] = useState<BLEDevice>(bleDevices[0]);

  const visibleDevices = useMemo(() => {
    if (filter === "All") {
      return bleDevices;
    }

    return bleDevices.filter((device) => device.type === filter);
  }, [filter]);

  const startScan = () => {
    setScanning(true);
    onScanStart?.();
  };

  const selectDevice = (device: BLEDevice) => {
    setSelectedDevice(device);
    onInspectDevice?.();
  };

  return (
    <SimulationModal eyebrow="Firmware Lab" title="BLE Scanner Demo" onClose={onClose}>
      <p className={styles.modalSummary}>
        Simulated local BLE scan. This visualizes discovery workflows without using radio hardware.
      </p>
      <div className={styles.demoToolbar}>
        <button type="button" onClick={scanning ? () => setScanning(false) : startScan}>
          {scanning ? "Stop Scan" : "Start Scan"}
        </button>
        <div className={styles.segmentedControl} aria-label="BLE device filter">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item}
              key={item}
              onClick={() => setFilter(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.twoColumnDemo}>
        <RadarScan scanning={scanning} />
        <div className={styles.deviceList} aria-label="Simulated BLE devices">
          {visibleDevices.map((device) => (
            <button
              className={selectedDevice.id === device.id ? styles.deviceSelected : undefined}
              key={device.id}
              onClick={() => selectDevice(device)}
              type="button"
            >
              <strong>{device.name}</strong>
              <span>{device.rssi} dBm</span>
              <small>{device.type} / {device.service}</small>
              <SignalBars rssi={device.rssi} type={device.type} />
            </button>
          ))}
        </div>
      </div>
      <article className={styles.detailPanel}>
        <p>{selectedDevice.type} Device</p>
        <h3>{selectedDevice.name}</h3>
        <dl>
          <div>
            <dt>RSSI</dt>
            <dd>{selectedDevice.rssi} dBm</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{selectedDevice.service}</dd>
          </div>
        </dl>
        <p>{selectedDevice.description}</p>
        <a href={selectedDevice.ctaHref}>{selectedDevice.ctaLabel}</a>
      </article>
    </SimulationModal>
  );
}

function SignalBars({ rssi, type }: { rssi: number; type: BLEDeviceType }) {
  const strength = Math.max(1, Math.min(4, Math.round((90 + rssi) / 11)));

  return (
    <span className={styles.signalBars} aria-label={`${type} signal strength ${strength} of 4`}>
      {[1, 2, 3, 4].map((bar) => (
        <i className={bar <= strength ? styles.signalBarActive : undefined} key={bar} />
      ))}
    </span>
  );
}
