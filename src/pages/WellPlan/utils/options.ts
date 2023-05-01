export const mapDataToOptions = (data: { id: number; name: string }) => ({
  label: data.name,
  value: data.id,
});
