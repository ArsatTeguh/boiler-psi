import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

// Fungsi untuk membuat dan mengembalikan instance logger
const getLogger = (fileName = "application") => {
  // Konfigurasi transportasi file dengan rotasi harian
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `log/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
  });

  // Konfigurasi transportasi konsol untuk output log ke konsol
  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    format: format.printf((i) => `${i.message}`),
  });

  // Membuat instance logger dengan konfigurasi
  const logger = createLogger({
    level: "info", // Level log default
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }), // Menangani error dengan stack trace
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}` // Format pesan log lengkap
      ),
      format.colorize() // Mewarnai log di konsol
    ),
    defaultMeta: { service: "my-app" },
    transports: [consoleTransport],
  });

  // Menambahkan transportasi file
  logger.add(fileLogTransport);
  return logger;
};

export default getLogger();
