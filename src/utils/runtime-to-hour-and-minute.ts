export const runtimeToHourAndMinute = (runtime: number) => {
  const hour = Math.floor(runtime / 60);
  if (!hour) return `${runtime}m`;
  const minute = runtime % (hour * 60);
  return `${hour}h ${minute}m`;
};
