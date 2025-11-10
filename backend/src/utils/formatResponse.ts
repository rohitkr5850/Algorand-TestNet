export const ok = <T>(data: T, message = "OK") => ({ success: true, message, data });
export const fail = (message = "Failed") => ({ success: false, message });
